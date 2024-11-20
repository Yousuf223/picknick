import { } from 'react';
import CustomModal from '../../../components/CustomModal';
import { StyleSheet, TouchableOpacity } from 'react-native';
import appStyles from '../../../screens/appStyles';
import { colors, family, size } from '../../../utils';
import { View } from 'react-native';
import { Text } from 'react-native';
import Img from '../../../components/Img';
import { appIcons } from '../../../assets';
import CustomButton from '../../../components/CustomButton';

const ActionModal = props => {
  const {
    isModalVisible,
    togglePopup,
    Title,
    btnTitle1,
    onPressBtn1,
    btnTitle2,
    onPressBtn2,
    btnTitle3,
    onPressBtn3,
    subTitle,
    closeCont,
    titleStyle,
    onFocus
  } = props;

  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
          <Img
            local
            src={appIcons.close}
            style={styles.closeIcon}
            tintColor={colors.primary}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text style={[styles.Title, titleStyle]}>{Title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        <View>
          {onPressBtn1 ? (
            <CustomButton
              title={btnTitle1}
              buttonStyle={[styles.bottomBtn]}
              textStyle={styles.btnTitle}
              onPress={onPressBtn1}
            />
          ) : null}
          {onPressBtn2 ? (
            <CustomButton
              title={btnTitle2}
              buttonStyle={[styles.bottomBtn, { backgroundColor: colors.black }]}
              textStyle={styles.btnTitle}
              onPress={onPressBtn2}
            />
          ) : null}
          {onPressBtn3 ? (
            <CustomButton
              onFocus={onFocus}
              title={btnTitle3}
              buttonStyle={[styles.bottomBtn, { backgroundColor: colors.red }]}
              textStyle={styles.btnTitle}
              onPress={onPressBtn3}
            />
          ) : null}
        </View>
      </View>
    </CustomModal>
  );
};

export default ActionModal;

const styles = StyleSheet.create({
  modalView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingBottom: 40,
  },

  closeIcon: {
    width: 13,
    height: 13,
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  subCont: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 10,
    // paddingBottom: 20,
  },

  Title: {
    ...appStyles.font22,
    ...appStyles.family_Oswald_SemiBold,
    color: colors.black,
    bottom: 16,
  },

  closeBtn: {
    // position: 'absolute',
    right: 15,
    width: 34,
    height: 34,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    backgroundColor: colors.white1,
    borderRadius: 100,
    alignSelf: 'flex-end',
  },

  closeIcon: {
    width: 10,
    height: 10,
  },

  bottomBtn: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    ...appStyles.alignCenter,
  },

  btnTitle: {
    ...appStyles.font17,
    ...appStyles.family_Oswald_Regular,
    color: colors.white,
  },
  subTitle: {
    fontSize: size.small,
    color: '#5A5A5A',
    fontFamily: family.Oswald_SemiBold,
    paddingVertical: 10,
  },
});
