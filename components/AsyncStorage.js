import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';

export default function Storage() {
  const [registros, setRegistros] = useState([]);
  const [telaAtual, setTelaAtual] = useState('produto'); // Estado para controlar a tela

  const salvarNoAsyncStorage = async (qtd, produto, valor) => {
    try {
      const registro = { qtd, produto, valor };

      const registrosExistentes = await AsyncStorage.getItem('registros');
      const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

      registros.push(registro);

      await AsyncStorage.setItem('registros', JSON.stringify(registros));

      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      carregarRegistros(); // Atualiza a lista após salvar
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    }
  };

  const carregarRegistros = async () => {
    try {
      const registrosExistentes = await AsyncStorage.getItem('registros');
      const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
      setRegistros(registros); // Atualiza o estado com os registros recuperados
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.');
    }
  };

  useEffect(() => {
    carregarRegistros(); // Carrega os registros ao montar o componente
  }, []);

  return (
    <View style={styles.container}>
      {telaAtual === 'produto' ? (
        <>
          <Produto
            onSalvarDados={salvarNoAsyncStorage}
            telaAtual={telaAtual}
            setTelaAtual={setTelaAtual} // Passa a função setTelaAtual para atualizar o estado
          />
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Registros Salvos:</Text>
          <FlatList
            data={registros}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Quantidade: {item.qtd}</Text>
                <Text>Produto: {item.produto}</Text>
                <Text>Valor: {item.valor}</Text>
              </View>
            )}
          />
          <Button title="Voltar para Cadastro" onPress={() => setTelaAtual('produto')} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});