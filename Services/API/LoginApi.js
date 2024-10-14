import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from './API';

export async function postLoginApi(
  email,
  password,
) {

  try {
    let url = 'login';

    let data = {
      "emailId": email,
      "password": password,
    };

    // let option= {
    //   headers: {
    //     'content-Type': 'application/json',
    //     Accept: 'application/json',
    //     // 'Content-Type': 'application/json;charset=UTF-8'
    //   },
    // }

    return API.postApi(url, data).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function postAutoLoginApi(
  displayName, email, providerId
) {

  try {
    let url = 'autoLogin';

    

    let data = {
      "emailId": email,
      "name":displayName,
      "provider": providerId,
      "userType": "Reader",
      "age" : 30 // default for now
    };

    return API.postApi(url, data).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function postRefreshTokenApi(
  refreshToken
) {
  try {
    let url = 'renewAccessToken';

    let data = {
      "refreshToken": refreshToken
    };

    // console.warn('payload', data);

    // let option= {
    //   headers: {
    //     'content-Type': 'application/json',
    //     Accept: 'application/json',
    //     // 'Content-Type': 'application/json;charset=UTF-8'
    //   },
    // }

    return API.postApi(url, data).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function postUpdateUserProfile(name, contentPref) {
  try {
    let url = 'updateUserProfile';

    let data = {
      "name": name,
      "personaCategory": contentPref
    };

    // console.warn('updateUserProfile payload', data);

    let token = await AsyncStorage.getItem('token');

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.postApi(url, data, option).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function postRegisterFcmTokenApi(
  deviceToken,
  deviceType
) {
  try {
    // console.log('deviceToken', deviceToken);
    // console.log('deviceType', deviceType);
    
    let url = 'registerFcmToken';

    let data = {
      "deviceToken": deviceToken,
      "deviceType": deviceType?.toUpperCase() //IOS | ANDROID
    };

    // console.warn('postRegisterFcmTokenApi payload', data);

    // let option= {
    //   headers: {
    //     'content-Type': 'application/json',
    //     Accept: 'application/json',
    //     // 'Content-Type': 'application/json;charset=UTF-8'
    //   },
    // }

    return API.postApi(url, data).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function deleteMyAccount(token) {

  try {
    let url = 'deleteMyAccount';

    let token = await AsyncStorage.getItem('token');

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.getApi(url, option).then(response => {
      // console.log('deleteMyAccount res', response);
      return response;
    });
  } catch (error) {
    // console.log('deleteMyAccount error', error);
    throw Error(error);
  }
}