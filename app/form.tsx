import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link, usePathname } from 'expo-router';

export default function Form() {
  const pathname = usePathname();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async () => {
    const userData = {
      nome,
      sobrenome,
      email,
      telefone
    };

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Sucesso', result.message);
        setNome('');
        setSobrenome('');
        setEmail('');
        setTelefone('');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.error || 'Erro desconhecido');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/form" style={styles.link}>
          <Text style={[styles.title, pathname === '/form' ? styles.active : styles.inactive]}>
            Formulário
          </Text>
        </Link>
        <Link href="/list" style={styles.link}>
          <Text style={[styles.title, pathname === '/list' ? styles.active : styles.inactive]}>
            Usuários
          </Text>
        </Link>
      </View>

      <TextInput
        placeholder="Digite seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Digite seu sobrenome"
        style={styles.input}
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Digite seu telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  link: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
  },
  active: {
    color: 'black',
    fontWeight: 'bold',
  },
  inactive: {
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
});
