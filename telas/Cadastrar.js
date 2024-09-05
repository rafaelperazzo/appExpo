import {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import supabase from '../db/database';

export default function Cadastrar({route,navigation}) {
    const [ocorrencia, setOcorrencia] = useState('');
    const [resultado, setResultado] = useState('');
    return(
        <View>
            <Text variant="headlineSmall">Cadastrar</Text>
            <TextInput 
                label="Ocorrência"
                value={ocorrencia}
                onChangeText={setOcorrencia}
            />
            <Button mode="contained"
                onPress={async()=>{
                    let {data,error} = await supabase
                    .from('ocorrencias')
                    .insert({descricao: ocorrencia});
                    if(error){
                        console.log(error);
                        setResultado('Erro ao cadastrar');
                    }
                    else {
                        setResultado('Cadastrado com sucesso');
                        navigation.navigate('Principal');
                    }
                }}
            >Cadastrar
            </Button>
            <Text>{resultado}</Text>
        </View>
    );
}