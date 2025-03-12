import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Storage() {
    const [registros, setRegistros] = useState([]);
    const [telaAtual, setTelaAtual] = useState('produto'); // Estado para controlar a tela 

    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try {
            const registro = { qtd, produto, valor };
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registrosAnteriores = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            const novosRegistros = [...registrosAnteriores, registro];
            await AsyncStorage.setItem('registros', JSON.stringify(novosRegistros));
            setRegistros(novosRegistros);
            Alert.alert('Sucesso', 'Registro salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar no AsyncStorage:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
        }
    };

    const carregarRegistros = async () => {
        try {
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registrosCarregados = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            setRegistros(registrosCarregados);
        } catch (error) {
            console.error('Erro ao carregar registros:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.');
        }
    };

    const onApagarDados = async () => {
        try {
            await AsyncStorage.removeItem('registros');
            setRegistros([]);
            Alert.alert('Sucesso', 'Todos os registros foram apagados!');
        } catch (error) {
            console.error('Erro ao apagar registros:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao apagar os dados.');
        }
    };

    const onApagarRegistro = async (index) => {
        try {
            const registrosExistentes = await AsyncStorage.getItem('registros');
            let registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            registros.splice(index, 1);
            await AsyncStorage.setItem('registros', JSON.stringify(registros));
            setRegistros([...registros]); // Atualiza a lista de registros
            Alert.alert('Sucesso', 'Registro apagado com sucesso!');
        } catch (error) {
            console.error('Erro ao apagar registro:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao apagar o registro.');
        }
    };

    useEffect(() => {
        carregarRegistros();
    }, []);

    return (
        <View style={styles.container}>
            {telaAtual === 'produto' ? (
                <Produto onSalvarDados={salvarNoAsyncStorage} setTelaAtual={setTelaAtual} />
            ) : (
                <>
                    <Text style={styles.titulo}>Registros Salvos:</Text>
                    <FlatList 
                        data={registros}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                                <View>
                                    <Text>Quantidade: {item.qtd}</Text>
                                    <Text>Produto: {item.produto}</Text>
                                    <Text>Valor: {item.valor}</Text>
                                </View>
                                <TouchableOpacity onPress={() => onApagarRegistro(index)}>
                                    <Icon name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <Button title='Apagar Todos' onPress={onApagarDados} color="red" />
                    <Button title='Voltar para Cadastro' onPress={() => setTelaAtual('produto')} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

