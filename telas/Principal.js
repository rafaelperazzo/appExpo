import {useState,useEffect} from 'react';
import {View,ScrollView} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import supabase from '../db/database';

export default function Principal({route,navigation}) {
    const [dados,setDados] = useState([]);
    useEffect(()=>{
        async function read_data() {
            let { data: ocorrencias, error } = await supabase
            .from('ocorrencias')
            .select('*').order('id');
            if (error) {
                console.log(error);
            }
            else
                setDados(ocorrencias);
            
        }
        read_data();
    },[]);
    
    return(
        <ScrollView>
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
                {dados.map((item) => (    
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.id}</DataTable.Cell>
                        <DataTable.Cell
                            onPress={()=>{
                                navigation.navigate('Atualizar',{id_ocorrencia:item.id});
                            }
                        }>{item.descricao}</DataTable.Cell>
                        <DataTable.Cell>
                            <Button mode="contained"
                                onPress={async()=>{
                                    let {error} = await supabase
                                    .from('ocorrencias')
                                    .delete()
                                    .eq('id',item.id);
                                    if(error){
                                        console.log(error);
                                    }
                                    else {
                                        let { data: ocorrencias, error } = await supabase
                                        .from('ocorrencias')
                                        .select('*').order('id');
                                        if (error) {
                                            console.log(error);
                                        }
                                        else
                                            setDados(ocorrencias);
                                    }
                                }}
                            >Remover</Button>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
        </ScrollView>
    );
}