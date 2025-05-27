import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import styles from './styles';
import { BASE_URL } from '../../../../config/WebService';
import { loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import CustomTextInput from '../../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../../components/GooglePlaceAutocomplete';
import { Image as ImageCompressor, Video as VideoCompressor } from 'react-native-compressor';
import { appIcons } from '../../../../assets';
import CustomMultiSelect from '../../../../components/customMultipleSelect';

const CreatePost = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.userToken);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState('32');
  const [latitude, setLatitude] = useState('33');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);
  const serviceOptions = [
    { id: '1', name: 'Parking Area' },
    { id: '2', name: 'Swimming Pool' },
    { id: '3', name: 'Free WiFi' },
    { id: '4', name: 'Room Service' },
    { id: '5', name: 'Gym' },
  ];

  const updateImageInGallery = async (path, mime, type) => {
    let multipleImages = [];
    if (Array.isArray(path)) {
      const arr = path.map(async (item) => {
        const result = await ImageCompressor.compress(item.path, {
          maxHeight: 400,
          maxWidth: 400,
          quality: 1,
        });
        let imageObject = {
          uri: result,
          name: `image${Date.now()}${item.filename}.${item.mime.slice(item.mime.lastIndexOf('/') + 1)}`,
          type: item.mime,
          tempType: 'image',
        };
        multipleImages.push(imageObject);
      });
      await Promise.all(arr);
      setImage((prevImage) => [...prevImage, ...multipleImages]);
    } else {
      const imageObject = {
        uri: path,
        name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
        type: mime,
        tempType: type,
      };
      setImage((prevImage) => [...prevImage, imageObject]);
    }
  };

  const onSubmit = () => {
    // if (!name || !description || selectedServices.length > 0 || !address || !longitude || !latitude || !price) {
    //   Toast.show({
    //     text1: 'Please fill all fields.',
    //     type: 'error',
    //     visibilityTime: 3000,
    //   });
    //   return;
    // }

    dispatch(loaderStart());
    const payload = new FormData();
    payload.append('name', name);
    payload.append('description', description);
    payload.append('address', 'New York');
    payload.append('longitude', longitude);
    payload.append('latitude', latitude);
    payload.append('price', price);
    payload.append('services', JSON.stringify(selectedServices));

    image.forEach((img) => {
      payload.append('listingMedia', img);
    });
    console.log('payloadpayload', payload)
    axios
      .post(`${BASE_URL}vendor/create-listing`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        Toast.show({
          text1: 'Post created successfully.',
          type: 'success',
          visibilityTime: 3000,
        });
        dispatch(loaderStop());
        NavService.navigate('BottomTabs', { name: 'Home' });
      })
      .catch((error) => {
        console.log('errorerror', error?.response?.data)
        Toast.show({
          text1: 'Failed to create post.',
          type: 'error',
          visibilityTime: 3000,
        });
        dispatch(loaderStop());
      });
  };
  const removeSelectedAsset = (asset) => {
    setImage((prevImage) => prevImage.filter((item) => item.uri !== asset));
  };
  const saveAddress = (address, geometry) => {
    console.log('geometrygeometry', geometry)
    setLatitude(geometry.location.lat);
    setLongitude(geometry.location.lng);
    setAddress(address);
  };

  return (
    <AppBackground onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })} title="Create Post">
      <ScrollView style={{ paddingHorizontal: 0 }} contentContainerStyle={{ paddingBottom: '20%' }}>
        
        <CustomTextInput containerStyle={{ width: '90%' }} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput
          maxLength={275}
          style={styles.dec}
          textAlignVertical="top"
          multiline
          editable
          blurOnSubmit={true}
          placeholder={'Write something.'}
          placeholderTextColor={colors.black}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <CustomMultiSelect
          options={serviceOptions}
          selectedValues={selectedServices}
          onSelectionChange={setSelectedServices}
        />
        <GooglePlaceAutocomplete
          placeholder={'Address'}
          callback={saveAddress}
          rightIcon={true}
          wrapperStyles={{ alignSelf: 'center', width: '90%', }}
        />
        <CustomTextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          containerStyle={{ width: '90%', marginVertical: 10 }}
        />
        
           <View style={{flexWrap:'wrap',flexDirection:'row',marginHorizontal:20,}}>
           {image.length > 0 &&
            image.map((item, index) => (
              <View key={index + 1} style={{ position: 'relative' }}>
                <TouchableOpacity
                  onPress={() => removeSelectedAsset(item.uri)}
                  style={styles.crossContainer}>
                  <Text style={styles.cross}>X</Text>
                </TouchableOpacity>
                <Image source={{ uri: item.uri }} style={styles.videoStyle} />
              </View>
            ))}
           </View>
   

        <View style={styles.row}>
          <CustomImagePicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateImageInGallery(path, mime, type);
            }}
            style={{ justifyContent: 'flex-end' }}>
            {image.length < 10 && (
              <View style={styles.rowIcons}>
                <Image style={styles.icons} source={appIcons.photos} />
                <Text style={styles.title}>Photos</Text>
              </View>
            )}
          </CustomImagePicker>
        </View>

        <CustomButton buttonStyle={styles.buttonStyle} onPress={onSubmit} title="Create Post" />
      </ScrollView>
    </AppBackground>
  );
};

export default CreatePost;
