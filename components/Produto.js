import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TextInputMask} from 'react-native-masked-text';


export default function Produto({ onSalvarDados }){
    const [qtd, setQTD] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvar = () => {
        if(qtd && produto && valor){
            //Envia dados para o componente pai usando a função recebida via props
            onSalvarDados(qtd, produto, valor);
            setProduto(''); // Limpa o campo produto
            setValor(''); // Limpa o campo valor
            setQTD(''); // Limpa o campo quantidade

        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.')
        }
    };


    const limparCampos = () => {
        setQTD('');
        setProduto('');
        setValor('');
    };

    return(
        <View style={estilos.container}>
        <Text style={estilos.label}>Armazenamento Local</Text>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}>Quantidade</Text>
                <TextInput
                value={qtd}
                onChangeText={setQTD}
                style={[estilos.input, {width: '25%'}]}
                maxLength={6}
                //placeholder="Quantidade"
                />
            </View>
            <View style={estilos.inputRow}>
                <Text style={estilos.label}> Produto </Text>
                <TextInput
                value={produto}
                onChangeText={setProduto}
                style={estilos.input}
                placeholder="Nome do produto"
                maxLength={20}
                />
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
                keyboardType='numeric'
            />
            </View>
            <Text style={estilos.label}>Quantidade:{qtd}</Text>
            <Text style={estilos.label}>Produto::{produto}</Text>
            <Text style={estilos.label}>Valor:{valor}</Text>
            <View style={[estilos.botao, {margin:10}]}>
                <Button title='Limpar' onPress={limparCampos}/>
            </View>
            <View style={[estilos.botao, {margin:10}]}>
                <Button title='Salvar' onPress={handleSalvar}/>
            </View>
            <View style={[estilos.botao, {margin:10}]}>
                <Button title='Ver Registros Salvos' onPress={() => setTelaAtual('registros')}/>
            </View>
        </View>
    );
    
}
const estilos = StyleSheet.create({
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
        marginLeft:5,
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
}
}
)
