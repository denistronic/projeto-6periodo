// src/navigation/PerfilStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import { Cadastrar } from '../screens/Cadastrar';
import { CadastrarProfessor } from '../screens/teachers/CadastrarProfessor';
import { CadastrarAluno } from '../screens/student/CadastrarAluno';

export type PerfilStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  CadastroProfessor: undefined;
  CadastroAluno: undefined;
};

const Stack = createNativeStackNavigator<PerfilStackParamList>();

export function PerfilStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastrar} />
      <Stack.Screen name="CadastroProfessor" component={CadastrarProfessor} />
      <Stack.Screen name="CadastroAluno" component={CadastrarAluno} />
    </Stack.Navigator>
  );
}
