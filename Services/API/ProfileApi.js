import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './API';

export async function getProfileApi() {
  // console.log('getProfileApi');
  let authToken = await AsyncStorage.getItem('@token');
  try {
    let url = 'user_profile';

    // console.log('token', authToken);
    let option = {
      headers: {
        // Authorization: `Bearer ${authToken}`,
        user: authToken,
      },
    };
    // let splitFullName = fullName.split(' ');

    // // let lastname = splitFullName[splitFullName.length - 1];
    // let lastname = splitFullName.pop();

    
    // let firstName = splitFullName.join(' ')

    // let data = {
    //   email,
    //   first_name: firstName,
    //   last_name: lastname,
    //   phone: phoneNumber,
    //   password: password,
    // };

    return API.getApi(url, option).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('errr', error.response)
    throw Error(error);
  }
}

export async function postProfileUpdateApi(email, otp) {
  // console.log('postProfileUpdateApi', email, otp);

  try {
    let url = 'candidate/update';

    // let option = {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // };

    let data = {
      email,
      code: otp,
    };

    return API.postApi(url, data).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    throw Error(error);
  }
}

