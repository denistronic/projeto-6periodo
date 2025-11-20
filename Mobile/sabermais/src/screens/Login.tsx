// src/screens/Login.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SaberHeader } from '../components/SaberHeader';
import type { PerfilStackParamList } from '../navigation/PerfilStack';

const colors = {
  primary: '#F2C016',   // cor-primaria
  secondary: '#1B8EF2', // cor-secundaria
  text: '#37474F',
  background: '#F7F9F9',
  white: '#FFF',
  borderSoft: '#ECEFF1',
  black: '#000',
};

const fonts = {
  title: 'Poppins',
  text: 'Lato',
};

type PerfilNav = NativeStackNavigationProp<PerfilStackParamList, 'Login'>;

export function Login() {
  const navigation = useNavigation<PerfilNav>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login com:', { email, senha });
    // depois você coloca a lógica real aqui
  };

  const handleGoCadastro = () => {
    // Navega para a tela "Cadastro" dentro do PerfilStack
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Topo com logo Saber+ */}
      <SaberHeader />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Título */}
        <Text style={styles.title}>Entrar no perfil</Text>

        {/* Texto de criar cadastro */}
        <View style={styles.createRow}>
          <Text style={styles.createText}>Não possui uma conta? </Text>
          <Text
            style={styles.createLink}
            onPress={handleGoCadastro}
          >
            Criar cadastro
          </Text>
        </View>

        {/* Campo E-mail */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Campo Senha */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Senha <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapperRow}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Sua senha"
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Text style={styles.eyeText}>
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.9}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </ScrollView>
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

  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: fonts.title,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },

  createRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  createText: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
  },
  createLink: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.black,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.text,
    marginBottom: 6,
  },
  required: {
    color: colors.black,
  },

  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    paddingVertical: 4,
  },

  inputWrapperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputPassword: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
    paddingVertical: 6,
    paddingRight: 8,
  },
  eyeButton: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeText: {
    fontSize: 16,
  },

  loginButton: {
    marginTop: 20,
    backgroundColor: colors.black,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: fonts.text,
  },
});
