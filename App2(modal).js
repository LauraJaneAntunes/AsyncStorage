import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  // Função para lidar com a resposta "Sim"
  const handleYes = () => {
    Alert.alert("Você escolheu Sim!");
    setModalVisible(false); // Fecha o modal após a resposta
  };

  // Função para lidar com a resposta "Não"
  const handleNo = () => {
    Alert.alert("Você escolheu Não!");
    setModalVisible(false); // Fecha o modal após a resposta
  };

  // Estilos devem ser definidos antes do return
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    modalView: {
      width: '80%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '30%',
      left: '10%',
    },
    modalText: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {/* Exibe a pergunta "Sim ou Não" */}
          <Text style={styles.modalText}>Você tem certeza que deseja continuar?</Text>

          {/* Botões de resposta */}
          <View style={styles.modalButtons}>
            <Button title="Sim" onPress={handleYes} />
            <Button title="Não" onPress={handleNo} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
