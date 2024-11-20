import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import styles from './styles';
import AppBackground from '../../../../components/AppBackground';
import Img from '../../../../components/Img';
import { appIcons } from '../../../../assets';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { deleteProfile, logoutUser } from '../../../../redux/actions/authAction';
import ConfirmationModal from '../../../../containers/Popup/ConfirmationModal/ConfirmationModal';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: false, 
      modalVisible: false, 
    };
  };

  render() {
    const { notification ,modalVisible } = this.state;
    const { user } = this?.props;
    return (
      <AppBackground
        back
        title={'Settings'}
        marginHorizontal={false}
      >
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.flexRow, styles.cont]}>
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.notification}
                  style={styles.icon}
                  resizeMode={"contain"}
                  tintColor={colors.yellow}
                />
                <Text style={styles.contTitle}>
                  Push Notifications
                </Text>
              </View>
              <ToggleSwitch
                isOn={notification}
                onToggle={() => this.setState({ notification: !notification })}
                trackOnStyle={styles.trackonstyle}
                trackOffStyle={styles.trackoff}
                thumbOnStyle={styles.thumb}
                thumbOffStyle={styles.thumboff}
                onColor={colors.gray}
                offColor={colors.gray}
                circleColor={notification ? colors.primary : colors.white}
                size="small"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.flexRow, styles.cont]}
              onPress={() => { NavService.navigate("ChangePassword") }}
            >
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.lock}
                  style={styles.icon}
                  resizeMode={"contain"}
                  tintColor={colors.primary}
                />
                <Text style={styles.contTitle}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.flexRow, styles.cont]}
              onPress={() => { Linking.openURL('https://www.google.com'); }}
            >
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.termsConditions}
                  style={styles.icon}
                  resizeMode={"contain"}
                  tintColor={colors.primary}
                />
                <Text style={styles.contTitle}>
                  Terms & Conditions
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.flexRow, styles.cont]}
              onPress={() => { Linking.openURL('https://www.google.com'); }}
            >
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.privacyPolicy}
                  style={styles.icon}
                  resizeMode={"contain"}
                />
                <Text style={styles.contTitle}>
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.flexRow, styles.cont]}
              onPress={() => this.setState({ modalVisible: true })}
            >
              <ConfirmationModal
                isModalVisible={modalVisible}
                togglePopup={() =>
                  this.setState({ modalVisible: false })
                }
                Title={'Delete Profile'}
                SubTitle={'Are you sure you want to delete profile?'}
                onPress={() => {
                  let payload = {
                    user_id: user?._id
                  }
                  this.setState({ modalVisible: false })
                  setTimeout(() => {
                    this.props.deleteProfile(user?._id);
                    this.props.logoutUser();
                  }, 850)
                }}
                btnTitle={'Delete'}
                close
                logout
                onPress2={() => this.setState({ modalVisible: false })}
              />
              <View style={[styles.flexRow]}>
                <Img
                  local
                  src={appIcons.trash}
                  style={styles.icon}
                  resizeMode={"contain"}
                />
                <Text style={styles.contTitle}>
                  Delete Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </AppBackground>
    );
  }
};

function mapStateToProps({ authReducer }) {
  return {
    user: authReducer?.user,
  };
}
const actions = { deleteProfile, logoutUser };
export default connect(mapStateToProps, actions)(Settings);
