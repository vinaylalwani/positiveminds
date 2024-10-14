import { useState, useEffect } from 'react';
import { TextInput, Modal, Portal } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { View, ScrollView, Switch } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import { Alignment, Colors, Spacer } from '../../Theme';
import { KitText, KitButton, KitSpace } from '../../Components';
import styles from './SignupScreenStyle';
import { postSignupApi, postVerifyApi } from '../../Services/API/SignupApi';
import { linkOpen } from '../../Utilities/linkOpen';

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loader, setIsLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const hideModal = () => setModalVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '871302515061-taikeq4u0tvl3632o71fvan9p3kf727l.apps.googleusercontent.com',
    });
  })

  const handleSingup = async () => {
    // Implement your login logic here
    setIsLoader(true);

    postSignupApi(email, password, acceptTerms)
      .then(res => {
        // console.warn('signup res', res);
        if (res) {
          // console.log('res', res);
          // Snackbar.show({
          //   text: res.message,
          //   duration: Snackbar.LENGTH_LONG,
          //   backgroundColor: Colors.green,
          // });
          setModalVisible(true);
          setIsLoader(false);
          // AsyncStorage.setItem('token', res?.data?.token);

          // navigation.navigate('Main')
        }
      })
      .catch(err => {
        // console.warn('signup err', err);
        setIsLoader(false);
        // setVisible(true);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: Colors.error,
        });

      });

  };

  const handleVerify = async () => {
    // Implement your login logic here
    // console.log('otp:', otp);
    setOtpLoader(true);



    postVerifyApi(email, otp)
      .then(res => {
        // console.warn('verify res', res);
        if (res) {
          // console.log('res', res);

          setOtpLoader(false);
          setModalVisible(false);
          setOtp('');
          // save token

          // send user to home screen
          Snackbar.show({
            text: 'Sign Up successfully! Please login to continue...',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });

          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }, 3000)
          // AsyncStorage.setItem('token', res?.data?.token);

          // navigation.navigate('Main')
        }
      })
      .catch(err => {
        // console.warn('signup err', err);
        setIsLoader(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
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

  const storeData = async (userData) => {
    try {
      await AsyncStorage.setItem("userdata", JSON.stringify(userData));
    } catch (error) {
      console.log("error while storing data", error);
    }
  };

  const googleLogin = async () => {
    // console.log('Google SignIn');
    try {
      onGoogleButtonPress().then(() => {
        auth().onAuthStateChanged((user) => {
          // console.warn('user', user._user.providerData[0])
          if (user) {
            // console.warn('User email: ', user?.email);
            storeData(user?._user.providerData[0])
            navigation.navigate('Main')
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
        keyboardDismissMode="interactivee"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          // ...Alignment.mainCenter,
          // ...Alignment.fill,
        }}>

        <KitSpace height={30} />
        <View
          style={{
            ...Alignment.mainCenter,
            ...Alignment.fill,
            ...Spacer.mediumHorizontalPadding,
            ...{ backgroundColor: Colors.white }
          }}>
          <KitText style={styles.title}>Sign up</KitText>
          {/* <KitText style={styles.subTitle}>Change the way of solving your problems...</KitText> */}

          <KitSpace height={30} />

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode='outlined'
            autoCapitalize='none'
          />

          <KitSpace height={20} />

          <TextInput
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={pass => setPassword(pass)}
            mode='outlined'
            autoCapitalize='none'
            secureTextEntry
          />

          <KitSpace height={20} />

          {/* <TextInput
            style={styles.input}
            label="Age"
            value={age}
            onChangeText={x => setAge(x)}
            mode='outlined'
          /> */}

          <View style={{ ...Alignment.rowCross, }}>

            <Switch
              value={acceptTerms}
              onValueChange={() => setAcceptTerms(!acceptTerms)}
              style={{marginRight:10}}
            />
            <KitText>Accept <KitText style={{ color: Colors.Blue2 }} onPress={() => linkOpen('https://stemdrona.com/terms-and-conditions')}>Terms & Conditions</KitText></KitText>
          </View>


          <KitSpace height={20} />

          <KitButton loading={loader} compact={true} disabled={!email || !password || !acceptTerms} mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleSingup}>
            Sign up
          </KitButton>

          {/* <KitSpace height={30} /> */}

          {/* <KitText style={Alignment.textCenter}>OR</KitText>

          <KitSpace height={20} /> */}

          {/* <View style={[Alignment.row, Alignment.center]}>
            <KitButton icon="google" compact={true} disabled={!email || !password} mode="contained" labelStyle={{ fontSize: 20, color: Colors.white, }} style={{ backgroundColor: Colors.googleColor, flex: 1, borderRadius: 6 }} onPress={() => googleLogin()}>Sign up with Google
            </KitButton>

          </View>
          <KitSpace height={60} /> */}
        </View>
      </ScrollView>


      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <KitText style={Alignment.textCenter}>Please check your mail for OTP.</KitText>

          <KitSpace height={30} />

          <TextInput
            style={styles.input}
            label="OTP"
            value={otp}
            onChangeText={x => setOtp(x)}
            mode='outlined'
          />


          <KitSpace height={20} />

          <KitButton loading={otpLoader} compact={true} disabled={!otp} mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => handleVerify()}>
            Verify OTP
          </KitButton>
        </Modal>

      </Portal>
    </View>
  );
}

export default SignupScreen;
