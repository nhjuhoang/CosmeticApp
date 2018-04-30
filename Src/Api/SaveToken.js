import { AsyncStorage } from 'react-native';

const SaveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

export default SaveToken;