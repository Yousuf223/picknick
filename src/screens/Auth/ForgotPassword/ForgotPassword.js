import React, { Component } from 'react';
import { View, Image, Keyboard } from 'react-native';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import { appIcons, appLogos } from '../../../assets/index';
import styles from './styles';
import { forgotPassword,saveEmailForUser } from '../../../redux/actions/authAction';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  onSubmit = () => {
    const {email} = this.state;
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
    } else {
      let payload = {
        email:email
      }
      this.props.forgotPassword(payload);
      this.props.saveEmailForUser(email)
    }
    // NavService.navigate('Otp')
  };
  componentDidMount() {
    Keyboard.dismiss()
  }
  render() {
    const { email } = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Forgot Password'}
        onBack={() => this.props.navigation.goBack()}>
        <View style={styles.container}>
          <View style={[styles.container, { marginTop: 20 }]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <View style={styles.textNormal}>
              <CustomTextInput
                leftIcon={appIcons.email}
                placeholder={'Enter Email Address'}
                value={email}
                lable={'Email'}
                maxLength={35}
                keyboardType={'email-address'}
                onChangeText={value => this.setState({ email: value })}
              />
              <CustomButton
                title="Continue"
                onPress={this.onSubmit}
                buttonStyle={{ borderRadius: 10, marginTop: 28 }}
              // textStyle={{fontSize: 16}}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}


const actions = { forgotPassword ,saveEmailForUser};
export default connect(null, actions)(ForgotPassword);