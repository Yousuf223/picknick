import React, { useState ,useRef, useEffect} from 'react';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity, Keyboard } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GEOCODE_API_KEY } from '../config/WebService';
import axios from 'axios';
import appStyles from '../screens/appStyles';
import Img from './Img';
import { appIcons } from '../assets';
import { colors,WP,size } from '../utils';

const { width } = Dimensions.get('screen');

const GooglePlaceAutocomplete = ({
  callback,
  wrapperStyles,
  inputStyles,
  placeholder,
  iconColor,
  label,
  title,
  titleStyle,
  titleViewstyle,
  titleText,
  backgroundColor,
  rightIcon,
  onDelete,
  index,
  image,
  cityCountry
}) => {
  const [hide,setHide] = useState(true)
  const [city1,setCity1] = useState('')
  const [country1,setcountry1] = useState('')
  const ref = useRef();
  console.log('hidehide',hide)
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setHide(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setHide(false);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const getAddressFromLatLng = async (latitude, longitude) => {
    console.log('latitude',typeof latitude)
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          latlng: `${latitude},${longitude}`,
          key: GEOCODE_API_KEY
        }
      });
  
      const results = response.data.results;
      if (results.length > 0) {
        const addressComponents = results[0].address_components;
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name;
        const country = addressComponents.find(component => component.types.includes('country'))?.long_name;
   
        setcountry1(country)
        setCity1(city)
        return {
          city: city || 'City not found',
          country: country || 'Country not found'
        };
      } else {
        return {
          city: 'City not found',
          country: 'Country not found'
        };
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return {
        city: 'Error',
        country: 'Error'
      };
    }
  };
  
  const renderRightButton = () => {
    if (rightIcon) {
      return (
        <TouchableOpacity
          activeOpacity={0.8} // onPress={() => onDelete(index)}
         
          style={{
            // top: getStatusBarHeight() + 1,
            position: 'absolute',
            // right: 10,
            width: 30,
            alignSelf: 'flex-end',
            marginLeft: '90%',
            alignItems: 'flex-end',
            height: 30,
            borderRadius: 10,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={appIcons.location}
            style={{
              width: 18,
              height: 18,
              resizeMode:'contain'
              // tintColor: colors.black,
            }}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };
  const onSelectLocation = (data, details) => {
    if (details) {
      setHide(false);
      const { geometry } = details;
      console.log('dfdsfdsfdfdsfsdfjsdlkfjdsf',geometry)
      getAddressFromLatLng(geometry.location.lat, geometry.location.lng)
        .then(({ city, country }) => {
          cityCountry(city, country); // Use the latest values
          callback(details.formatted_address, geometry);
        });
    }
  };
  return (
    <View style={[styles.geoLocationView, wrapperStyles]}>
      {/*       
      {title && (
          <View style={[{}, titleViewstyle]}>
            <Text style={{ color: 'black' }}>
              {titleText}
            </Text>
          </View>
        )} */}
      {image && (
        <Image
          source={image}
          style={{
            width: 40,
            height: 40, // Adjust the height as per your requirements
            resizeMode: 'contain',
            tintColor: colors.primary,
            marginRight: 8, // Added marginRight to create space between image and input
          }}
        />
      )}

      <GooglePlacesAutocomplete
      ref={ref}
        enableHighAccuracyLocation
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        disableScroll
        backgroundColor
        rightIcon
        // enablePoweredByContainer={false}
         keepResultsAfterBlur={hide}
        listViewDisplayed={false}
        clear={() => setHide(true)} 
        placeholder={placeholder ? placeholder : 'Add Location'}
        placeholderTextColor={colors.white}
        // onPress={(data, details = null) => {
        //   if(details){
        //     setHide(false)
        //     // setSelectedAddress(null); // Clear selected address
        //   }
        //   console.log('formatted_address',details)
        //   const {address_components , formatted_address, geometry } = details      ;
 
        //  getAddressFromLatLng(geometry.location.lat, geometry.location.lng);
         
 
        //   cityCountry(city1,country1)
        //   callback(formatted_address, geometry);
        // }}
        onPress={onSelectLocation}
        renderRightButton={renderRightButton} // Render the right button conditionally
        styles={{
          textInput: {
            borderRadius: 10,
            height: 50,
            // color: colors.primary,
            backgroundColor: backgroundColor,
            // width: WP('100%'),
            // right: 6,
            color: colors.black,
           fontSize:12,
            fontWeight: '300',
            // paddingRight:20
          },
          description: { color: colors.black },
        }}
        textInputProps={{
          placeholderTextColor: colors.black,
          fontSize:size.tiny
        }}
        query={{
          key: GEOCODE_API_KEY,
          language: 'en',
        }}
      />
      {/* <Img
        local
        src={appIcons.location}
        style={styles.locationIcon}
        resizeMode={"contain"}
      /> */}
    </View>
  );
};

export default GooglePlaceAutocomplete;

const styles = StyleSheet.create({
  geoLocationView: {
    width: WP('86%'),
    marginTop: 15,
    backgroundColor: "transparent",
    borderRadius: 8,
    // height: 55,
    paddingHorizontal: 10,
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
    borderWidth:1,
    borderColor: colors.black,
    justifyContent:"center",
    alignItems:'center'
  },
  textInput: {
    flex: 1,
    height: 55,
    color: colors.white,
    borderRadius: 10,
    backgroundColor: colors.card,
    width: width,
    ...appStyles.family_Jost_Regular,
  },

  locationIcon:{
    position:"absolute",
    width:18,
    height:18,
    right:10,
    top:18
  }
});
