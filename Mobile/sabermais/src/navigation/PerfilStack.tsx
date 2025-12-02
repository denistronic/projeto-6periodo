// src/navigation/PerfilStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from '../screens/Login';
import { Cadastrar } from '../screens/Cadastrar';
import { CadastrarProfessor } from '../screens/teachers/CadastrarProfessor';
import { CadastrarAluno } from '../screens/student/CadastrarAluno';
import { PerfilProfessor } from '../screens/teachers/PerfilProfessor';
import { PerfilAluno } from '../screens/student/PerfilAluno';
import { EditarProfessor } from '../screens/teachers/EditarProfessor';
import { EditarAluno } from '../screens/student/EditarAluno';
import { AgendarProfessor } from '../screens/student/AgendarProfessor';
import { Disponibilidade } from '../screens/teachers/Disponibilidade';

export type PerfilStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  CadastroProfessor: undefined;
  CadastroAluno: undefined;
  PerfilProfessor: undefined;
  PerfilAluno: undefined;
  EditarProfessor: undefined;
  EditarAluno: undefined;
  AgendarProfessor: {
    professorId: number;
    professorNome?: string;
  };
  Disponibilidade: undefined;
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
      <Stack.Screen name="PerfilProfessor" component={PerfilProfessor} />
      <Stack.Screen name="PerfilAluno" component={PerfilAluno} />
      <Stack.Screen name="EditarProfessor" component={EditarProfessor} />
      <Stack.Screen name="EditarAluno" component={EditarAluno} />
      <Stack.Screen name="AgendarProfessor" component={AgendarProfessor} />
      <Stack.Screen name="Disponibilidade" component={Disponibilidade} />
    </Stack.Navigator>
  );
}
