import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { appIcons } from '../assets';
import { colors, size } from '../utils';


const DatePickerComponent = ({ label, mode, initialDate, onConfirm }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate || '');

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setPickerVisible(false);
    onConfirm && onConfirm(date);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setPickerVisible(true)}
        style={styles.inputStyle}
      >
        <Text style={styles.dateText}>
          {label}
        </Text>
        <Image
          style={styles.icon}
          source={appIcons.calendar}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode || 'date'}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    // width:'100%'
  },
  inputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'space-between',
    width:'48%'
  },
  dateText: {
    color: colors.black,
    fontSize: size.tiny,
    fontWeight: '300',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

export default DatePickerComponent;