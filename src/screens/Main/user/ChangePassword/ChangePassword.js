import React, { Component } from 'react';
import {
  View,
  BackHandler
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomButton from '../../../../components/CustomButton';
import { appIcons } from '../../../../assets';
import { schema } from '../../../../utils/validation';
import { connect } from 'react-redux';
import CustomTextInput from '../../../../components/CustomTextInput';
import AppBackground from '../../../../components/AppBackground';
import { changePassword } from '../../../../redux/actions/authAction';
import styles from './styles';
import NavService from '../../../../helpers/NavService';

class ChangePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  onSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    const { user } = this?.props;
    if (!currentPassword)
      return Toast.show({
        text1: `Current Password field can't be empty.`,
        type: 'error',
        visibilityTime: 3000,
      });
    else if (!newPassword)
      return Toast.show({
        text1: `New Password field can't be empty.`,
        type: 'error',
        visibilityTime: 3000,
      });
    else if (!schema.validate(newPassword)) {
      Toast.show({
        text1:
          'Password must be of 8 characters long and contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (currentPassword == newPassword)
      return Toast.show({
        text1: "Current password and New password can't be same",
        type: 'error',
        visibilityTime: 3000,
      });
    else if (!confirmPassword)
      return Toast.show({
        text1: `Confirm Password field can't be empty.`,
        type: 'error',
        visibilityTime: 3000,
      });
    else if (newPassword !== confirmPassword)
      return Toast.show({
        text1: 'New Password and confirm Password must be same',
        type: 'error',
        visibilityTime: 3000,
      });
    else {
      let payload = {
        user_id: user?._id,
        old_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword
      }
      console.log('payload-changepass', payload)
      this.props.changePassword(payload)
      setTimeout(() => { NavService.goBack() }, 850)
    }
  };

  //BACK HANDLER
  handleBackButtonClick(navigation) {
    navigation.goBack();
    return true;
  }
  componentDidMount() {
    BackHandler?.addEventListener('hardwareBackPress', () =>
      this?.handleBackButtonClick(this?.props?.navigation),
    );
    return () => {
      BackHandler?.removeEventListener('hardwareBackPress', () =>
        this?.handleBackButtonClick(this?.props?.navigation),
      );
    };
  }
  render() {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    return (
      <AppBackground
        back
        title={"Change Password"}
        marginHorizontal={false}
      >
        <View style={styles.cont}>
          <CustomTextInput
            leftIcon={appIcons.lock}
            placeholder={'Current Password'}
            value={currentPassword}
            onChangeText={value => this.setState({ currentPassword: value })}
            rightIcon
            isPassword
            lable={'Current Password'}
            containerStyle={styles.input}
          />
          <CustomTextInput
            leftIcon={appIcons.lock}
            placeholder={'New Password'}
            value={newPassword}
            onChangeText={value => this.setState({ newPassword: value })}
            rightIcon
            isPassword
            lable={'New Password'}
            containerStyle={styles.input}
          />
          <CustomTextInput
            leftIcon={appIcons.lock}
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={value => this.setState({ confirmPassword: value })}
            rightIcon
            lable={'Confirm Password'}
            isPassword
            containerStyle={styles.input}
          />
          <CustomButton
            title="Submit"
            onPress={this.onSubmit}
            buttonStyle={styles.SubmitBtn}
            textStyle={styles.submitBtnTitle}
          />
        </View>
      </AppBackground>
    );
  }
}
function mapStateToProps({ authReducer }) {
  return {
    user: authReducer?.user,
  };
}
const actions = { changePassword };
export default connect(mapStateToProps, actions)(ChangePassword);
