/**
 * firebase.js and firebase.json important
 *  https://rnfirebase.io/messaging/usage#notification-color
 * https://rnfirebase.io/messaging/usage#background-handler-timeout-android
 * "messaging_android_headless_task_timeout": 30000
 */

import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
const config = {
  clientId:
    '871302515061-taikeq4u0tvl3632o71fvan9p3kf727l.apps.googleusercontent.com',
  appId: '1:871302515061:ios:d3e88c88b32cc8a9616b3c',
  apiKey: 'AIzaSyDYgcuFceWrXqFhNY0PfgSKxCZhTV-kE-w',
  databaseURL: '',
  storageBucket: 'ositive-minds-7b89f.appspot.com',
  messagingSenderId: '',
  projectId: 'positive-minds-7b89f',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export {firebase};
