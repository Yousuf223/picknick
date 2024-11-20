// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/user/Home/Home';



const Stack = createNativeStackNavigator();

const UserNavigation = ({ initialRoute }) => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="UserAppStack" component={UserAppStack} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
