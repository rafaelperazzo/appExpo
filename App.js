import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider,MD3LightTheme } from 'react-native-paper';
import Autenticacao from './telas/Autenticacao';
import Cadastrar from './telas/Cadastrar';
import Principal from './telas/Principal';
import Atualizar from './telas/Atualizar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Autenticacao">
          <Stack.Screen name="Autenticacao" component={Autenticacao} 
              options={{title: 'Principal'}}
              initialParams={{ ocorrencia: '' }}
          />
          <Stack.Screen name="Cadastrar" component={Cadastrar} 
              options={{title: 'Cadastrar'}}
          />
          <Stack.Screen name="Principal" component={Principal}
              options={{title: 'Principal'}}
          />
          <Stack.Screen name="Atualizar" component={Atualizar}
              options={{title: 'Atualizar'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
