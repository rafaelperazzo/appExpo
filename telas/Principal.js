import {useState} from 'react';
import {View} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';

export default function Principal({route,navigation}) {
    return(
        <View>
            <Text variant="headlineSmall">Principal</Text>
            <Button mode="contained" 
                onPress={()=>{
                    navigation.navigate('Cadastrar');
                }}
            >Cadastrar</Button>
            <DataTable>
                <DataTable.Header>
                   <DataTable.Title>ID</DataTable.Title>
                   <DataTable.Title>Descrição</DataTable.Title>
                   <DataTable.Title>Remover</DataTable.Title>
                </DataTable.Header>

            </DataTable>
        </View>
    );
}