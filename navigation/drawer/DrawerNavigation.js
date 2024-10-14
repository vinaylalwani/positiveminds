import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMain from './DrawerMain';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Positive Minds"
        component={DrawerMain}
        options={{headerShown: true}}
      />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;