// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/user/Home/Home';
import Profile from '../../screens/Main/user/Profile/Profie';
import ServiceDetail from '../../screens/Main/user/ServiceDetail/businessDetail';
import Favorite from '../../screens/Main/user/favorite/favorite';
import MyBookings from '../../screens/Main/user/MyBookings/MyBookings';




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
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="MyBookings" component={MyBookings} />
      
    </Stack.Navigator>
  );
};

export default UserNavigation;
