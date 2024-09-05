import {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';

export default function Cadastrar() {
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
                onPress={()=>{
                    setResultado('Ocorrência cadastrada com sucesso.');
                }}
            >Cadastrar
            </Button>
            <Text>{resultado}</Text>
        </View>
    );
}