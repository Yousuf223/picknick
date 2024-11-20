import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Img from '../../../components/Img';
import CustomModal from '../../../components/CustomModal';
import CustomButton from '../../../components/CustomButton';
import { appIcons } from '../../../assets';
import { colors } from '../../../utils';
import Shadows from '../../../helpers/Shadows';
import appStyles from '../../../screens/appStyles';

function ConfirmationModal(props) {
  const {
    isModalVisible = false,
    togglePopup = () => { },
    Title,
    SubTitle,
    onPress,
    btnTitle,
    close,
    logout,
    packageSubsMsg,
    btnTitle1,
    onPress1,
    titleStyle,onPress2,btnTitle2 = 'Cancel'
  } = props;

  return (
    <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
      <View style={styles.modalView}>
        <View style={[styles.flexRow, styles.subCont]}>
          <Text style={[styles.Title,titleStyle]}>{Title}</Text>
          {
            close &&
            <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
              <Img
                local
                src={appIcons.close}
                style={styles.closeIcon}
                tintColor={colors.primary}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          }
        </View>
        <Text style={styles.subTitle}>{SubTitle}</Text>

        {
          logout &&
          <View style={[styles.flexRow, [styles.bottomBtnsView]]}>
            <CustomButton
              title={btnTitle2}
              buttonStyle={[styles.bottomBtn, styles.cancelBtn]}
              textStyle={[styles.btnTitle, { color: colors.white }]}
              onPress={onPress2}
            />
            <CustomButton
              title={btnTitle}
              buttonStyle={[styles.bottomBtn]}
              textStyle={styles.btnTitle}
              onPress={onPress}
            />
            
          </View>
        }

        {
          packageSubsMsg &&
          <CustomButton
            title={btnTitle1}
            buttonStyle={styles.singleBtn}
            textStyle={styles.btnTitle}
            onPress={onPress1}
          />
        }

      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    borderRadius: 10,
    // backgroundColor: colors.white,
    paddingBottom:10
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
    paddingTop:20,
    paddingBottom:10
    // paddingVertical: 20,
  },

  Title: {
    ...appStyles.font18,
    ...appStyles.family_Oswald_Medium,
    color: colors.black,
  },

  closeBtn: {
    position: 'absolute',
    right: 15,
    width: 20,
    height: 20,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
  },

  closeIcon: {
    width: 13,
    height: 13,
  },

  subTitle: {
    ...appStyles.font14,
    ...appStyles.family_Oswald_Regular,
    color: colors.black,
    marginBottom:10
    // marginVertical: 5,
  },

  buttonStyle: {
    width: 100,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  btnTitle: {
    ...appStyles.font14,
    ...appStyles.family_Oswald_Regular,
  },

  bottomBtnsView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifyCenter,
    marginVertical: 20,
  },

  bottomBtn: {
    width: '38%',
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
  },

  cancelBtn: {
    width: '38%',
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor:colors.black
  },

  submitBtn: {
    width: '42%',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10
  },

  input: {
    ...Shadows.shadow0,
    backgroundColor: colors.lightGray,
    borderWidth: 0,
  },

  singleBtn:{
    width:"80%",
    marginTop:20,
    marginBottom:20
  },
});

export default ConfirmationModal;
