// src/screens/Buscar.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const colors = {
  primary: '#F2C016',   // cor-primaria
  secondary: '#1B8EF2', // cor-secundaria
  c1: '#1BA0F2',
  c2: '#38BDF2',
  c3: '#38D0F2',
  c4: '#F2A516',
  text: '#37474F',      // cor-texto
  background: '#F7F9F9', // cor-fundo
  borderSoft: '#ECEFF1',
  white: '#FFF',
  black: '#000',
};

const fonts = {
  title: 'Poppins', // fonte-titulo
  text: 'Lato',     // fonte-texto
};

export function Buscar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // aqui depois vamos ligar na API / filtro
    console.log('Buscar por:', query);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <Text style={styles.title}>Busque pelo Professor Perfeito</Text>

          {/* Barra de busca */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar por nome, matéria ou habilidade..."
                placeholderTextColor="#9E9E9E"
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />

              <TouchableOpacity
                style={styles.searchButton}
                activeOpacity={0.8}
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonIcon}>🔍</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filtros: Valores / Categoria / Avaliação */}
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
              <Text style={styles.filterText}>Valores</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
              <Text style={styles.filterText}>Categoria</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
              <Text style={styles.filterText}>Avaliação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // Título
  title: {
    fontSize: 20, // ~ font-size-xl
    fontWeight: '700',
    fontFamily: fonts.title,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },

  // Wrapper da busca (pra dar respiro lateral)
  searchWrapper: {
    marginBottom: 24,
  },

  // Caixa de busca com sombra
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 4,

    // sombra leve
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    paddingVertical: 8,
    paddingRight: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonIcon: {
    color: colors.white,
    fontSize: 18,
  },

  // Filtros
  filtersContainer: {
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#F3F4F6', // cinza bem claro, estilo do print
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.text,
    color: colors.text,
  },
});


