import React, { useState } from 'react';
import { StyleSheet,Text, View, TextInput, Button } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Alert } from 'react-native';


export default function Produto({ onSalvarDados, setTelaAtual }) {

    const [qtd, setQtd] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvar = () => {
        if (qtd && produto && valor) {
            //Envia os dados para o componente pai usando a função recebida via props

            onSalvarDados(qtd, produto, valor);
            setQtd('');
            setProduto(''); //Limpa o campo de produto
            setValor(''); //Limpa o campo de valor
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.')
        }
    };

    


    const limparCampos = () => {
        setQtd('');
        setProduto('');
        setValor('');
    };

    return(
        <View style={estilos.container}>
         <Text style={estilos.cabecalho}>Armazenamento Local</Text>  
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Quantidade:</Text>
                <TextInput
                value={qtd}
                onChangeText={setQtd}
                style={[estilos.input, {width: '25%'}]}
                maxLength={6}
                placeholder='Quantidade'>
                </TextInput>
            </View>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Produto:</Text>
                <TextInput
                value={produto}
                onChangeText={setProduto}
                style={estilos.input}
                placeholder='Nome do Produto'
                maxLength={20}>

                </TextInput>
            </View>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Valor:</Text>
                <TextInputMask
                type={'money'}
                value={valor}
                onChangeText={setValor}
                style={estilos.input}
                placeholder='Valor do Produto'
                maxLength={10}
                keyboardType='numeric'></TextInputMask>
            </View>
            <Text style={estilos.label} >Quantidade:{qtd}</Text>
            <Text style={estilos.label} >Produto:{produto}</Text>
            <Text style={estilos.label}> Valor: {valor}</Text>
            <View style={estilos.inputRow}>
                <View style={[estilos.botao,{margin:10}]}>
                    <Button title='Limpar' onPress={limparCampos}></Button>
                </View>
                <View style={[estilos.botao,{margin:10}]}>
                    <Button title='Salvar' onPress={handleSalvar}></Button>
                </View>
                <View style={[estilos.botao, {margin:10}]}> 
                    <Button title='Ver Registros Salvos'
                    onPress={() => setTelaAtual('registros')}
                    ></Button>
                </View>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
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
    input:{
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
        marginTop:20
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
})