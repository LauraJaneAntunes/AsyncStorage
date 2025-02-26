import React, { useState, useEffect } from 'react';
import { View, Alert, FlatList, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from './Product';

export default function StorageComponent() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('records');
      setRecords(storedRecords ? JSON.parse(storedRecords) : []);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const saveToAsyncStorage = async (quantity, productName, price) => {
    try {
      const record = { quantity, productName, price };
      const existingRecords = await AsyncStorage.getItem('records');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(record);
      await AsyncStorage.setItem('records', JSON.stringify(records));
      fetchRecords();
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('records');
      setRecords([]);
      Alert.alert('Sucesso', 'Todos os registros foram apagados.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao apagar os registros.');
    }
  };

  return (
    <View style={styles.container}>
      <Product onSaveData={saveToAsyncStorage} />
      <View style={styles.card}>
        <Text style={styles.title}>Registros Salvos:</Text>
        {records.length === 0 ? (
          <Text style={styles.noRecords}>Nenhum registro encontrado</Text>
        ) : (
          <FlatList
            data={records}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>Quantidade: {item.quantity}</Text>
                <Text>Produto: {item.productName}</Text>
                <Text>Preço: {item.price}</Text>
              </View>
            )}
          />
        )}
        <Button title="Apagar Tudo" onPress={clearStorage} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    marginTop: 20,
    padding: 15,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff3',
  },
  noRecords: {
    textAlign: 'center',
    color: 'gray',
  },
});
