import { useState, useEffect } from 'react';
import { TextInput, RadioButton } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import { View, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alignment, Colors, Fonts, Spacer } from '../../Theme';
import { KitText, KitButton, KitSpace, KitLoader } from '../../Components';
import styles from './ProfileScreenStyle';
import { API } from '../../Services/API/API';
import { getUserProfileDataApi } from '../../Services/API/SignupApi';
import { postUpdateUserProfile } from '../../Services/API/LoginApi';

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loader, setIsLoader] = useState(true);
  const [pref, setPref] = useState('All');

  const getData = async () => {
    const token = await AsyncStorage.getItem("token")
    // Implement your login logic here
    // console.log('token:', token);
    getUserProfileDataApi(token)
      .then(res => {
        // console.warn('getUserProfileDataApi res', res);
        if (res) {
          // console.warn('res', res);
          setUser(res?.data?.data?.user);
          setEmail(res?.data?.data?.user?.email_id);
          setName(res?.data?.data?.user?.name);
          setPref(res?.data?.data?.user?.persona_category)
          setIsLoader(false)
        }
      })
      .catch(err => {
        setIsLoader(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: Colors.error,
        });

      });

  };

  const updateProfile = () => {
    // Implement your login logic here
    postUpdateUserProfile(name, pref)
      .then(res => {
        // console.warn('postUpdateUserProfile res', res);
        if (res) {
          // console.warn('res', res);
          Snackbar.show({
            text: 'Updated Profile Successfully!',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: Colors.green,
          });
        }
      })
      .catch(err => {
        // console.warn('signup err', err);
        // setIsLoader(false);
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: Colors.error,
        });

      });
  }

  useEffect(() => {
    getData();
  }, [])

  if (loader) {
    return (<KitLoader />)
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
        keyboardShouldPersistTaps="always"
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
          <KitText variant="titleLarge">Profile</KitText>

          <KitSpace height={10} />

          <TextInput
            style={styles.input}
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            mode='outlined'
            autoCapitalize='none'
          />

          <KitSpace height={20} />

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            mode='outlined'
            autoCapitalize='none'
            disabled
          />

          {/* <KitSpace height={20} />

          <TextInput
            style={styles.input}
            label="Age"
            value={age}
            onChangeText={text => setAge(text)}
            mode='outlined'
            autoCapitalize = 'none'
          /> */}
          <KitSpace height={20} />

          <KitText variant="titleMedium" style={{ marginBottom:10}}>Content Preference</KitText>
          <RadioButton.Group  onValueChange={newValue => setPref(newValue)} value={pref}>
            <View style={Alignment.rowCross}>
              <KitText>All</KitText>
              <RadioButton.Item value="All" mode='android' />
            </View>
            <View style={Alignment.rowCross}>
              <KitText>Adult Focused</KitText>
              <RadioButton.Item value="Persona1" mode='android' />
            </View>

            <View style={Alignment.rowCross}>
              <KitText>Teenager Focused</KitText>
              <RadioButton.Item value="Persona2" mode='android' />
            </View>
          </RadioButton.Group>

          <KitSpace height={20} />

          <KitButton loading={loader} compact={true} disabled={!email} mode="contained" labelStyle={{ fontSize: 20 }} onPress={updateProfile}>
            Update
          </KitButton>
          <KitSpace height={20} />
        </View>
      </ScrollView>



    </View>
  );
}

export default ProfileScreen;
