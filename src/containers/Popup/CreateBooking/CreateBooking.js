import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomModal from '../../../components/CustomModal';
import CustomButton from '../../../components/CustomButton';
import { colors, appStyles } from '../../../utils';
import DatePickerComponent from '../../../components/datePickerCompoenent';
import moment from 'moment';
import Img from '../../../components/Img';
import { appIcons } from '../../../assets';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../../redux/actions/appAction';
import axios from 'axios';
import { BASE_URL } from '../../../config/WebService';

function CreateBooking(props) {
  const {
    isModalVisible = false,
    togglePopup = () => { },
    setModalVisible,
    SubTitle,
    id
  } = props;
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.userToken);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Combine date and time and format to UTC ISO string
  const formatToUTC = (date, time) => {
    if (!date || !time) return null;
    
    // Create moment objects from date and time
    const dateMoment = moment(date).startOf('day');
    const timeMoment = moment(time);
    
    // Combine date and time
    return dateMoment
      .set({
        hour: timeMoment.hours(),
        minute: timeMoment.minutes(),
        second: 0
      })
      .utc()
      .toISOString();
  };

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      
      // Format dates to UTC
      const utcStartDate = formatToUTC(startDate, startTime);
      const utcEndDate = formatToUTC(endDate, endTime);

      // Validate all fields
      if (!utcStartDate || !utcEndDate) {
        Toast.show({
          text1: 'Please select all date and time fields',
          type: 'error',
          visibilityTime: 3000,
        });
        return;
      }

      // Validate end date is after start date
      if (moment(utcEndDate).isSameOrBefore(moment(utcStartDate))) {
        Toast.show({
          text1: 'End date/time must be after start date/time',
          type: 'error',
          visibilityTime: 3000,
        });
        return;
      }

      const payload = {
        startDate: utcStartDate,
        endDate: utcEndDate,
        listingId: id
      };

      console.log('Booking payload:', payload);
      const availabilityResponse = await axios.get(
        `${BASE_URL}user/booking-availability`,
        {
          params: payload,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
console.log('availabilityResponseavailabilityResponse',availabilityResponse?.data)
      if (!availabilityResponse?.data?.data?.available) {
        Toast.show({
          text1: 'Selected time slot is not available',
          type: 'error',
          visibilityTime: 3000,
        });
        return;
      }
      dispatch(createBooking(payload, (response) => {
        setIsLoading(false);
        if (response) {
          setModalVisible(false);
          Toast.show({
            text1: 'Booking created successfully!',
            type: 'success',
            visibilityTime: 3000,
          });
          // Reset form
          setStartDate(null);
          setEndDate(null);
          setStartTime(null);
          setEndTime(null);
        }
      }));

    } catch (error) {
      setIsLoading(false);
      console.error('Booking error:', error);
      Toast.show({
        text1: error.response?.data?.message || 'Failed to create booking',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <View style={[styles.flexRow, styles.subCont]}>
          <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
            <Img
              local
              src={appIcons.close}
              style={styles.closeIcon}
              tintColor={colors.primary}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subTitle}>{SubTitle}</Text>
        
        <View style={styles.dateTimeRow}>
          <DatePickerComponent
            label={startDate ? moment(startDate).format('MM-DD-YYYY') : 'Start Date'}
            mode="date"
            onConfirm={(date) => setStartDate(date)}
            minimumDate={new Date()}
          />
          <DatePickerComponent
            label={startTime ? moment(startTime).format('HH:mm A') : 'Start Time'}
            mode="time"
            onConfirm={(time) => setStartTime(time)}
          />
        </View>
        
        <View style={[styles.dateTimeRow, { marginTop: 17 }]}>
          <DatePickerComponent
            label={endDate ? moment(endDate).format('MM-DD-YYYY') : 'End Date'}
            mode="date"
            onConfirm={(date) => setEndDate(date)}
            minimumDate={startDate || new Date()}
          />
          <DatePickerComponent
            label={endTime ? moment(endTime).format('HH:mm A') : 'End Time'}
            mode="time"
            onConfirm={(time) => setEndTime(time)}
          />
        </View>

        <CustomButton
          title={'Book'}
          buttonStyle={styles.singleBtn}
          onPress={handleBooking}
          // disabled={isLoading}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 20,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600'
  },
  subTitle: {
    color: colors.black,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
  singleBtn: {
    marginTop: 25,
    width: '100%',
    marginBottom: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dateTimeRow: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between'
  },
  subCont: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    width: 30,
    height: 30,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  closeIcon: {
    width: 15,
    height: 15,
  },
});

export default CreateBooking;