import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import StorageComponent from './components/StorageComponent';
import RecordList from './components/RecordList';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('product');
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Local Storage</Text>
      {currentScreen === 'product' ? (
        <StorageComponent setScreen={setCurrentScreen} />
      ) : (
        <RecordList setScreen={setCurrentScreen} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: 100,
    fontSize: 20,
    fontStyle: 'italic',
  },
});
