// src/screens/student/DashboardAluno.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SaberHeader } from '../../components/SaberHeader';

const API_BASE = 'https://chivalrous-maidenish-bertha.ngrok-free.dev';

const colors = {
  primary: '#F2C016',   // cor-primaria
  secondary: '#1B8EF2', // cor-secundaria
  text: '#37474F',
  background: '#F7F9F9',
  card: '#FFFFFF',
  borderSoft: '#ECEFF1',
  mutedText: '#607D8B',
  white: '#FFFFFF',
  danger: '#E53935',
};

const fonts = {
  title: 'Poppins',
  text: 'Lato',
};

type ApiAgendamento = {
  id: number;
  dataHora: string; // ISO
  status: number | string;
  alunoId?: number;
  professorId?: number;
  aluno?: { id: number; nome?: string };
  professor?: { id: number; nome?: string };
};

export function DashboardAluno() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [proximas, setProximas] = useState<ApiAgendamento[]>([]);
  const [historico, setHistorico] = useState<ApiAgendamento[]>([]);

  const [alunoNome, setAlunoNome] = useState<string | null>(null);

  const carregarAgendamentos = useCallback(async () => {
    try {
      setErrorMessage(null);
      setLoading(true);

      const [token, alunoIdStr] = await Promise.all([
        AsyncStorage.getItem('@sabermais_token'),
        AsyncStorage.getItem('@sabermais_alunoId'),
      ]);

      if (!token || !alunoIdStr) {
        setErrorMessage(
          'Você precisa entrar com sua conta de aluno para ver o dashboard.',
        );
        setProximas([]);
        setHistorico([]);
        return;
      }

      const alunoId = Number(alunoIdStr);

      const response = await fetch(`${API_BASE}/api/Agendamentos`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('[DashboardAluno] Erro ao buscar agendamentos:', text);
        setErrorMessage(
          `Não foi possível carregar seus agendamentos (HTTP ${response.status}).`,
        );
        setProximas([]);
        setHistorico([]);
        return;
      }

      const data: ApiAgendamento[] = await response.json();

      // Filtra só os agendamentos deste aluno
      const meus = data.filter((ag) => {
        if (typeof ag.alunoId === 'number') {
          return ag.alunoId === alunoId;
        }
        if (ag.aluno && typeof ag.aluno.id === 'number') {
          return ag.aluno.id === alunoId;
        }
        return false;
      });

      // Guarda nome do aluno se vier na resposta
      const algum = meus.find((m) => m.aluno && m.aluno.nome);
      if (algum?.aluno?.nome) {
        setAlunoNome(algum.aluno.nome);
      }

      const agora = new Date();

      const proximasAulas: ApiAgendamento[] = [];
      const historicoAulas: ApiAgendamento[] = [];

      meus.forEach((ag) => {
        const d = new Date(ag.dataHora);
        if (isNaN(d.getTime())) {
          historicoAulas.push(ag);
          return;
        }

        if (d.getTime() >= agora.getTime()) {
          proximasAulas.push(ag);
        } else {
          historicoAulas.push(ag);
        }
      });

      // Ordena por data
      proximasAulas.sort(
        (a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime(),
      );
      historicoAulas.sort(
        (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime(),
      );

      setProximas(proximasAulas);
      setHistorico(historicoAulas);
    } catch (err) {
      console.error('[DashboardAluno] Erro inesperado:', err);
      setErrorMessage(
        'Ocorreu um erro ao carregar seus agendamentos. Verifique sua conexão e tente novamente.',
      );
      setProximas([]);
      setHistorico([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  function formatarDataHora(iso: string) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Data inválida';

    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();

    const hora = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${hora}:${min}`;
  }

  function formatarStatus(status: number | string) {
    if (typeof status === 'string') {
      const s = status.toLowerCase();
      if (s.includes('pend')) return 'Pendente';
      if (s.includes('confirm')) return 'Confirmado';
      if (s.includes('cancel')) return 'Cancelado';
      if (s.includes('concl')) return 'Concluído';
      return status;
    }

    switch (status) {
      case 0:
        return 'Pendente';
      case 1:
        return 'Confirmado';
      case 2:
        return 'Cancelado';
      case 3:
        return 'Concluído';
      default:
        return `Status ${status}`;
    }
  }

  function handleRefreshPress() {
    setRefreshing(true);
    carregarAgendamentos();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <SaberHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Dashboard do Aluno</Text>
            <Text style={styles.subtitle}>
              {alunoNome
                ? `Olá, ${alunoNome}! Aqui você acompanha suas aulas.`
                : 'Acompanhe aqui seus agendamentos de aula.'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.refreshButton, refreshing && { opacity: 0.6 }]}
            onPress={handleRefreshPress}
            disabled={refreshing || loading}
          >
            <Text style={styles.refreshButtonText}>{refreshing ? '...' : '↻'}</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color={colors.secondary} />
            <Text style={styles.loadingText}>Carregando seus agendamentos…</Text>
          </View>
        )}

        {errorMessage && !loading && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Próximas aulas */}
        {!loading && !errorMessage && (
          <>
            <Text style={styles.sectionTitle}>Próximas aulas</Text>

            {proximas.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Você ainda não tem aulas futuras. Use a aba Buscar para encontrar
                  um professor.
                </Text>
              </View>
            ) : (
              proximas.map((ag) => (
                <View key={ag.id} style={styles.card}>
                  <Text style={styles.cardLabel}>Professor</Text>
                  <Text style={styles.cardValue}>
                    {ag.professor?.nome || 'Professor não informado'}
                  </Text>

                  <Text style={styles.cardLabel}>Data e horário</Text>
                  <Text style={styles.cardValue}>
                    {formatarDataHora(ag.dataHora)}
                  </Text>

                  <View style={styles.statusRow}>
                    <Text style={styles.cardLabel}>Status</Text>
                    <Text style={styles.statusBadge}>
                      {formatarStatus(ag.status)}
                    </Text>
                  </View>
                </View>
              ))
            )}

            {/* Histórico */}
            <Text style={styles.sectionTitle}>Histórico de aulas</Text>

            {historico.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>
                  Seu histórico de aulas aparecerá aqui depois que você concluir
                  alguns agendamentos.
                </Text>
              </View>
            ) : (
              historico.map((ag) => (
                <View key={ag.id} style={styles.cardHistorico}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.cardValueHistorico}>
                      {ag.professor?.nome || 'Professor não informado'}
                    </Text>
                    <Text style={styles.statusHistorico}>
                      {formatarStatus(ag.status)}
                    </Text>
                  </View>
                  <Text style={styles.cardLabelHistorico}>
                    {formatarDataHora(ag.dataHora)}
                  </Text>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.title,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  refreshButton: {
    marginLeft: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  refreshButtonText: {
    fontSize: 18,
  },
  loadingBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  errorBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.danger,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: fonts.title,
    fontWeight: '600',
    color: colors.text,
  },
  emptyBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  card: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.mutedText,
    marginTop: 4,
  },
  cardValue: {
    fontSize: 15,
    fontFamily: fonts.text,
    color: colors.text,
  },
  statusRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    color: colors.secondary,
    fontSize: 12,
    fontFamily: fonts.text,
    fontWeight: '600',
  },
  cardHistorico: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ECEFF1',
  },
  cardValueHistorico: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    fontWeight: '600',
  },
  cardLabelHistorico: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  statusHistorico: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
});

