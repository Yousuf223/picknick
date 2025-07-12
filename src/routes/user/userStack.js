// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/user/Home/Home';
import Profile from '../../screens/Main/user/Profile/Profie';
import ServiceDetail from '../../screens/Main/user/ServiceDetail/businessDetail';
import Favorite from '../../screens/Main/user/favorite/favorite';
import MyBookings from '../../screens/Main/user/MyBookings/MyBookings';
import RatingScreen from '../../screens/Main/user/Rating/Rating';
import Messages from '../../screens/Main/user/Message/Message';
import Notification from '../../screens/Main/user/Notification';
import Chat from '../../screens/Main/user/Chat';





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
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Chat" component={Chat} />



    </Stack.Navigator>
  );
};

export default UserNavigation;
