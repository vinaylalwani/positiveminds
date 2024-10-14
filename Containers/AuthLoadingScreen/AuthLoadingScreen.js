import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Alignment, Colors } from '../../Theme';
import { postRefreshTokenApi } from '../../Services/API/LoginApi';
import Snackbar from 'react-native-snackbar';


function AuthLoadingScreen({navigation, size = 'large'}) {
  const [animate, setAnimate] = React.useState(true);
  const [loader, setIsLoader] = React.useState(false);

  /**
   * check logged in or not from api token stored in localstorage
   * then it will route to relevant screen otherwise goes to signin
   * it takes one second to call the function to check from asyncstorage
   */
  const checkIsLoggedInFun = async () => {
    let refreshToken = await AsyncStorage.getItem('refresh_token');

    if(refreshToken) {
      setAnimate(false);
      handleRefreshTokenApi(refreshToken);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  React.useEffect(() => {
    setTimeout(()=>{
      checkIsLoggedInFun()
    },3000)
  }, []);

  const storeData = async (userData) => {
    try {
      await AsyncStorage.setItem("userdata", JSON.stringify(userData));

      // save token + refreshtoken
      await AsyncStorage.setItem('token', userData?.token);
      await AsyncStorage.setItem('refresh_token', userData?.refreshToken);
      await AsyncStorage.setItem('userType', providerId);
    } catch (error) {
      // console.log("error while storing data", error);
    }
  };

  const handleRefreshTokenApi = async (refreshTokenParam) => {
    postRefreshTokenApi(refreshTokenParam)
      .then(res => {
        // console.warn('refreshtoken res', res);
        if(res){
          // save user data
          storeData(res?.data);

          // show success message
          Snackbar.show({
            text: 'Session Updated!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });

          // redirect to home
          setTimeout(()=>{
            navigation.navigate('Main')
          },2000)
        }
      })
      .catch(err => {
        // console.warn('refresh err', err);
        setIsLoader(false);
        setAnimate(false);
        // show error
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.error,
        });

      });

  };

  return (
    <View
      style={{
        ...Alignment.fillRowCenter,
      }}>
      <ActivityIndicator size={size} animating={animate} />
    </View>
  );
}

export default AuthLoadingScreen;
