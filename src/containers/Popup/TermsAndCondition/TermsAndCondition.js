import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { colors, size, family } from '../../../utils';
import { appIcons } from '../../../assets';
import CustomModal from '../../../components/CustomModal';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import Toast from 'react-native-toast-message';
const width = Dimensions.get('screen');

const TermsAndConditionPopup = ({
  isModalVisible = false,
  currentfocus,
  // onSubmit = () => {},
  amount,
  stars,
  comment,
  role,
}) => {
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const onSubmit = () => {
    if (!focus || !focus1) {
      Toast.show({
        text1: `You must select the given options`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      NavService.navigate('Login', { role: role }),
        currentfocus.setState({ isModalVisible: false });
      setFocus(false);
      setFocus1(false);
    }
  };

  useEffect(() => {
    setFocus(false);
    setFocus1(false);
  }, [isModalVisible])
  return (
    <CustomModal
      visible={isModalVisible}
      togglePopup={() => currentfocus.setState({ isModalVisible: false })}>
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 20,
          paddingVertical: 10,
          //   alignItems: 'center',
          //   justifyContent: 'space-between',
          borderColor: colors.white,
          borderWidth: 1,
          //   flexDirection: 'row',
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: family.Oswald_Regular,
            fontSize: size.xxlarge,
            color: colors.black,
            paddingVertical: 10,
          }}>
          Agreement
        </Text>
        <Text
          style={{
            fontSize: size?.small,
            color: colors.gray,
            fontFamily: family.Oswald_Regular,
            paddingBottom: 17,
          }}>
          I Agree With the Following...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => setFocus(!focus)}
            style={{
              backgroundColor: '#D8D8D8',
              width: 25,
              height: 25,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                tintColor: focus ? colors.primary : colors.white,
              }}
              source={appIcons.tic}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: size?.small,
              color: colors.gray,
              fontFamily: family.Oswald_Regular,
              paddingLeft: 10,
            }}>
            Term & Conditions
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            paddingBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => setFocus1(!focus1)}
            style={{
              backgroundColor: '#D8D8D8',
              width: 25,
              height: 25,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                tintColor: focus1 ? colors.primary : colors.white,
              }}
              source={appIcons.tic}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: size?.small,
              color: colors.gray,
              fontFamily: family.Oswald_Regular,
              paddingLeft: 10,
            }}>
            Privacy & Policy
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingVertical: 14,
            paddingTop: 20,
          }}>
          <CustomButton
            buttonStyle={{
              width: '45%',
              backgroundColor: colors.black,
            }}
            onPress={() => [
              setFocus(false),
              setFocus1(false),
              currentfocus.setState({ isModalVisible: false }),
            ]}
            title="Decline"
          />
          <CustomButton
            onPress={() => onSubmit()}
            buttonStyle={{
              width: '45%',
            }}
            title="Accept"
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default TermsAndConditionPopup;
