import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ListaRegistros = ({ data, onApagarDados, onApagarRegistro }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registros Salvos:</Text>
            {data.length > 0 ? (
                <>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.item}>
                                <Text>Quantidade: {item.qtd}</Text>
                                <Text>Produto: {item.produto}</Text>
                                <Text>Valor: {item.valor}</Text>
                                <TouchableOpacity onPress={() => onApagarRegistro(index)}>
                                    <Text style={styles.botaoApagar}>Apagar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    <Button title="Apagar Todos" onPress={onApagarDados} color="red" />
                </>
            ) : (
                <Text style={styles.mensagem}>Nenhum registro encontrado</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    },
    botaoApagar: {
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    mensagem: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
});

export default ListaRegistros;
