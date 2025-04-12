import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import { schema } from '../../../utils/validation';
import { colors } from '../../../utils';
import { appIcons, appLogos } from '../../../assets/index';
import { loginCurrentUser, signUpUser } from '../../../redux/actions/authAction';
import styles from './styles';
import { getDeviceToken } from '../../../redux/actions/appAction';


class SignUp extends Component {
  state = {
    email: '',
    password: '',
    ConfirmPassword: ''
  };
  componentDidMount() {
    // getToken = async () => {
    //   const fcmToken = await getDeviceToken();
    //   console.log('fcmTokenfcmToken',fcmToken)
    // }
  }
  onSubmit = async () => {
    const { role } = this.props;
    const { email, password, ConfirmPassword } = this.state;
    if (!email) {
      Toast.show({
        text1: `Email field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'You have enter invalid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: `Password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!ConfirmPassword) {
      Toast.show({
        text1: `Confirm password field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (password != ConfirmPassword) {
      Toast.show({
        text1: 'New password and confirm password must be same.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      console.log('saashd')
      let payload = {
        email: email,
        password: password,
        role:role
      };
      this.props.signUpUser(payload);
    }
    // if (email === "") {
    //   NavService.navigate('CompleteProfile')
    // }
    // NavService.navigate('Otp');
  };

  render() {
    const { email, password, ConfirmPassword } = this.state;
    const { location } = this.props;
    console.log('locationlocation', location);
    return (
      <CustomBackground showLogo={false} titleText={'Sign In'}>
        <View style={styles.container}>
          <View style={[styles.container, { marginTop: 20, }]}>
            <View>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <Text style={styles.title}>
              Email
            </Text>
            <CustomTextInput
              leftIcon={appIcons.email}
              placeholder={'Enter Email Address'}
              value={email}
              // keyboardType={'email-address'}
              onChangeText={value => this.setState({ email: value })}
              // lable={'Email'}
              maxLength={35}
            />
            <CustomTextInput
              leftIcon={appIcons.lock}
              placeholder={'New Password'}
              value={password}
              onChangeText={value => this.setState({ password: value })}
              rightIcon
              isPassword
              maxLength={30}
            />
            <CustomTextInput
              leftIcon={appIcons.lock}
              placeholder={'Confirm Password'}
              value={ConfirmPassword}
              onChangeText={value => this.setState({ ConfirmPassword: value })}
              rightIcon
              isPassword
              maxLength={30}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
              activeOpacity={0.8}>
              <Text style={styles.subText}>Forgot Password?</Text>
            </TouchableOpacity>
            <CustomButton
              title="Sign Up"
              onPress={this.onSubmit}
              buttonStyle={{ borderRadius: 10, marginTop: 20, alignSelf: "center" }}
              textStyle={{ fontSize: 17 }}
            />
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={() => NavService.navigate('Login')} style={styles.bottomView}>
            <Text style={styles.textNormal}>
              Already Have an Account?<Text style={{ color: colors.primary }}>Login</Text>
            </Text>

          </TouchableOpacity>
        </View>
      </CustomBackground>
    );
  }
}
function mapStateToProps({authReducer, appReducer }) {

  return {
    role:authReducer.role,
    location: appReducer?.currentUserLocation,
  };
}
const actions = { loginCurrentUser,signUpUser };
export default connect(mapStateToProps, actions)(SignUp);
