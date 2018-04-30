import { AsyncStorage } from 'react-native';

const SaveCart = async (arrCart) => {
    await AsyncStorage.setItem('@cart', JSON.stringify(arrCart));
};

export default SaveCart;