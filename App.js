import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from './components/AsyncStorage';

export default function App() {
  return (
    <View style={estilos.container}>
      
      <AsyncStorage/>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});