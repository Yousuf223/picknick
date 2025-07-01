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
import { colors } from '../../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppBackground from '../../../components/AppBackground';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import axios from 'axios';
import { loaderStart, loaderStop } from '../../../redux/actions/appAction';
import { BASE_URL } from '../../../config/WebService';
import styles from './styles';

const BussinessDetail = ({ route }) => {
  const actionSheetGenderRef = useRef();
  const phoneInput = useRef();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.userToken)
  console.log('tokentokentokentoken', token)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('Karachi');
  const [profileImage, setProfileImage] = useState(null);
  const [lienceImage, setLienceImage] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
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
    if (!address) return 'Address field can’t be empty';
    return null;
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
    formData.append('businessName', firstName);
    formData.append('businessPhone', lastName);
    formData.append('businessAddress', address);
    if (lienceImage) {
      formData.append('businessLiscense', {
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
      const response = await axios.post(`${BASE_URL}vendor/complete-business-profile`, formData, {
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '69%' }}
          showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <CustomTextInput
              placeholder="Bussiness Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <CustomTextInput
              placeholder="Phone Number"
              value={lastName}
              onChangeText={setLastName}
            />
            <GooglePlaceAutocomplete
              placeholder={'Address'}
              callback={saveAddress}
              rightIcon={true}
              cityCountry={saveCountry}
            />

            <Text style={styles.titleId}>
              Upload Government ID Card and other Business license
            </Text>
            <TouchableOpacity activeOpacity={0.8} style={{
              width: '88%',
              height: 200,
              marginBottom: 20,
              borderRadius: 10,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center', alignSelf: "center",
            }}>
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
                      ? { width: 320, height: 200, borderRadius: 10 }
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



            <CustomButton
              buttonStyle={styles.buttonStyle}
              title="Submit"
              onPress={() => onVendorSubmit()}
            // onPress={role == 'User' ? onSubmit : onVendorSubmit}
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
})(BussinessDetail);
