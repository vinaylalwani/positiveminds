import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './API';

export async function getAboutUsApi() {

  try {
    let url = 'aboutPage';

    let token = await AsyncStorage.getItem('token');

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.getApi(url, option).then(response => {
      // console.log('about res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

