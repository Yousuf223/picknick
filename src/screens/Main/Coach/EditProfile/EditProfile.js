import React, {Component, createRef} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import ImagePicker from '../../../../components/ImagePicker';
import ProfileImage from '../../../../components/ProfileImage';
import CustomTextInput from '../../../../components/CustomTextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GooglePlaceAutocomplete from '../../../../components/GooglePlaceAutocomplete';
import CustomButton from '../../../../components/CustomButton';
import moment from 'moment';
import styles from './styles';
import {loginUser, updateProfile} from '../../../../redux/actions/authAction';
import {appIcons} from '../../../../assets';
import AppBackground from '../../../../components/AppBackground';
import {colors, WP} from '../../../../utils';
import ActionSheetComponent from '../../../../components/ActionSheetComponent';
import {ASSETS_URL} from '../../../../config/WebService';
import {cities, states} from '../../../../utils/dummyData';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props?.user?.name,
      username: props?.user?.username,
      phoneNumber: '',
      address: props?.user?.address,
      profileImage: null,
      isDatePickerVisible: false,
      gender: props?.user?.gender,
      city: props?.user?.city,
      lat: '',
      long: '',
      location: props?.user?.address,
      showCalendar: false,
      selectDate: props?.user?.dob,
      markedDates: null,
      selectedDate: '',
      newCities: [],
      state: props?.user?.state,
      profileType: props?.user?.is_profile_private == 0 ? 'public' : 'Private',
      showCalendar: {
        calendarState: false,
        calendarFor: '',
      },
      about: props?.user?.about,
    };
    this.actionSheetStateRef = createRef();
    this.actionSheetCityRef = createRef();
    this.actionSheetGenderRef = createRef();
    this.actionSheetProfile = createRef();
  }
  // ADDRESS
  callback = (address, geometry) => {
    this.setState({lat: geometry?.location.lat});
    this.setState({long: geometry?.location.lng});
    this.setState({location: address});
  };

  onSubmit = () => {
    const {
      name,
      selectDate,
      location,
      gender,
      city,
      state,
      profileImage,
      address,
      profileType,
      about,
      username,
    } = this.state;
    const {user} = this?.props;
    if (
      name == '' ||
      username == '' ||
      selectDate == '' ||
      location == '' ||
      gender == '' ||
      city == '' ||
      state == '' ||
      profileImage == '' ||
      about == ''
    ) {
      Toast.show({
        text1: 'Please Update Something',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = new FormData();
      payload.append('id', user?._id);
      if (name !== '') {
        payload.append('name', name);
      }
      if (selectDate !== '') {
        payload.append('dob', selectDate);
      }
      if (address !== '') {
        payload.append('address', address);
      }
      if (gender !== '') {
        payload.append('gender', gender);
      }
      if (about !== '') {
        payload.append('about', about);
      }
      payload.append('longitude', this?.props?.currentUserLocation?.longitude);
      payload.append('latitude', this?.props?.currentUserLocation?.latitude);
      if (profileType !== '') {
        payload.append('is_profile_private', profileType == 'Public' ? 0 : 1);
      }
      if (profileImage !== null) {
        payload.append('user_image', {
          uri: profileImage?.path,
          name: `Profile${Date.now()}.${profileImage?.mime?.slice(
            profileImage?.mime?.lastIndexOf('/') + 1,
          )}`,
          type: profileImage?.mime,
        });
      }
      console.log('payload---payload', payload);
      this.props.updateProfile(payload);
    }
  };

  render() {
    const {
      name,
      profileImage,
      gender,
      showCalendar,
      selectDate,
      city,
      newCities,
      about,
      profileType,
      username
    } = this.state;
    const {user} = this?.props;
    console.log('UserInUpdateProfile', user);
    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };

    return (
      <AppBackground
        back
        title={'Edit Profile'}
        notification
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center', alignSelf: 'center'}}>
            <View style={{marginTop: 0}}>
              <ImagePicker
                onImageChange={(path, mime, type) => {
                  updateImageInGallery(path, mime, type);
                }}>
                <ProfileImage
                  name={'UserName'}
                  innerAsset={profileImage == null ? true : false}
                  imageUri={
                    profileImage == null && user?.user_image == null
                      ? appIcons.userPlaceholder
                      : user?.user_image !== '' && profileImage == null
                      ? {uri: ASSETS_URL + user?.user_image}
                      : profileImage?.path
                  }
                />
                <View style={styles.uploadStyle}>
                  <Image
                    source={appIcons.edit}
                    style={{width: 18, height: 18, resizeMode: 'contain'}}
                  />
                </View>
              </ImagePicker>
            </View>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
              }}>
              <CustomTextInput
                placeholder={'Full Name'}
                value={name}
                onChangeText={value => this.setState({name: value})}
                lable="Full Name"
                containerStyle={{
                  width: Platform.OS == 'ios' ? 330 : 318,
                  backgroundColor: colors.gray,
                }}
              />
              <CustomTextInput
                placeholder={'User Name'}
                value={username}
                // onChangeText={value => this.setState({username: value})}
                lable="User Name"
                containerStyle={{
                  width: Platform.OS == 'ios' ? 330 : 318,
                  backgroundColor: colors.gray,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState({
                    showCalendar: {calendarState: true, calendarFor: 'Date'},
                  });
                }}
                style={styles.inputstyle}>
                <Text style={styles.dateOfbirth}>
                  {selectDate !== '' ? selectDate : 'Date'}
                </Text>
                <Image
                  style={{width: 18, height: 18, resizeMode: 'contain'}}
                  source={appIcons.calendar}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                maximumDate={new Date()}
                themeVariant="light"
                isDarkModeEnabled={false}
                isVisible={showCalendar?.calendarState}
                display={'inline'}
                mode="date"
                onConfirm={selectDate => {
                  this.setState({
                    showCalendar: {
                      calendarState: false,
                      calendarFor: 'setFromDate',
                    },
                    selectDate: moment(selectDate).format('MM-DD-YYYY'),
                  });
                }}
                onCancel={() =>
                  this.setState({
                    showCalendar: {
                      calendarState: false,
                      calendarFor: '',
                    },
                  })
                }
              />
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => this.actionSheetGenderRef.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {gender ? gender : 'Select Gender'}
                </Text>
                <Image
                  style={{width: 15, height: 15, resizeMode: 'contain'}}
                  source={appIcons.arrowDown}
                />
              </TouchableOpacity>

              <GooglePlaceAutocomplete
                placeholder={user?.address}
                backgroundColor={colors.gray}
                callback={() => this.callback(formatted_address, geometry)}
                wrapperStyles={{
                  backgroundColor: colors.gray,
                  width: Platform.OS == 'ios' ? 330 : 318,
                }}
              />

              {/* <View style={{
                                width: Platform.OS == 'ios' ? 330 : 318,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 5
                            }}>
                                <TouchableOpacity
                                    onPress={() => this.actionSheetStateRef.current.show()}
                                    style={[styles.rowBtn, { left: 5 }]}>
                                    <Text style={styles.dateOfbirth}>
                                        {state ? state : 'Select State'}
                                    </Text>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'contain' }}
                                        source={appIcons.arrowDown}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.actionSheetCityRef.current.show()}
                                    style={styles.rowBtn}>
                                    <Text style={styles.dateOfbirth}>
                                        {city ? city : 'Select City'}
                                    </Text>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'contain' }}
                                        source={appIcons.arrowDown}
                                    />
                                </TouchableOpacity>
                            </View> */}
              <TouchableOpacity
                activeOpacity={0}
                style={styles.inputstyle}
                onPress={() => this.actionSheetProfile.current.show()}>
                <Text style={styles.dateOfbirth}>
                  {profileType ? profileType : 'Profile'}
                </Text>
                <Image
                  style={{width: 15, height: 15, resizeMode: 'contain'}}
                  source={appIcons.arrowDown}
                />
              </TouchableOpacity>
              <CustomTextInput
                maxLength={100}
                numberOfLines={4}
                multiline
                // leftIcon={appIcons.user}
                placeholder={'About'}
                value={about}
                onChangeText={value => this.setState({about: value})}
                containerStyle={styles.containerStyleBio}
              />
              <CustomButton
                title="Save"
                onPress={this.onSubmit}
                buttonStyle={styles.saveBtn}
                textStyle={styles.saveTitle}
              />
              <ActionSheetComponent
                ref={this.actionSheetGenderRef}
                title="Select Gender"
                dataset={['Male', 'Female', 'Other']}
                onPress={item => {
                  this.setState({
                    gender: item,
                  });
                }}
              />
              <ActionSheetComponent
                ref={this.actionSheetStateRef}
                title="Select a State"
                dataset={states}
                onPress={item => {
                  this.setState({
                    state: item,
                    newCities: cities[`${item}`],
                    city: '',
                  });
                }}
              />
              <ActionSheetComponent
                ref={this.actionSheetCityRef}
                title="Select a City"
                dataset={newCities}
                onPress={item => {
                  this.setState({city: item});
                }}
              />
              <ActionSheetComponent
                ref={this.actionSheetProfile}
                title="Select Profile Type"
                dataset={['Public', 'Private']}
                onPress={item => {
                  this.setState({
                    profileType: item,
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}
function mapStateToProps({authReducer, appReducer}) {
  return {
    user: authReducer?.user,
    currentUserLocation: appReducer?.currentUserLocation,
  };
}
const actions = {loginUser, updateProfile};
export default connect(mapStateToProps, actions)(EditProfile);
