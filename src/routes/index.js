// @app
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import {requestNotifications, openSettings} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

import Orientation from 'react-native-orientation-locker';
// @navigations
import {_AppLayout} from '../redux/actions';
import NavService from '../helpers/NavService';
import RoleSelection from './roleSelection';
import AuthNavigation from './Auth/authNavigation';
import {
  loaderStopWithDispatch,
  saveCurrentUserLocation,
  addStoryData,
} from '../redux/actions/appAction';

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       {
//         title: 'Lift Fitness',
//         message: 'Lift Fitness App access to your location ',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the location');
//       // showMessage({
//       //   message: 'Success',
//       //   description: 'Location Permission Accepted',
//       //   type: 'success',
//       // });
//     } else {
//       console.log('location permission denied');
//       return;
//       // showMessage({
//       //   message: 'Error',
//       //   description: 'Location Permission Denied',
//       //   type: 'error',
//       // });
//     }
//   } catch (err) {
//     // showMessage({
//     //   message: 'Error',
//     //   description: err,
//     //   type: 'error',
//     // });
//   }
// };

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.locationTimeInterval = null;
  }
  async componentDidMount() {
    Orientation.lockToPortrait();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }
  componentWillUnmount() {
    clearInterval(this.locationTimeInterval);
  }

  render() {
    const loggedInUser = this.props?.user;
    return (
      <NavigationContainer ref={ref => NavService.setTopLevelNavigator(ref)}>
        <View style={styles.container}>
          {/* IF USER PROFILE STORE IS NOT EMPTY */}
          {loggedInUser ? (
            <RoleSelection initialRoute={undefined} />
          ) : (
            // <AppNavigation initialRoute={undefined} />
            <AuthNavigation initialRoute={undefined} />
          )}
          {/* IF USER PROFILE STORE IS EMPTY */}
        </View>
      </NavigationContainer>
    );
  }
}
function mapStateToProps({authReducer: {user}, appReducer: {socket}}) {
  return {
    user,
    socket,
  };
}
const actions = {saveCurrentUserLocation};
export default connect(mapStateToProps, actions)(MainNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
