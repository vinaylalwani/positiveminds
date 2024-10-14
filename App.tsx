/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import {
  View,
  PermissionsAndroid
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/Theme';
import messaging from '@react-native-firebase/messaging';
import { postRegisterFcmTokenApi } from './src/Services/API/LoginApi';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5CAB69',
    secondary: Colors.Blue2,
  },
};


const requestPushPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Push notificationn permissionn requested',
        message:
          'Please accept the permission for getting push notification',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the push');
    } else {
      console.log('push permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function App() {
  const uniqueId = DeviceInfo.getUniqueId();
  const systemName = DeviceInfo.getSystemName();

  const [fcmTokenState, setFcmTokenState] = React.useState('');

  function requestPermissionHadle(){
    requestUserPermission().then(()=>{
      messaging().registerDeviceForRemoteMessages().then((res)=> {
        console.warn('register', res)

        messaging().getToken()
        .then((fcmToken:any) => {
          console.warn(fcmToken);
  
          if (fcmToken) {
            // user has a device token
            setFcmTokenState(fcmToken);
            if(systemName) {
              postRegisterFcmTokenApi(fcmToken, systemName)
            }
          } else {
            // user doesn't have a device token yet
          }
        });
      })
    })
  }

  useEffect(()=>{
    requestPushPermission();
  },[])
  
  useEffect(() => {
    requestPermissionHadle();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (<View style={{ flex: 1 }}>
    <PaperProvider
      // settings={{
      //       icon: props => <FontAwesome {...props} />,
      //     }} 
      theme={theme}>
      <AppNavigator />
    </PaperProvider>
  </View>
  );
}

export default App;