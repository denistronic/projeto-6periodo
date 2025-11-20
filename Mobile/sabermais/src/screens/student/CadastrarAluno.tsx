// src/screens/student/CadastrarAluno.tsx
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

import { SaberHeader } from '../../components/SaberHeader';
import type { PerfilStackParamList } from '../../navigation/PerfilStack';

const colors = {
  primary: '#F2C016',
  secondary: '#1B8EF2',
  text: '#37474F',
  background: '#F7F9F9',
  white: '#FFF',
  borderSoft: '#ECEFF1',
  black: '#000',
  progressBg: '#E0E0E0',
};

const fonts = {
  title: 'Poppins',
  text: 'Lato',
};

type PerfilNav = NativeStackNavigationProp<
  PerfilStackParamList,
  'CadastroAluno'
>;

export function CadastrarAluno() {
  const navigation = useNavigation<PerfilNav>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const handleNext = () => {
    console.log('Próximo passo do cadastro de aluno:', {
      nome,
      email,
      senha,
      confirmarSenha,
    });
    // depois você pode navegar para Etapa 2:
    // navigation.navigate('CadastroAlunoEtapa2');
  };

  const handleGoLogin = () => {
    // “Entrar” volta pra tela Login
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SaberHeader />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Título */}
        <Text style={styles.title}>Cadastro de Aluno</Text>

        {/* Já possui conta? Entrar */}
        <View style={styles.rowLogin}>
          <Text style={styles.textDefault}>Já possui uma conta? </Text>
          <Text style={styles.linkText} onPress={handleGoLogin}>
            Entrar
          </Text>
        </View>

        {/* Etapa / barra de progresso */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Etapa 1 de 2</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Nome completo */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Nome completo <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor="#9E9E9E"
              value={nome}
              onChangeText={setNome}
            />
          </View>
        </View>

        {/* E-mail */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            E-mail <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#9E9E9E"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Senha */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Senha <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapperRow}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Sua senha"
              placeholderTextColor="#9E9E9E"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showSenha}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowSenha(prev => !prev)}
            >
              <Text style={styles.eyeText}>
                {showSenha ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmar senha */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Confirmar senha <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputWrapperRow}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirme sua senha"
              placeholderTextColor="#9E9E9E"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!showConfirmar}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmar(prev => !prev)}
            >
              <Text style={styles.eyeText}>
                {showConfirmar ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Próximo */}
        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.9}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
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
    marginBottom: 16,
  },

  rowLogin: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  textDefault: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.text,
  },
  linkText: {
    fontSize: 14,
    fontFamily: fonts.text,
    color: colors.black,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },

  stepContainer: {
    marginBottom: 16,
  },
  stepText: {
    fontSize: 13,
    fontFamily: fonts.text,
    color: colors.text,
    marginBottom: 4,
  },
  progressBarBackground: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.progressBg,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '45%', // representando etapa 1 de 2
    height: '100%',
    backgroundColor: colors.black,
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

  nextButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: fonts.text,
  },
});

