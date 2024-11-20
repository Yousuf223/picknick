import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import ImagePicker from '../../../components/ImagePicker';
import ProfileImage from '../../../components/ProfileImage';
import { appIcons } from '../../../assets/index';
import {
  completeProfile,
  addProfilePicture,
  loginUser,
} from '../../../redux/actions/authAction';
import ActionSheet from 'react-native-actionsheet';
import styles from './styles';
import { colors } from '../../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import NavService from '../../../helpers/NavService';
import { cities, states } from '../../../utils/dummyData';
import ActionSheetComponent from '../../../components/ActionSheetComponent';
import AppBackground from '../../../components/AppBackground';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import axios from 'axios';
import { loaderStart, loaderStop } from '../../../redux/actions/appAction';

const CompleteProfile = ({ route }) => {
  const actionSheetGenderRef = useRef();
  const phoneInput = useRef();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.userToken)
  console.log('tokentokentokentoken', token)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [lienceImage, setLienceImage] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [stateField, setStateField] = useState('');
  const { role } = useSelector(state => state?.authReducer);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validateForm = () => {
    // Validate each required field and return an appropriate error message
    if (!firstName) return 'First Name field can’t be empty';
    if (!lastName) return 'Last Name field can’t be empty';
    if (!selectDate) return 'Date of birth field can’t be empty';
    if (!gender) return 'Gender field can’t be empty';
    if (!address) return 'Address field can’t be empty';
    if (!profileImage) return 'Please Select Profile Image';

    // Return null if all validations pass
    return null;
  };

  const onSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({
        text1: validationError,
        type: 'error',
        visibilityTime: 3000
      });
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', 'male');
    formData.append('dob', '2001-07-17');
    formData.append('location', address);
    formData.append('longitude', '20.19');
    formData.append('latitude', '18.20');
    formData.append('city', city);
    if (profileImage) {
      formData.append('profilePicture', {
        uri: profileImage?.path,
        name: `Profile${Date.now()}.${profileImage?.mime?.split('/').pop()}`,
        type: profileImage?.mime,
      });
    } else {
      console.log('No profile image provided');
    }
    // dispatch(completeProfile(formData))
    try {
      dispatch(loaderStart())
      const response = await axios.post('https://3239dgd1-8000.inc1.devtunnels.ms/api/v1/auth/user-complete-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response) {
        console.log('Response:', response.data);
        dispatch(loaderStop())
        dispatch(loginUser(response.data))
      }

    } catch (error) {
      console.error('Error uploading form data:', error);
      dispatch(loaderStop())
      // You could also show an error notification to the user here
    }
  };

  const onVendorSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      Toast.show({
        text1: validationError,
        type: 'error',
        visibilityTime: 3000
      });
      return;
    }
    if (!lienceImage) {
      Toast.show({
        text1: 'Lience is required',
        type: 'error',
        visibilityTime: 3000
      });
      return;
    }
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('gender', 'male');
    formData.append('dob', '2001-07-17');
    formData.append('location', address);
    formData.append('longitude', '20.19');
    formData.append('latitude', '18.20');
    formData.append('city', city);
    if (profileImage) {
      formData.append('VendorProfilePicture', {
        uri: profileImage?.path,
        name: `Profile${Date.now()}.${profileImage?.mime?.split('/').pop()}`,
        type: profileImage?.mime,
      });
    } else {
      console.log('No profile image provided');
    }
    if (lienceImage) {
      formData.append('BusinessLicense', {
        uri: lienceImage?.path,
        name: `Profile${Date.now()}.${lienceImage?.mime?.split('/').pop()}`,
        type: lienceImage?.mime,
      });
    } else {
      console.log('No profile image provided');
    }
    // dispatch(completeProfile(formData))
    try {
      dispatch(loaderStart())
      const response = await axios.post('https://3239dgd1-8000.inc1.devtunnels.ms/api/v1/auth/vendor-complete-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response) {
        console.log('Response:', response.data);
        dispatch(loaderStop())
        dispatch(loginUser(response.data))
      }

    } catch (error) {
      console.error('Error uploading form data:', error);
      dispatch(loaderStop())
      // You could also show an error notification to the user here
    }
  };

  const updateImageInGallery = (path, mime, type) => {
    setProfileImage({ path, mime, type });
  };

  const lienceImageInGallery = (path, mime, type) => {
    setLienceImage({ path, mime, type });
  };

  const saveAddress = (address, geometry) => {
    console.log('addressaddress', geometry)
    setLat(geometry.location.lat)
    setLong(geometry.location.lng)
    setAddress(address);
  };

  const saveCountry = (city, country) => {
    setCity(city);
    setStateField(country);
  };

  const { email } = route?.params;


  return (
    <AppBackground appLogo={false} title="Create Profile">
      <View style={{ marginHorizontal: 6 }}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <ImagePicker
            onImageChange={(path, mime, type) =>
              updateImageInGallery(path, mime, type)
            }>
            <ProfileImage
              name="UserName"
              innerAsset={profileImage == null}
              imageUri={
                profileImage ? profileImage?.path : appIcons.userPlaceholder
              }
            />
            <Image source={appIcons.camera} style={styles.uploadStyle} />
          </ImagePicker>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '69%' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <CustomTextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <CustomTextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsDatePickerVisible(true)}
              style={styles.inputstyle}>
              <Text style={styles.dateOfbirth}>
                {selectDate
                  ? moment(selectDate).format('MM-DD-YYYY')
                  : 'Date Of Birth'}
              </Text>
              <Image
                style={{ width: 18, height: 18, resizeMode: 'contain' }}
                source={appIcons.calendar}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              maximumDate={new Date()}
              themeVariant="light"
              isVisible={isDatePickerVisible}
              display="inline"
              mode="date"
              onConfirm={date => {
                setSelectDate(date);
                setIsDatePickerVisible(false);
              }}
              onCancel={() => setIsDatePickerVisible(false)}
            />
            <TouchableOpacity
              activeOpacity={0}
              style={styles.inputstyle}
              onPress={() => actionSheetGenderRef.current.show()}>
              <Text style={styles.dateOfbirth}>
                {gender || 'Select Gender'}
              </Text>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: colors.secondary,
                }}
                source={appIcons.arrowDown}
              />
            </TouchableOpacity>

            <ActionSheetComponent
              ref={actionSheetGenderRef}
              title="Select Gender"
              dataset={['Male', 'Female', 'Other']}
              onPress={setGender}
            />

            <GooglePlaceAutocomplete
              placeholder={'Address'}
              callback={saveAddress}
              rightIcon={true}
              cityCountry={saveCountry}
            />
            <TouchableOpacity activeOpacity={1} style={styles.inputstyle}>
              <Text style={styles.dateOfbirth}>
                {stateField ? stateField : 'Country'}
              </Text>
            </TouchableOpacity>
            {role == 'Vendor' && (
              <>
                <Text style={styles.titleId}>
                  Upload Government ID Card and other Business license
                </Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.idBtn}>
                  <ImagePicker
                    onImageChange={(path, mime, type) =>
                      lienceImageInGallery(path, mime, type)
                    }>
                    <ProfileImage
                      name="UserName"
                      innerAsset={lienceImage == null}
                      imageUri={lienceImage?.path || appIcons.plus}
                      size={80}
                      style={
                        lienceImage?.path
                          ? { width: 350, height: 200, borderRadius: 10 }
                          : { resizeMode: 'contain' }
                      }
                      viewStyle={
                        lienceImage?.path
                          ? { width: '100%', height: 200 }
                          : { resizeMode: 'contain' }
                      }
                    />
                  </ImagePicker>
                </TouchableOpacity>
              </>
            )}

            <CustomButton
              buttonStyle={styles.buttonStyle}
              title="Submit"
              onPress={role == 'User' ? onSubmit : onVendorSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </AppBackground>
  );
};

const mapStateToProps = ({ authReducer, appReducer }) => {
  console.log('authReducerauthReducer', authReducer)
  return {
    token: authReducer?.userToken
  };
};

export default connect(mapStateToProps, {
  completeProfile,
  addProfilePicture,
  loginUser,
})(CompleteProfile);
