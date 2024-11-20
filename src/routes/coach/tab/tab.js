import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../../../components/TabbarComponent';
import { colors } from '../../../utils';
import Home from '../../../screens/Main/Coach/Home/Home';


const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.gray },
        animation: 'simple_push',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <TabBar {...props} />}
      initialRouteName={'BottomTabs'}>
      <Tab.Screen name="Home" component={Home} />
      
    </Tab.Navigator>
  );
};
