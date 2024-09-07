import {useState,useEffect} from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import supabase from '../db/database';

export default function Atualizar({route,navigation}) {
    const [ocorrencia, setOcorrencia] = useState('');
    const [resultado, setResultado] = useState('');
    const [atualizar, setAtualizar] = useState(false);
    const {id_ocorrencia} = route.params;
    useEffect(()=>{
        async function read_data() {
            setAtualizar(true);
            let { data: ocorrencia, error } = await supabase
            .from('ocorrencias')
            .select('descricao')
            .eq('id',id_ocorrencia);
            if (error) {
                console.log(error);
            }
            else
                setOcorrencia(ocorrencia[0].descricao);
            setAtualizar(false);
        }
        read_data();
    },[]);
    return(
        <View>
            <Text variant="headlineSmall">Cadastrar</Text>
            <TextInput 
                label="Ocorrência"
                value={ocorrencia}
                onChangeText={setOcorrencia}
            />
            <Button mode="contained"
                onPress={
                    async()=>{
                        setAtualizar(true);
                        let {error} = await supabase
                        .from('ocorrencias')
                        .update({descricao: ocorrencia})
                        .eq('id',id_ocorrencia);
                        if(error){
                            console.log(error);
                            setResultado('Erro ao atualizar');
                        }
                        else {
                            setResultado('Atualizado com sucesso');
                            navigation.navigate('Principal',{ocorrencia:ocorrencia});
                        }
                        setAtualizar(false);
                }
            }
            loading={atualizar}
            >Atualizar
            </Button>
            <Text>{resultado}</Text>
        </View>
    );
}