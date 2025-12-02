// src/screens/teachers/DashboardProfessor.tsx
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SaberHeader } from '../../components/SaberHeader';
import type { RootTabParamList } from '../../navigation/TabNavigator';

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
  black: '#000000',
};

const fonts = {
  title: 'Poppins',
  text: 'Lato',
};

type DashboardTabNav = BottomTabNavigationProp<RootTabParamList, 'Dashboard'>;

type Disponibilidade = {
  id: number;
  diaDaSemana: number;
  horaInicio: string;
  horaFim: string;
  professorId: number;
};

const diasSemanaLabels = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function DashboardProfessor() {
  const navigation = useNavigation<DashboardTabNav>();

  const [loading, setLoading] = useState(true);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([]);

  async function loadDisponibilidades(showRefreshSpinner = false) {
    try {
      if (showRefreshSpinner) {
        setLoadingRefresh(true);
      } else {
        setLoading(true);
      }
      setErrorMessage(null);

      const token = await AsyncStorage.getItem('@sabermais_token');
      const professorIdStr = await AsyncStorage.getItem('@sabermais_professorId');

      if (!token || !professorIdStr) {
        setErrorMessage(
          'Não encontrei sua sessão de professor. Faça login novamente.',
        );
        setDisponibilidades([]);
        return;
      }

      const professorId = Number(professorIdStr);

      const resp = await fetch(`${API_BASE}/api/Disponibilidades`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.error('[DashboardProfessor] Erro ao buscar disponibilidades:', text);
        setErrorMessage(
          `Não foi possível carregar suas disponibilidades (HTTP ${resp.status}).`,
        );
        setDisponibilidades([]);
        return;
      }

      const data: Disponibilidade[] = await resp.json();

      // Filtra só as disponibilidades desse professor
      const minhas = data.filter((d) => d.professorId === professorId);
      setDisponibilidades(minhas);
    } catch (err: any) {
      console.error('[DashboardProfessor] Erro inesperado:', err);
      setErrorMessage(
        'Ocorreu um erro ao carregar suas disponibilidades. Verifique sua conexão e tente novamente.',
      );
      setDisponibilidades([]);
    } finally {
      setLoading(false);
      setLoadingRefresh(false);
    }
  }

  useEffect(() => {
    loadDisponibilidades(false);
  }, []);

  function handleAdicionarDisponibilidade() {
    // Leva para a aba Perfil, tela Disponibilidade do stack de Perfil
    navigation.navigate('Perfil', { screen: 'Disponibilidade' } as any);
  }

  function handleIrParaLogin() {
    navigation.navigate('Perfil');
  }

  const isLoadingInitial = loading && !loadingRefresh;

  return (
    <SafeAreaView style={styles.safeArea}>
      <SaberHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Dashboard do Professor</Text>

        <Text style={styles.subtitle}>
          Acompanhe seus horários disponíveis e organize sua agenda de aulas.
        </Text>

        {/* Caso dê erro crítico (sem sessão, etc.) */}
        {errorMessage && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.errorButton}
              onPress={handleIrParaLogin}
            >
              <Text style={styles.errorButtonText}>Fazer login novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bloco de Disponibilidades */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Disponibilidades</Text>

            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => loadDisponibilidades(true)}
              disabled={loadingRefresh}
            >
              <Text style={styles.refreshText}>
                {loadingRefresh ? 'Atualizando…' : 'Atualizar'}
              </Text>
            </TouchableOpacity>
          </View>

          {isLoadingInitial ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color={colors.secondary} />
              <Text style={styles.loadingText}>
                Carregando suas disponibilidades…
              </Text>
            </View>
          ) : disponibilidades.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                Você ainda não cadastrou nenhum horário disponível.
              </Text>
              <Text style={styles.emptyHint}>
                Use o botão abaixo para adicionar seus primeiros horários.
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {disponibilidades.map((disp) => {
                const labelDia =
                  diasSemanaLabels[disp.diaDaSemana] ??
                  `Dia ${disp.diaDaSemana}`;
                return (
                  <View key={disp.id} style={styles.card}>
                    <Text style={styles.cardTitle}>{labelDia}</Text>
                    <Text style={styles.cardTime}>
                      {disp.horaInicio} - {disp.horaFim}
                    </Text>
                    <Text style={styles.cardSubtitle}>
                      Os alunos conseguem ver esses horários na busca.
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdicionarDisponibilidade}
            activeOpacity={0.9}
          >
            <Text style={styles.addButtonText}>Adicionar disponibilidade</Text>
          </TouchableOpacity>
        </View>

        {/* Aqui no futuro dá para colocar “Seus próximos agendamentos” */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos agendamentos</Text>
          <Text style={styles.mutedInfo}>
            Em breve, esta área vai mostrar suas próximas aulas agendadas com os
            alunos.
          </Text>
        </View>
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
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.title,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.mutedText,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.title,
    fontWeight: '600',
    color: colors.text,
  },
  refreshButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  refreshText: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.secondary,
    fontWeight: '600',
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  list: {
    marginTop: 4,
    gap: 8,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: 10,
    backgroundColor: colors.white,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: fonts.title,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.secondary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  emptyBox: {
    paddingVertical: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    marginBottom: 4,
  },
  emptyHint: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.mutedText,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.text,
    fontWeight: '600',
  },
  errorBox: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    backgroundColor: '#FFEBEE',
  },
  errorText: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: '#C62828',
    marginBottom: 8,
  },
  errorButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  errorButtonText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.text,
    fontWeight: '600',
  },
  mutedInfo: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.mutedText,
    marginTop: 4,
  },
});
