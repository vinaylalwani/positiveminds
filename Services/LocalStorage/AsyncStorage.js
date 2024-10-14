import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSingleStore = async (storeKey, storeValue) => {
  try {
    await AsyncStorage.setItem(storeKey, JSON.stringify(storeValue));
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const setMultipleStore = async (storeKeyValue, storeValue) => {
  try {
    await AsyncStorage.multiSet(storeKeyValue);
    return true;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getMultipleStore = async (storeKeyValue, storeValue) => {
  try {
    const multivalue = await AsyncStorage.multiGet(
      storeKeyValue,
      (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
        });
      }
    );
    return multivalue;
  } catch (e) {
    // saving error
    return false;
  }
};

export const getSingleStore = async storeKey => {
  // console.warn('storekey', storeKey)
  try {
    const value = await AsyncStorage.getItem(storeKey);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
      // console.warn('get', value)
    }
  } catch (e) {
    // error reading value
    return false;
  }
};

export const removeSingleStore = async storeKey => {
  try {
    await AsyncStorage.removeItem(storeKey);
    return true;
  } catch (e) {
    return false;
  }
};
