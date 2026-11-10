
import React from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

import { useForm } from './hooks/useForm';

// Validação do formulário
function validarLogin(v) {
  const e = {};

  if (!v.email.includes('@')) {
    e.email = 'E-mail inválido';
  }

  if (v.senha.length < 6) {
    e.senha = 'Mínimo de 6 caracteres';
  }

  return e;
}

// Função de login
function fazerLogin(v) {
  Alert.alert('Sucesso', `Bem-vindo, ${v.email}`);
}

export default function App() {
  const {
    valores,
    erros,
    alterar,
    enviar,
    limpar,
  } = useForm(
    { email: '', senha: '' },
    validarLogin
  );

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.campo}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={valores.email}
        onChangeText={t => alterar('email', t)}
      />

      {erros.email && (
        <Text style={styles.erro}>
          {erros.email}
        </Text>
      )}

      <TextInput
        style={styles.campo}
        placeholder="Senha"
        secureTextEntry
        value={valores.senha}
        onChangeText={t => alterar('senha', t)}
      />

      {erros.senha && (
        <Text style={styles.erro}>
          {erros.senha}
        </Text>
      )}

      <Button
        title="Entrar"
        onPress={() => enviar(fazerLogin)}
      />

      <Button
        title="Limpar"
        color="#999"
        onPress={limpar}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  campo: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
  },

  erro: {
    color: 'red',
    fontSize: 14,
  },
});
