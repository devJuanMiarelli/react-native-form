import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Link, usePathname } from 'expo-router';

export default function List() {
  const pathname = usePathname();
  const [usuarios, setUsuarios] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          setError('Erro ao carregar os usuários');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

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

      <View style={styles.listContainer}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : usuarios.length === 0 ? (
          <Text style={styles.listText}>Nenhum usuário cadastrado</Text>
        ) : (
          <ScrollView>
            {usuarios.map((usuario, index) => (
              <View key={index} style={styles.userCard}>
                <Text style={styles.userText}>
                  Nome: {usuario.nome} {usuario.sobrenome}
                </Text>
                <Text style={styles.userText}>Email: {usuario.email}</Text>
                <Text style={styles.userText}>Telefone: {usuario.telefone}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
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
  listContainer: {
    width: '80%',
    padding: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  listText: {
    fontSize: 16,
    color: 'gray',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  userCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  userText: {
    fontSize: 16,
    color: 'black',
  },
});
