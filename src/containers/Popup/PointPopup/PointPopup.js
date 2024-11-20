import React, {useEffect, useState} from 'react';
import CustomModal from '../../../components/CustomModal';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import appStyles from '../../../screens/appStyles';
import {colors, family, size} from '../../../utils';
import {View} from 'react-native';
import {Text} from 'react-native';
import {appIcons, appImages} from '../../../assets';
const PointPopup = props => {
  const {
    isModalVisible,
    togglePopup,
    image,
    item,
    onSharePress,
    onPress,
    onLike,
    video,
  } = props;
  //   useEffect(() => {
  //  setTimeout(setime, 5000)
  // }, []);

  console.log('----item', item);
  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
          <Image style={styles.closeIcon} source={appIcons.close} />
        </TouchableOpacity>
        <Image style={styles.strike1} source={item?.image} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.active == false ? null : (
            <View style={styles.ticRow}>
              <Image style={styles.tic} source={appIcons.tic} />
            </View>
          )}

          <Text
            style={
              item?.active == false
                ? {color: '#878787', fontSize: size.normal}
                : {color: colors.secondary, fontSize: size.normal}
            }>
            {item?.active == false ? 'In Process':'Completed'} 
          </Text>
        </View>
        <Text
          style={
            item?.active == false
              ? {color: '#878787', fontSize: size.normal, paddingVertical: 6}
              : {
                  color: colors.secondary,
                  fontSize: size.normal,
                  paddingVertical: 6,
                }
          }>
          {item?.title} (10 HP)
        </Text>
        <Text style={styles.dec}>{item?.decription}</Text>
      </View>
    </CustomModal>
  );
};

export default PointPopup;

const styles = StyleSheet.create({
  modalView: {
    // ...appStyles.w100,
    borderRadius: 10,
    backgroundColor: '#00000090',
    paddingBottom: 10,
    // height: 335,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    // backgroundColor:"red"
  },
  closeBtn: {
    position: 'absolute',
    right: 15,
    width: 20,
    height: 20,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    zIndex: 10,
    top: 12,
  },

  closeIcon: {
    width: 14,
    height: 14,
    tintColor: colors.secondary,
    resizeMode: 'contain',
  },
  strike1: {
    width: 160,
    height: 160,
  },
  ticRow: {
    backgroundColor: colors.border,
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 5,
  },
  tic: {
    tintColor: colors.black,
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  dec: {
    color: colors.white,
    textAlign: 'center',
    paddingBottom: 18,
  },
});
