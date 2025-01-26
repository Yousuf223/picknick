import React, {component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../../components/TabbarComponent';
import {colors} from '../../../utils';
import Home from '../../../screens/Main/user/Home/Home';
import Profile from '../../../screens/Main/user/Profile/Profie';
import Favorite from '../../../screens/Main/user/favorite/favorite';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: colors.gray},
        animation: 'simple_push',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'BottomTabs'}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorite" component={Favorite} />
        <Tab.Screen name="Profile" component={Profile} />
        
    </Tab.Navigator>
  );
};
