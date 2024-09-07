import { Alert } from "react-native";

const AsyncAlert = async (titulo='CONFIRMAÇÃO',mensagem='Confirma?') => new Promise((resolve) => {
    Alert.alert(
      titulo,
      mensagem,
      [
        {
          text: 'Sim',
          onPress: () => {
            resolve(true);
          },
        },
        {
            text: 'Não',
            onPress: () => {
              resolve(false);
            },
          },
      ],
      { cancelable: false },
    );
  });

  export default AsyncAlert;