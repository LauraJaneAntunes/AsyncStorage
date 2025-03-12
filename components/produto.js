import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Produto({ onSalvarDados, setTelaAtual }) {
    const [qtd, setQtd] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvar = () => {
        if (qtd && produto && valor) {
            onSalvarDados(qtd, produto, valor);
            limparCampos();
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };

    const limparCampos = () => {
        setQtd('');
        setProduto('');
        setValor('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cabecalho}>Armazenamento Local</Text>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Quantidade:</Text>
                <TextInput
                    value={qtd}
                    onChangeText={setQtd}
                    style={[styles.input, { width: '25%' }]}
                    maxLength={6}
                    placeholder='Quantidade'
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Produto:</Text>
                <TextInput
                    value={produto}
                    onChangeText={setProduto}
                    style={styles.input}
                    placeholder='Nome do Produto'
                    maxLength={20}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Valor:</Text>
                <TextInputMask
                    type={'money'}
                    value={valor}
                    onChangeText={setValor}
                    style={styles.input}
                    placeholder='Valor do Produto'
                    maxLength={10}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.inputRow}>
                <View style={[styles.botao, { margin: 10 }]}>
                    <Button title='Limpar' onPress={limparCampos} />
                </View>
                <View style={[styles.botao, { margin: 10 }]}>
                    <Button title='Salvar' onPress={handleSalvar} />
                </View>
                <View style={[styles.botao, { margin: 10 }]}> 
                    <Button title='Ver Registros Salvos' onPress={() => setTelaAtual('registros')} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 25,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'flex-end',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '80%',
        marginBottom: -10,
        marginLeft: 5,
        borderRadius: 5,
        marginTop: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    botao: {
        marginTop: 20
    },
    cabecalho: {
        marginTop: 10,
        marginBottom: 40,
        fontSize: 20,
        fontStyle: 'italic',
    }
});
