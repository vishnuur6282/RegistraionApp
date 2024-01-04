// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStoredData = async (data: any, key: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error setting data in AsyncStorage:', error);
    throw error;
  }
};

export const getStoredData = async (key: string) => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Error getting data from AsyncStorage:', error);
    throw error;
  }
};

export const clearStoredData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing data from AsyncStorage:', error);
    throw error;
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage data cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
  }
};
