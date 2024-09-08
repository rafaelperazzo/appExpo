import {useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import supabase from '../db/database';
import { save } from '../storage/Storage';

export default function Autenticacao({route,navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [resultado, setResultado] = useState('');
    const [atualizar, setAtualizar] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.conteudo}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    conteudo: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: 50,
        justifyContent: 'center',
    },
});