import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './API';

export async function getArticlesApi(cursor) {

  try {
    let url = 'getContent';

    let data = {
      "contentType": 'ARTICLES',
      "nextCursor": cursor
    };

    let token = await AsyncStorage.getItem('token');

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.postApi(url, data, option).then(response => {
      // console.log('quote res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

