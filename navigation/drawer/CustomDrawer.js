import { View, SafeAreaView, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import { Colors, Alignment, Spacer } from '../../Theme';
import { KitText, KitLogo } from '../../Components';
import { getUserProfileDataApi } from '../../Services/API/SignupApi';
import Snackbar from 'react-native-snackbar';
import { linkOpen, mailOpen } from '../../Utilities/linkOpen';

const appStoreUrl = 'https://apps.apple.com/us/app/positiveminds/id6503220621';

const CustomDrawer = ({ navigation }) => {
  const [, setUser] = useState({});
  // const getData = async (userData) => {
  //   try {
  //     const user = await AsyncStorage.getItem("userdata", JSON.stringify(userData));
  //     console.warn(user)
  //     setUser(JSON.parse(user));
  //   } catch (error) {
  //     console.log("error while storing data", error);
  //   }
  // };

  const getData = async () => {
    const token = await AsyncStorage.getItem("token")
    // Implement your login logic here
    // console.log('token:', token);
    getUserProfileDataApi(token)
      .then(res => {
        // console.warn('getUserProfileDataApi res', res);
        if (res) {
          // console.log('res', res);
          setUser(res?.data?.data?.user)
          
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

  };

  useEffect(()=>{
    getData();
  }, [])

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

  const linkOpenHandle = () => {
    const iosUrl = 'https://apps.apple.com/us/app/positiveminds/id6503220621';
    const androidUrl = '';
  
    const url = Platform.OS === 'ios' ? iosUrl : androidUrl;
  
    linkOpen(url);
  };

  return (
    <SafeAreaView style={Alignment.fill}>
      <ScrollView>
        <View style={styles.container}>
          {/* user block */}
          <View style={[Alignment.row, styles.userInfoWrap]}>
            <View style={styles.userInfoImg}>
              {/* <Avatar.Image size={40} source={{ uri: user && user?.photoURL }} /> */}
              {/* <Avatar.Icon size={60} color='white' icon="brain" /> */}
              <KitLogo />
            </View>
            <View style={styles.userInfoContent}>
              <KitText variant="titleLarge" style={styles.userInfoText}>Positive Minds</KitText>
              {/* <KitText variant="labelLarge" style={styles.userInfoText}>tag line goes here</KitText> */}
              
              {/* <KitText variant="labelSmall" onPress={()=> onSignOut()} style={styles.userInfoText}>Signout</KitText> */}
            </View>
          </View>

          <Divider />

          {/* menu */}
          <List.Item
            onPress={() => navigation.navigate('Quotes')}
            title="Quotes"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="meditation" color={Colors.quotesColor} />}
          />

          <List.Item
            onPress={() => navigation.navigate('Articles')}
            title="Articles"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="book-open-outline" color={Colors.articleColor} />}
          />

          <List.Item
            onPress={() => navigation.navigate('Videos')}
            title="Videos"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="video" color={Colors.videoColor} />}
          />

          <List.Item
            onPress={() => navigation.navigate('Stories')}
            title="Stories"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="book" color={Colors.storiesColor} />}
          />

          <List.Item
            onPress={() => navigation.navigate('Music')}
            title="Music"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="music" color={Colors.musicColor} />}
          />


          <List.Item
            onPress={() => navigation.navigate('Exercises')}
            title="Exercises"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="run" color={Colors.excerciesColor} />}
          />

          <List.Item
            onPress={() => navigation.navigate('Books')}
            title="Books"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="bookshelf" color={Colors.booksColor} />}
          />

          {/* <List.Item
            onPress={() => navigation.navigate('Literature')}
            titleStyle={styles.menuText}
            title="Literature"
            left={props => <List.Icon {...props} icon="book-education" color={Colors.literatureColor} />}
          /> */}

          <Divider />

          

          <List.Item
            onPress={() => mailOpen('info@positiveminds.ai')}
            title="Email Us"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="mail" color={Colors.ash2} />}
          />

          <List.Item
            onPress={() => linkOpenHandle()}
            title="Rate Us"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="star" color={Colors.ash2} />}
          />

          <List.Item
            onPress={() => navigation.navigate('AboutUs')}
            title="About Us"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="account-group" color={Colors.ash2} />}
          />
          <Divider/>

          <List.Item
            onPress={() => navigation.navigate('Settings')}
            title="Settings"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="cog" color={Colors.ash2} />}
          />

          <Divider/>

          <List.Item
            onPress={onSignOut}
            title="Sign Out"
            titleStyle={styles.menuText}
            left={props => <List.Icon {...props} icon="logout" color={Colors.red} />}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Alignment.fill,
    backgroundColor: Colors.white,
  },
  userInfoWrap: {
    justifyContent: 'left',
    ...Spacer.mediumHorizontalPadding,
    ...Spacer.mediumVerticalPadding,
    backgroundColor: Colors.primary
  },
  userInfoImg: {
    ...Spacer.rightMargin,
  },
  userInfoText: {
    color: Colors.white,
  },
  menuText: {
    color: Colors.black,
  }
})

export default CustomDrawer;