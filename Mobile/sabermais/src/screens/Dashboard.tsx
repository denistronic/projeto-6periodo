// src/screens/Dashboard.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SaberHeader } from '../components/SaberHeader';

const colors = {
  primary: '#F2C016',   // cor-primaria
  secondary: '#1B8EF2', // cor-secundaria
  text: '#37474F',
  background: '#F7F9F9',
  white: '#FFF',
  borderSoft: '#ECEFF1',
};

const fonts = {
  title: 'Poppins',
  text: 'Lato',
};

export function Dashboard() {
  // depois você pode pegar esse nome de contexto / API / route params
  const userName = '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <SaberHeader />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Saudações */}
        <View style={styles.headerArea}>
          <Text style={styles.greetingText}>
            Olá{userName ? `, ${userName}` : ','} <Text>👋</Text>
          </Text>
          <Text style={styles.subGreeting}>
            Bem-vindo(a) de volta ao seu painel de controle.
          </Text>
        </View>

        {/* Cards principais */}
        <View style={styles.cardsGrid}>
          <DashboardCard
            icon="✅"
            label="Aulas Agendadas"
          />
          <DashboardCard
            icon="🎓"
            label="Aulas Concluídas"
          />
          <DashboardCard
            icon="👥"
            label="Alunos"
          />
          <DashboardCard
            icon="🕒"
            label="Horas de Aula"
          />
        </View>

        {/* Próximas aulas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Próximas Aulas</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.sectionLink}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionBody}>
            <Text style={styles.sectionPlaceholder}>
              Você ainda não tem aulas agendadas.
            </Text>
          </View>
        </View>

        {/* Atividade recente */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Atividade Recente</Text>
          </View>

          <View style={styles.sectionBody}>
            <Text style={styles.sectionPlaceholder}>
              Nenhuma atividade recente encontrada.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Card reutilizável do dashboard (ícone + texto)
 */
type DashboardCardProps = {
  icon: string;
  label: string;
};

function DashboardCard({ icon, label }: DashboardCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.cardIconCircle}>
        <Text style={styles.cardIcon}>{icon}</Text>
      </View>
      <Text style={styles.cardLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },

  headerArea: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: fonts.title,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: '#607D8B',
    textAlign: 'center',
  },

  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',

    // sombra leve
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    fontWeight: '600',
  },

  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    backgroundColor: '#ECEFF1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fonts.text,
    fontWeight: '700',
    color: colors.text,
  },
  sectionLink: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.secondary,
    fontWeight: '600',
  },
  sectionBody: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.borderSoft,
  },
  sectionPlaceholder: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: '#90A4AE',
  },
});

export default Dashboard;

