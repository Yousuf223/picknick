// @app
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import {requestNotifications, openSettings} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
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


class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.locationTimeInterval = null;
  }
  async componentDidMount() {
    this.requestNotificationPermission();
    Orientation.lockToPortrait();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
  }
  componentWillUnmount() {
    clearInterval(this.locationTimeInterval);
  }
  requestNotificationPermission = async () => {
    if (Platform.OS == 'android') {
      requestNotifications(['alert', 'sound', 'badge', 'carPlay']).then(
        ({status, settings}) => {
          if (status == 'granted') {
            // console.log('status', status);
          } else if (status == 'denied') {
            Toast.show({
              text1: 'Please open notification setting to receive notification',
              type: 'error',
              visibilityTime: 5000,
            });
            openSettings();
          } else if (status == 'blocked') {
            Toast.show({
              text1: 'Please open notification setting to receive notification',
              type: 'error',
              visibilityTime: 5000,
            });
            openSettings();
          }
        },
      );
    }
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await this.registerForNotifications();
      this.receiveInitialNotificationMessages();
      this.receiveForegroundMessages();
      this.receiveBackgroundMessages();
    } else {
      // alert(' noti disabled’)
    }
  };
  registerForNotifications = async () => {
    const isRegisted = messaging().isDeviceRegisteredForRemoteMessages;
    if (!isRegisted) {
      await messaging().registerDeviceForRemoteMessages(); // calls await messaging().registerDeviceForRemoteMessages()
    } else {
      // const fcmToken = await getFCMnotificationsToken();
      // fcmToken && (await updateBackendToken(fcmToken));
    }
  };
  receiveInitialNotificationMessages = () => {
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        console.log('notification state quit: ', remoteMessage);
        // this.onNewNotification(remoteMessage, true);
      });
  };
  receiveBackgroundMessages = () => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log('notification state background: ', remoteMessage); // background click
      // this.onNewNotification(remoteMessage, false);
    });
  };
  receiveForegroundMessages = () => {
    messaging().onMessage(async remoteMessage => {
      console.log('notification state foreground: ', remoteMessage); // background click
      // this.onNewNotification(remoteMessage, true);
            Toast.show({
              text1: remoteMessage?.notification?.body,
              text2:remoteMessage?.notification?.title,
              type: 'success',
              visibilityTime: 5000,
            });
    });
  };

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
