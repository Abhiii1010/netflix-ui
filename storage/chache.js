import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('MOVIES', JSON.stringify(movies));
