import { useState } from 'react';
import { TextInput, Modal, Portal } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { View, ScrollView, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alignment, Colors, Spacer } from '../../Theme';
import { KitText, KitButton, KitSpace } from '../../Components';
import styles from './ForgotPasswordScreenStyle';
import { postForgetPasswordApi, postVerifyApi } from '../../Services/API/SignupApi';



function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [visible, setVisible] = useState(false);
  const [loader, setIsLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);

  const hideModal = () => {
    setOtpLoader(false);
    setOtp('');
    setModalVisible(false)
  };
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const handleForgetPassword = async () => {
    // Implement your login logic here
    // console.log('Username:', email);
    Keyboard.dismiss()
    setIsLoader(true);
    // otp modal
    setModalVisible(true);

    postForgetPasswordApi(email)
      .then(res => {
        // console.warn('postForgetPasswordApi res', res);
        if (res) {
          // console.log('res', res);

          // setModalVisible(false);
          setIsLoader(false)

          Snackbar.show({
            text: res?.data?.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });

          // setTimeout(()=>{
          //   navigation.reset({
          //     index: 0,
          //     routes: [{name: 'CreateNewPassword'}],
          //   });
          // }, 3000)
          // AsyncStorage.setItem('token', res?.data?.token);


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

  const handleVerify = async () => {
    // Implement your login logic here
    Keyboard.dismiss()
    // console.log('otp:', otp);
    setOtpLoader(true);

    postVerifyApi(email, otp)
      .then(res => {
        // console.warn('postVerifyApi res', res);
        if (res) {
          // console.log('res', res);

          setOtpLoader(false);
          setModalVisible(false);
          setOtp('');
          // save token

          // send user to home screen
          Snackbar.show({
            text: res?.data?.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });

          // setTimeout(()=>{
          //   navigation.reset({
          //     index: 0,
          //     routes: [{name: 'CreateNewPassword'}],
          //   });
          // }, 3000)
          // AsyncStorage.setItem('token', res?.data?.token);

          navigation.navigate('CreateNewPassword', {
            emailId: email,
            userId: res?.data.userId,
          });
        }
      })
      .catch(err => {
        // console.warn('signup err', err);
        setOtpLoader(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: Colors.error,
        });

      });

  };

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
          ...Alignment.mainCenter,
          // ...Alignment.fill,
        }}>
        <View
          style={{
            // ...Alignment.mainCenter,
            ...Alignment.fill,
            ...Spacer.mediumHorizontalPadding,
            ...{ backgroundColor: Colors.white }
          }}>
          <KitSpace height={30} />
          <KitText style={styles.title}>Forgot password</KitText>
          <KitText style={styles.subTitle}>Please write your email id</KitText>

          <KitSpace height={10} />

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode='outlined'
            autoCapitalize='none'
          />

          <KitSpace height={20} />

          <KitButton loading={loader} compact={true} disabled={!email} mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleForgetPassword}>
            Confirm
          </KitButton>

          <KitSpace height={20} />

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

export default ForgotPasswordScreen;
