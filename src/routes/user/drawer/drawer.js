import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from '../../../components/Drawer';
import { BottomTabs } from '../tab/tab';

const Drawers = createDrawerNavigator();

const VendorAppStack = () => {
  return (
    <Drawers.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'MainStack'}>
      <Drawers.Screen
        options={{ headerShown: false }}
        name="BottomTabs"
        component={BottomTabs}
      />
    </Drawers.Navigator>
  );
};

export default VendorAppStack;