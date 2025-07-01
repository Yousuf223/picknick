import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import styles from './styles';
import { BASE_URL } from '../../../../config/WebService';
import { createBooking, createRating, loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { AirbnbRating, Rating } from 'react-native-ratings';


const RatingScreen = ({route}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.userToken);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const rateId = route.params?.item
  console.log('asdsad',rateId)
  const handleRating = (rating) => {
    setName(rating)
    console.log("Rating is: " + rating);
  };

  const onSubmit = async () => {
    if (!description) {
      Toast.show({
        text1: `description cna't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    }  else {
      let payload = {
        review:description,
        rating:name,
        listingId:rateId?.listingId?._id,
        bookingId:rateId?._id
            };
      dispatch(createRating(payload));
    }
  };



  return (
    <AppBackground appLogo={false} onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })} title="Rating">
      <ScrollView style={{ paddingHorizontal: 0 }} contentContainerStyle={{ paddingBottom: '20%' }}>
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
              <Rating
        showRating
        onFinishRating={handleRating}
        style={{ paddingVertical: 10 }}
      />
        <CustomButton buttonStyle={styles.buttonStyle} onPress={onSubmit} title="Submit Feedback" />
      </ScrollView>
    </AppBackground>
  );
};

export default RatingScreen;
