import {API} from './API';

export async function postSignupApi(
  email,
  password,
  acceptTerms
) {

  try {
    let url = 'signup';

    let data = {
      "emailId": email,
      "password": password,
      "acceptTerms": acceptTerms,
      // "age": age,
      // "personaCategory": "Persona1",
      // "userType": "Reader"
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

export async function postVerifyApi(
  email,
  otp
) {

  try {
    let url = 'verifyOtp';

    let data = {
      "emailId": email,
      "otp": otp
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

export async function getUserProfileDataApi(token) {

  try {
    let url = 'getUserProfile';

    let option= {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    return API.getApi(url, option).then(response => {
      // console.log('res', response);
      return response;
    });
  } catch (error) {
    // console.log('error', error);
    throw Error(error);
  }
}

export async function postForgetPasswordApi(
  email
) {

  try {
    let url = 'forgetPassword';

    let data = {
      "emailId": email
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

export async function postUpdatePasswordApi(
  userId,
  password
) {

  try {
    let url = 'updatePassword';

    let data = {
      "userId": userId,
      "newPassword": password
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

