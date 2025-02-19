import React, { useState} from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Produto from "./Produto";

export default function Storage(){

    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try{
            const registro = {
                qtd,
                produto,
                valor,
            };
            //Recupera os registros anteriores do AsyncStorage
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];

            //Adiciona o novo registro
            registros.push(registro);

            // Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));

            Alert.alert('Sucesso', 'Registro salvo com sucesso!');

        } catch(error) {
            console.error('Erro ao salvar no AsyncStorage', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados');
        }
    };
    return (
        <View>
            {/* Passa a função */}
            <Produto onSalvarDados={salvarNoAsyncStorage}/>
        </View>
    )
}