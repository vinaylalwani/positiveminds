import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { View, ScrollView, Keyboard } from 'react-native';
import { Alignment, Colors, Spacer } from '../../Theme';
import { KitText, KitButton, KitSpace } from '../../Components';
import styles from './CreateNewPasswordStyle';
import { postUpdatePasswordApi } from '../../Services/API/SignupApi';

function CreateNewPassword({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loader, setIsLoader] = useState(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const { emailId, userId } = route?.params;

  const handlePasswordChange = async () => {
    setIsLoader(true);
    Keyboard.dismiss()

    postUpdatePasswordApi(userId, password)
      .then(res => {
        // console.warn('postUpdatePasswordApi res', res);
        if (res) {
          // console.log('res', res);
          
          setIsLoader(false)
        
          Snackbar.show({
            text: 'Password changed! Please login to continue...',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });
          // AsyncStorage.setItem('token', res?.data?.token);

          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }
      })
      .catch(err => {
        // console.warn('signup err', err);
        setIsLoader(false);
        Snackbar.show({
          text: err?.message,
          duration: Snackbar.LENGTH_SHORT,
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
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          ...Alignment.mainCenter,
          ...Alignment.fill,
        }}>
        <View
          style={{
            // ...Alignment.mainCenter,
            ...Alignment.fill,
            ...Spacer.mediumHorizontalPadding,
            ...{ backgroundColor: Colors.white }
          }}>
          <KitSpace height={30} />
          <KitText style={styles.title}>Create New Password</KitText>

          <KitSpace height={10} />

          <TextInput
            style={styles.input}
            label="New Password"
            value={password}
            onChangeText={text => setPassword(text)}
            mode='outlined'
            autoCapitalize = 'none'
            secureTextEntry
          />

          <KitSpace height={20} />

          <TextInput
            style={styles.input}
            label="Confirm New Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            mode='outlined'
            autoCapitalize = 'none'
            secureTextEntry
          />

          <KitSpace height={20} />

          <KitButton loading={loader} compact={true} disabled={!password || !confirmPassword && confirmPassword === password} mode="contained" labelStyle={{ fontSize: 20 }} onPress={handlePasswordChange}>
            Confirm
          </KitButton>
        </View>
      </ScrollView>

    </View>
  );
}

export default CreateNewPassword;
