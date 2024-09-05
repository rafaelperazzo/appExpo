import {useState} from 'react';
import {View} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';

export default function Autenticacao({route,navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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
                onPress={()=>{
                    navigation.navigate('Principal');
                }}
            >
            Entrar</Button>

        </View>
    );
}
