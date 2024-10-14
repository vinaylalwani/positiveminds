import { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, ScrollView, Keyboard, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import { Alignment, Colors, GlobalStyle, Spacer } from '../../Theme';
import { KitText, KitButton, KitSpace, KitIconButton } from '../../Components';
import styles from './LoginStyle';
import { API } from '../../Services/API/API';
import { postLoginApi, postAutoLoginApi } from '../../Services/API/LoginApi';
import Snackbar from 'react-native-snackbar';



function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');//testUser@positivemind.com
  const [password, setPassword] = useState('');//Test@2023
  const [visible, setVisible] = useState(false);
  const [loader, setIsLoader] = useState(false);

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId: '871302515061-taikeq4u0tvl3632o71fvan9p3kf727l.apps.googleusercontent.com',
    // });
  })

  const handleLogin = async () => {
    // Implement your login logic here
    Keyboard.dismiss()
    setIsLoader(true);

    postLoginApi(email, password)
      .then(res => {
        // console.warn('login res', res);
        if(res){
          // save user data
          storeData(res?.data);

          // show success message
          Snackbar.show({
            text: 'Login Successfully!',
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
        // console.warn('login err', err);
        setIsLoader(false);
        // show error
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.error,
        });

      });

  };

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log('e', e)
    }

  }

  const storeData = async (userData, providerId) => {
    // console.log('userdata', userData)
    try {
      // save user data - email etc
      await AsyncStorage.setItem("userdata", JSON.stringify(userData?.user));
      // save token + refreshtoken
      await AsyncStorage.setItem('token', userData?.token);
      await AsyncStorage.setItem('refresh_token', userData?.refreshToken);
      await AsyncStorage.setItem('userType', providerId);
    } catch (error) {
      console.log("error while storing data", error);
    }
  };

  function handleAutoLogin(user){
    // console.warn('user', user);

    const {email, providerId, uid, displayName, photoURL } = user;
    
    postAutoLoginApi(displayName, email, providerId)
      .then(res => {
        // console.warn('postAutoLoginApi res', res);
        if(res){
         // save user data
         storeData(res?.data, providerId);


          Snackbar.show({
            text: 'Succesfully synced with database',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: Colors.green,
          });

          setTimeout(()=> {
            navigation.navigate('Main');
          },1000)

        }
      })
      .catch(err => {
        // console.warn('postAutoLoginApi err', err);
        // show error
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: Colors.error,
        });

      });
  }

  const googleLogin = async () => {
    // console.log('Google SignIn');
    try {
      onGoogleButtonPress().then(() => {
        auth().onAuthStateChanged((user) => {
          // console.warn('user', user._user.providerData[0])
          if (user) {
            // console.warn('User email: ', user.email);
            handleAutoLogin(user._user.providerData[0]);
            // storeData(user._user.providerData[0])
            
          }
        });
        // console.log('Signed in with Google!')
      })

    } catch (e) {
      console.log('e2', e)
    }
  }


  return (
    <View
      style={{
        // ...Alignment.mainCenter,
        ...Alignment.fill,
        ...{ backgroundColor: Colors.white }
      }}>


      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          // ...Alignment.mainCenter,
          // ...Alignment.fill,
        }}>

        <KitSpace height={60} />  

        <View
          style={{
            ...Alignment.mainCenter,
            ...Alignment.fill,
            ...Spacer.mediumHorizontalPadding,
            ...{ backgroundColor: Colors.white }
          }}>
          <KitText style={styles.title}>Positive Minds</KitText>
          <KitText style={styles.subTitle}>Change the way of solving your problems...</KitText>

          <KitSpace height={30} />

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode='outlined'
            autoCapitalize = 'none'
          />

          <KitSpace height={20} />

          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={pass => setPassword(pass)}
            mode='outlined'
            secureTextEntry
          />

          <KitSpace height={10} />

          <View style={Alignment.crossEnd}>
            <KitText onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password?</KitText>
          </View>

          <KitSpace height={20} />

          <KitButton loading={loader} compact={true} disabled={!email || !password} mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleLogin}>
            Login
          </KitButton>

          {/* <KitSpace height={30} /> */}

          {/* <KitText style={Alignment.textCenter}>OR</KitText> */}

          {/* <KitSpace height={20} />

          <View style={[Alignment.row, Alignment.center]}>
            <KitButton icon="google" compact={true} disabled={!email || !password} mode="contained" labelStyle={{ fontSize: 20, color:Colors.white, }} style={{backgroundColor:Colors.googleColor, flex:1, borderRadius:6}}  onPress={() => googleLogin()}>Sign in with Google
          </KitButton>

          </View> */}

          <KitSpace height={60} />

          <View style={[Alignment.rowCenter]}>

            <KitText style={[Alignment.textCenter]}>Need an Account?</KitText>
            <KitSpace width={20} />
            <KitButton mode='outlined' onPress={() => navigation.navigate('Signup')}>Sign Up</KitButton>
          </View>

          {/* <Button
      title="Google Sign-In"
      onPress={()=> googleLogin()}
    /> */}
        </View>
      </ScrollView>
    </View>
  );
}

export default LoginScreen;
