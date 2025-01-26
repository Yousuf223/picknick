// @app
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import UserAppStack from './drawer/drawer';
import Home from '../../screens/Main/Coach/Home/Home';
import Profile from '../../screens/Main/Coach/Profile/Proflie';
import CreatePost from '../../screens/Main/Coach/CreatePost';
import Bookings from '../../screens/Main/Coach/Bookings/Bookings';



const Stack = createNativeStackNavigator();

const CoachNavigation = ({ initialRoute }) => {
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
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="Bookings" component={Bookings} />
      
      
    </Stack.Navigator>
  );
};

export default CoachNavigation;
