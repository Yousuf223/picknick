import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// @stack screens


import Otp from '../../screens/Auth/Otp';
import CompleteProfile from '../../screens/Auth/CompleteProfile/';
import Login from '../../screens/Auth/Login';
import ChangePassword from '../../screens/Auth/ChangePassword'
import { useSelector } from 'react-redux';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import RoleSelection from '../../screens/Auth/RoleSelection';
import SignUp from '../../screens/Auth/SignUp';
import BussinesDetail from '../../screens/Auth/BussinesDetail/BussinesDetail';

const RootStack = createNativeStackNavigator();

const AuthNavigation = ({initialRoute}) => {
 
  
  return (
    <RootStack.Navigator
      initialRouteName={'RoleSelection'}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        animation: 'slide_from_right',
      }}>
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="RoleSelection"
        component={RoleSelection}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Login"
        component={Login}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="SignUp"
        component={SignUp}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="Otp"
        component={Otp}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CompleteProfile"
        component={CompleteProfile}
      />

<RootStack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="BussinessDetail"
        component={BussinesDetail}
      />
    </RootStack.Navigator>


    
  );
};



export default AuthNavigation;
