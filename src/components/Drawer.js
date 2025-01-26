import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking, ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, family, size } from '../utils';
import { appIcons, appImages } from '../assets';
import ProfileImage from '../components/ProfileImage';
import { logoutUser, logoutCurrentUser } from '../redux/actions/authAction';
import Img from './Img';
import appStyles from '../screens/appStyles';
import NavService from '../helpers/NavService';
import ConfirmationModal from '../containers/Popup/ConfirmationModal/ConfirmationModal';
import { ASSETS_URL } from '../config/WebService';
import LinearGradient from 'react-native-linear-gradient';


const userMenuItems = [
  {
    icon: appIcons.event,
    title: 'My Bookings',
    nav: 'MyBookings',
    screen: 'MyBookings',
  },
  {
    icon: appIcons.setting,
    title: 'Settings',
    nav: 'Settings',
    screenName: 'Settings',
  },
  {
    icon: appIcons.help,
    title: 'Help & Feedback',
    nav: 'HelpAndFeedback',
    screenName: 'HelpAndFeedback',
  }
];

const vendorMenuItems = [
  {
    icon: appIcons.event,
    title: 'Bookings',
    nav: 'Bookings',
    screen: 'Bookings',
  },
  {
    icon: appIcons.setting,
    title: 'Settings',
    nav: 'Settings',
    screenName: 'Settings',
  },
  {
    icon: appIcons.help,
    title: 'Help & Feedback',
    nav: 'HelpAndFeedback',
    screenName: 'HelpAndFeedback',
  }
];
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      profileImage: null
    };
  }

  render() {
    const { modalVisible, profileImage } = this.state;
    const role = this.props?.role;
    const  user  = this?.props?.user;
    console.log('useruser',user)
    const RenderItem = ({ item, index }) => {
      const { title, icon, nav, screenName, screen } = item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (title === 'Logout') {
              NavService.closeDrawer();
              this.setState({ modalVisible: true });
              // this.props.logoutUser();
            }
            // else if (title === 'Payment') {
            //   NavService.closeDrawer();
            //   NavService.navigate('Payment',{screenName:'Payment'})
            // }
            else if (item?.browser) {
              Linking.openURL(item?.browser);
            } else {
              if (screenName) {
                NavService.navigate(nav, { screenName });
              } else if (screen) {
                NavService.navigate(nav, {
                  screen,
                });
              } else {
                NavService.navigate('nav');
              }
              this.props.navigation.closeDrawer();
            }
          }}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <View
            style={{
              paddingVertical: 10,
              borderRadius: 7,
              marginLeft: 10,
            }}>
            <Image
              source={icon}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: colors.white,
              }}
            />
          </View>
          <Text
            style={{
              marginLeft: 20,
              color: colors.white,
              fontSize: 16,
              ...appStyles.family_Oswald_Regular,
            }}>
            {title}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          flex: 1,
          // width:'auto',height:'100%'
          backgroundColor: colors.primary
        }}>
        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this.props.navigation.closeDrawer()}
          style={{
            alignSelf: 'flex-end',
            paddingHorizontal: 15,
            width: 33,
            height: 33,
            borderRadius: 100,
            // backgroundColor: colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Image
            // local
            style={{
              width: 14,
              height: 14,
              tintColor:colors.secondary
            }}
            source={appIcons.close}
            // resizeMode={'contain'}
          />
        </TouchableOpacity> */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: "row",
            marginLeft: 12,
            marginTop: 20,
            marginBottom: "15%"
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('BottomTabs', {
                screen: 'Profile',
              });
            }}>
            <ProfileImage
              name={'UserName'}
              size={90}
              innerAsset={profileImage == null ? true : false}
              imageUri={
                profileImage == null && user?.profileImage == null
                  ? appIcons.userPlaceholder
                  : user?.profileImage !== '' && profileImage == null
                    ? { uri: user?.profileImage }
                    : profileImage?.path
              }
              darwerImg
              viewStyle={{
                width: 115,
                height: 115,
                borderRadius: 70
              }}
              style={{
                borderWidth: 2,
                borderColor: colors.secondary,
                borderRadius: 70
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: size.medium,
                marginTop: 5,
                textTransform: 'capitalize',
                fontWeight: '600'
              }}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: colors.white,
                fontSize: size.xsmall,
                // fontFamily: family.Oswald_Regular,
                marginTop: 3,
              }}>
              {user?.email}

            </Text>
          </View>

          {/* <View
            style={{
              backgroundColor: colors.white,
              width: '80%',
              height: 0.5,
              marginVertical: 10,
              marginTop: 16,
            }}>
            <View
              style={{
                backgroundColor: colors.white,
                height: 1,
                width: '80%',
                alignSelf: 'center',
              }}
            />
          </View> */}
        </View>
        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={role == 'User'? userMenuItems: vendorMenuItems}
            style={{
              height: '100%',
              paddingHorizontal: 20,
            }}
            renderItem={props => <RenderItem {...props} />}
          />
        </View>
        <TouchableOpacity  style={{
          height: 60, alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10,
          flexDirection: "row", justifyContent: 'center', marginBottom: "20%",backgroundColor:colors.white
        }} onPress={() => this.props.logoutUser()} activeOpacity={0.8} >
          <Image source={appIcons.logout} style={{ width: 22, height: 22, resizeMode: "contain", marginRight: 20, tintColor: colors.white }} />
          <Text style={{ color: colors.primary, fontSize: size.large,fontWeight:'600' }}>Logout</Text>
        </TouchableOpacity>
        <ConfirmationModal
          isModalVisible={modalVisible}
          togglePopup={() =>
            this.setState({ modalVisible: false })
          }
          Title={'Logout'}
          SubTitle={'Are you sure you want to Logout?'}
          onPress={() => {
            let payload = {
              user_id: user?._id
            }
            this.setState({ modalVisible: false })
            setTimeout(() => {
              this.props.logoutCurrentUser(payload);
            }, 850)
          }}
          btnTitle={'Logout'}
          close
          logout
          onPress2={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

function mapStateToProps({ authReducer: { user,role } }) {
  return {
    user: user,
    role:role
  };
}

const actions = { logoutUser, logoutCurrentUser };
export default connect(mapStateToProps, actions)(Drawer);


