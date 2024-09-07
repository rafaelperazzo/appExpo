import {useState,useEffect} from 'react';
import {ScrollView,Alert} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import supabase from '../db/database';
import AsyncAlert from '../componentes/Alerta';

export default function Principal({route,navigation}) {
    const [dados,setDados] = useState([]);
    const [atualizar,setAtualizar] = useState(false);
    useEffect(()=>{
        async function read_data() {
            setAtualizar(true);
            let { data: ocorrencias, error } = await supabase
            .from('ocorrencias')
            .select('*').order('id');
            if (error) {
                console.log(error);
            }
            else
                setDados(ocorrencias);
            setAtualizar(false);
            
        }
        read_data();
    },[route.params?.ocorrencia]);
    
    return(
        <ScrollView>
            <Text variant="headlineSmall">Principal</Text>
            <Button mode="contained" 
                onPress={()=>{
                    navigation.navigate('Cadastrar');
                }}
                loading={atualizar}

            >Cadastrar</Button>
            <Button mode="elevated"
                onPress={async()=>{
                    setAtualizar(true);
                    let { data: ocorrencias, error } = await supabase
                    .from('ocorrencias')
                    .select('*').order('id');
                    if (error) {
                        console.log(error);
                    }
                    else
                        setDados(ocorrencias);
                    setAtualizar(false);
                }}
                loading={atualizar}
            >Atualizar</Button>
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
                                    const confirma = await AsyncAlert('CONFIRMAÇÃO','Deseja realmente remover a ocorrência ?');
                                    if(!confirma)
                                        return;
                                    setAtualizar(true);
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
                                    setAtualizar(false);
                                }}
                            >Remover</Button>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

            </DataTable>
        </ScrollView>
    );
}