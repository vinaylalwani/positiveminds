import React, { useState } from "react";
import { View, ScrollView, Alert } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import { KitText, KitLoader } from '../../Components';
import styles from "./SettingsStyle";
import { Colors } from "../../Theme";
import { linkOpen } from "../../Utilities/linkOpen";
import { deleteMyAccount } from "../../Services/API/LoginApi";

function Settings({ navigation, route }) {
  async function onSignOut() {
    try {
      // Check if your device supports Google Play
      // await GoogleSignin.signOut();
      let userType = await AsyncStorage.getItem('userType');
      
      if(userType && userType?.includes('google')) {
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem('userType');
      }

      await AsyncStorage.removeItem('userdata');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refresh_token');


      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      
    } catch (e) {
      console.log('e', e)
    }

  }

  const showConfirmDialog = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to remove this account? After confirmation, you will be logged out.',
      [
        // The "Yes" button
        { text: 'Yes', onPress: () => deleteAccountHandle() },
        // The "No" button (optional)
        { text: 'No', style: 'cancel' },
      ]
    );
  };

  const deleteAccountHandle = async () => {

    /**
     * it will call a delete api and i will only provide token and it will delete the account and logout user and removes all the locally saved data
     */
    
    
    
    deleteMyAccount()
      .then(res => {
        // console.warn('postAutoLoginApi res', res);
        if(res){
          Alert.alert(
            'User Account deleted Successfully!',
            'Pressing ‘OK’ will redirect you to the login screen.',
            [
              // The "Yes" button
              { text: 'Ok', onPress: () => onSignOut() },
            ]
          );

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

  return (
    <View
      style={styles.container}>

      <ScrollView
        // keyboardDismissMode="on-drag"
        // keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          // padding:10,
          // ...Alignment.mainCenter,
          // ...Alignment.fill,
        }}>

        <List.Item
          onPress={() => linkOpen('https://stemdrona.com/terms-and-conditions')}
          title="Privacy Policy"
          titleStyle={styles.menuText}
          left={props => <List.Icon {...props} icon="shield-alert" color={Colors.ash2} />}
        />
        <List.Item
          onPress={()=> showConfirmDialog()}
          title="Delete Account"
          titleStyle={{color:Colors.red}}
          description="Delete your Account from PositiveMinds"
          left={props => <List.Icon {...props} icon="delete" color={Colors.red} />}
        />
      </ScrollView>
    </View>
  )
}

export default Settings