import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListaRegistros from './ListaRegistros';

const MeuComponente = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const registrosSalvos = await AsyncStorage.getItem('registros');
        if (registrosSalvos) {
          setDados(JSON.parse(registrosSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  return (
    <View>
      {dados.length > 0 ? (
        <ListaRegistros data={dados} />
      ) : (
        <Text>Nenhum registro encontrado</Text>
      )}
    </View>
  );
};

export default MeuComponente;