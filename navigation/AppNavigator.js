import React from 'react';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackMain from './stack/StackMain';
import Quotes from '../Containers/Quotes';
import AuthLoadingScreen from '../Containers/AuthLoadingScreen';
import LoginScreen from '../Containers/LoginScreen';
import Articles from '../Containers/Articles';
import ArticleDetails from '../Containers/ArticleDetails';
import Videos from '../Containers/Videos';
import Stories from '../Containers/Stories';
import Music from '../Containers/Music';
import Exercises from '../Containers/Exercises';
import Literature from '../Containers/Literature';
import SignupScreen from '../Containers/SignupScreen';
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen';
import CreateNewPassword from '../Containers/CreateNewPassword';
import AboutUs from '../Containers/AboutUs';
import Books from '../Containers/Books';
import Settings from '../Containers/Settings';


const Stack = createNativeStackNavigator();

function DetailsScreen(params) {
  return (
    <Text>Individual Details Screen</Text>
  )
}

function ChildScreenA({navigation}){
  return (
    <Text onPress={()=> navigation.navigate('ChildScreenB')}>ChildScreenA: click to navigate to childScreenB</Text>
  )
}

function ChildScreenB(){
  return (
    <Text>ChildScreenB</Text>
  )
}

const ChildStackNavigator = () => (
  <Stack.Navigator initialRouteName="ChildScreenA">
    <Stack.Screen name="ChildScreenA" component={ChildScreenA} />
    <Stack.Screen name="ChildScreenB" component={ChildScreenB} />
  </Stack.Navigator>
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen name="Main" component={StackMain}  options={{headerShown: false}} />
        <Stack.Screen name="Details" component={DetailsScreen}  options={{headerShown: true}} />
        <Stack.Screen name="ChildStack" component={ChildStackNavigator}  options={{headerShown: false}} />
        <Stack.Screen 
          name="Quotes" 
          component={Quotes}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="Articles" 
          component={Articles}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="ArticleDetails" 
          component={ArticleDetails}  
          options={{
            headerShown: false,
            title:'Article Details',
            // headerTransparent: true,
            headerBackTitleVisible: true
          }} />
          
          <Stack.Screen 
          name="Videos" 
          component={Videos}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="Stories" 
          component={Stories}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="Music" 
          component={Music}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="Exercises" 
          component={Exercises}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="Literature" 
          component={Literature}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          <Stack.Screen 
          name="AboutUs" 
          component={AboutUs}  
          options={{
            title:'About Us',
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
        <Stack.Screen 
          name="AuthLoading" 
          component={AuthLoadingScreen}  
          options={{
            headerShown: false,
          }} />
        
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}  
          options={{
            headerShown: false,
          }} />
          <Stack.Screen 
          name="Signup" 
          component={SignupScreen}  
          options={{
            headerShown: true,
            title:'Signup',
            headerBackTitleVisible: false,
          }} />
          <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen}  
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title:'Forgot Password',
          }} />
          <Stack.Screen 
          name="CreateNewPassword" 
          component={CreateNewPassword}  
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            title:'Create New Password'
          }} />
          <Stack.Screen 
          name="Books" 
          component={Books}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />

        <Stack.Screen 
          name="Settings" 
          component={Settings}  
          options={{
            headerShown: true, 
            headerBlurEffect: true,
            // headerTransparent: true,
            headerBackTitleVisible: false
          }} />
          
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator