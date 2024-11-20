import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {colors} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {loginCurrentUser, setRole} from '../../../redux/actions/authAction';
import styles from './styles';
import {getDeviceToken, loaderStop} from '../../../redux/actions/appAction';

class RoleSelection extends Component {
  state = {
    email: '',
    password: '',
  };
  componentDidMount() {
    this.props.loaderStop()
    // getToken = async () => {
    //   const fcmToken = await getDeviceToken();
    //   console.log('fcmTokenfcmToken',fcmToken)
    // }
  }

  render() {
    const {email, password} = this.state;
    const {location} = this.props;
    console.log('locationlocation', location);
    return (
      <CustomBackground back={false} showLogo={false}>
        <View style={styles.container}>
          <CustomButton onPress={()=> [NavService.navigate('Login'),this.props.setRole('User')]} title={'User'} />
          <CustomButton 
          onPress={()=> [NavService.navigate('Login'),this.props.setRole('Vendor')]} 
            textStyle={styles.textStyle}
            buttonStyle={styles.buttonStyle}
            title={'Vendor'}
          />
        </View>
      </CustomBackground>
    );
  }
}
function mapStateToProps({appReducer}) {
  return {
    location: appReducer?.currentUserLocation,
  };
}
const actions = {loginCurrentUser,setRole,loaderStop};
export default connect(mapStateToProps, actions)(RoleSelection);
