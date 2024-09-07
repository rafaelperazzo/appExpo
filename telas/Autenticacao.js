import {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import supabase from '../db/database';
import { save,getValueFor } from '../storage/Storage';

export default function Autenticacao({route,navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [resultado, setResultado] = useState('');
    const [atualizar, setAtualizar] = useState(false);
    return(
        <View>
            <Text variant="headlineSmall">Autenticação</Text>
            <TextInput 
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <Button mode="contained"
                onPress={
                    async()=>{
                        setAtualizar(true);
                        let {data,error} = await supabase.auth.signInWithPassword({
                            email: email,
                            password: senha
                        });
                    
                        if(error){
                            console.log(error);
                            setResultado('Erro ao autenticar');
                        }
                        else {
                            await save('usuario',email);
                            await save('autenticado','1');
                            navigation.navigate('Principal');
                        }
                        setAtualizar(false);
                    }
                }
                loading={atualizar}
            >
            Entrar</Button>
            <Text>{resultado}</Text>
        </View>
    );
}
