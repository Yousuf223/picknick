import React, { Component } from 'react';
import { View, Image, Keyboard } from 'react-native';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import { appIcons, appLogos } from '../../../assets/index';
import { schema } from '../../../utils/validation';
import { connect } from 'react-redux';
import { resendPassword } from '../../../redux/actions/authAction';
import styles from './styles';
class ChangePassword extends Component {
  state = {
    password: '',
    ConfirmPassword: '',
  };

  onSubmit = () => {
    const { password, ConfirmPassword } = this.state;

    // else {
    //   let payload = {
    //     newPassword: password,
    //   }
    //   this.props.resendPassword(payload);
    // }
    NavService.navigate('CompleteProfile')
  };
  componentDidMount() {
    Keyboard.dismiss()
  }
  render() {
    const { password, ConfirmPassword } = this.state;
    return (
      <CustomBackground
        showLogo={false}
        titleText={'Reset Password'}
        onBack={() => NavService.navigate('Login')}>
        <View style={styles.container}>
          <View style={[styles.container, { marginTop: 20 }]}>
            <View style={styles.logoStyle}>
              <Image style={styles.applogo} source={appLogos.appLogo} />
            </View>
            <View style={styles.textNormal}>
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
              <CustomButton
                title="Confirm"
                onPress={this.onSubmit}
                buttonStyle={{ borderRadius: 10, marginTop: "10%" }}
                textStyle={{ fontSize: 16 }}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}

const actions = { resendPassword };
export default connect(null, actions)(ChangePassword);
