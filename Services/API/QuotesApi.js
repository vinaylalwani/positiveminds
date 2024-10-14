import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './API';

export async function getQuotesApi(cursor) {

  try {
    let url = 'getContent';

    let data = {
      "contentType": 'QUOTES',
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

export async function getQuotesOfDayApi(token) {

  try {
    let url = 'getQuoteOftheDay';

   

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.getApi(url, option).then(response => {
      // console.log('get quote of day res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

