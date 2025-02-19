import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from './components/AsyncStorage'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>Armazenamento Local</Text>
      <AsyncStorage/>
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
  cabecalho:{
    marginTop: '100',
    fontSize: 20,
    fontStyle: 'italic'
  }
});
