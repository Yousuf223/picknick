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
import { useDispatch } from 'react-redux';
import { createBooking } from '../../../redux/actions/appAction';

function CreateBooking(props) {
  const {
    isModalVisible = false,
    togglePopup = () => { },
    setModalVisible,
    SubTitle,
    onPress,
    id
  } = props;
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const formatDateTime = (date, time) => {
    if (date && time) {
      return `${date}T${time}:00Z`;
    }
    return '';
  };
  const handleBooking = async () => {
    const formattedStartDate = formatDateTime(
      startDate ? startDate.toISOString().split('T')[0] : '',
      startTime ? startTime.toISOString().split('T')[1].slice(0, 5) : ''
    );
    const formattedEndDate = formatDateTime(
      endDate ? endDate.toISOString().split('T')[0] : '',
      endTime ? endTime.toISOString().split('T')[1].slice(0, 5) : ''
    );

    if (!formattedStartDate || !formattedEndDate) {
      Toast.show({
        text1: `Please select all date and time fields.`,
        type: 'error',
        visibilityTime: 3000,
      });

      return;
    }

    const payload = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      listingId: id
    };
    console.log('fdfsf',payload)
    dispatch(createBooking(payload, response =>{
      if(response){
        setModalVisible(false)
      }
    }));
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
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <DatePickerComponent
            label={startDate ? moment(startDate).format('MM-DD-YYYY') : 'Start Date'}
            mode="date"
            onConfirm={(date) => setStartDate(date)}
          />
          <DatePickerComponent
            label={endDate ? moment(endDate).format('MM-DD-YYYY') : 'End Date'}
            mode="date"
            onConfirm={(date) => setEndDate(date)}
          />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 17 }}>
          <DatePickerComponent
            label={startTime ? moment(startTime).format('HH:mm A') : 'Start Time'}
            mode="time"
            onConfirm={(time) => setStartTime(time)}
          />
          <DatePickerComponent
            label={endTime ? moment(endTime).format('HH:mm A') : 'End Time'}
            mode="time"
            onConfirm={(time) => setEndTime(time)}

          />
        </View>


        <CustomButton
          title="Book"
          buttonStyle={styles.singleBtn}
          onPress={()=>handleBooking()}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    width: '100%',
    justifyCenter: 'center',
    alignCenter: 'center'
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600'
  },
  subTitle: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 10,
    paddingHorizontal: 20, paddingTop: 10

  },
  singleBtn: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  subCont: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    // paddingVertical: 20,
  },

  Title: {
    color: colors.black,
    fontSize: 14
  },

  closeBtn: {
    position: 'absolute',
    right: 15,
    width: 20,
    height: 20,
    justifyContent: 'center', alignItems: 'center'
  },

  closeIcon: {
    width: 13,
    height: 13,
  },
});

export default CreateBooking;
