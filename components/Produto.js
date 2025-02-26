import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Product({ onSaveData }) {
  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (quantity && productName && price) {
      onSaveData(quantity, productName, price);
      clearFields();
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  const clearFields = () => {
    setQuantity('');
    setProductName('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          style={[styles.input]}
          maxLength={6}
          keyboardType="numeric"
          placeholder="Ex: 10"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Produto:</Text>
        <TextInput
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
          placeholder="Nome do produto"
          maxLength={20}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Preço:</Text>
        <TextInputMask
          type={'money'}
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          placeholder="Preço do produto"
          maxLength={10}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonRow}>
        <Button title="Limpar" onPress={clearFields} color="#d3d3d3" />
        <View style={styles.buttonSpacing} />
        <Button title="Salvar" onPress={handleSave} color="blueviolet" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3',
    justifyContent: 'center',
    padding: 25,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSpacing: {
    width: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc3',
    padding: 10,
    flex: 1,
    marginLeft: 5,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
