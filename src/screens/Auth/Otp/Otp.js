import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  BackHandler,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { appLogos } from '../../../assets/index';
import styles from './styles';
import { colors } from '../../../utils';
import { otpVerify, resendOTP } from '../../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const Otp = ({ navigation, route }) => {
  const email = useSelector(state => state?.authReducer?.email); 
  const dispatch = useDispatch();
  const params = route.params?.data
  useEffect(() => {
    setFocusIndex(params?.otp)
  }, [])
  let timer;
  const [code, setCode] = useState('');
  const [timerCode, setTimerCode] = useState(60);
  const [resend, setResend] = useState(false);
  const [resendOtpActive, setResendOtpActive] = useState(false);
  const [key, setKey] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusIndex, setFocusIndex] = useState('');

  const inputRefs = useRef([]);
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setCode(newOtp.join(''));
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = () => {

    const otpCode = otp.join('');
    if (otpCode.length === otp.length) {
      if (params?.email) {
        const payload = {
          role: params.role,
          email: params.email,
          password: params.password,
          confirmPassword: params.confirmPassword,
          otp: code
        };
        dispatch(otpVerify(payload));
      } else {
        Toast.show({
          text1: 'Email is not available.',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    } else {
      Toast.show({
        text1: "OTP field can't be empty or incomplete.",
        type: 'error',
        visibilityTime: 3000,
      });
    }
    // NavService.navigate('ChangePassword')
  };

  // Timer for OTP expiration
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };

  // Handle reset/resend OTP
  const handleReset = async () => {
    if (resend) {
      setKey(prevKey => prevKey + 1);
      setResendOtpActive(false);
      setTimerCode(60);
      setResend(false);

      setOtp(['', '', '', '']);
      setCode('');

      startInterval();
      const payload = { email: params.email, role: params.role };
      dispatch(resendOTP(payload, (response) => {
        console.log('Resend OTP Response:', response);
  
        // Assuming 'response.data' contains the focusIndex or data you're looking for
        setFocusIndex(response);
  
      }));
    } else {
      Toast.show({
        text1: `Can't resend OTP. Please try again later.`,
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

  useEffect(() => {
    Keyboard.dismiss();
    const backAction = () => {
      NavService.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setResendOtpActive(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setResendOtpActive(false);
    });

    startInterval();

    return () => {
      backHandler.remove();
      showSubscription.remove();
      hideSubscription.remove();
      clearInterval(timer);
    };
  }, []);

  const onCompleteTimer = () => {
    setResendOtpActive(true);
  };

  return (
    <CustomBackground showLogo={false} titleText={'Verification'}>
      <View style={styles.container}>
        <View style={[styles.container]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <Text style={styles.dec}>
            We have sent you an email containing 4 digits verification code.
            Please enter the code to verify your identity.
          </Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={text => handleChange(text, index)}
                ref={el => (inputRefs.current[index] = el)} // Store refs for each input field
                returnKeyType="done"
                blurOnSubmit={false}
              />
            ))}
          </View>

          <View style={{ marginTop: '8%' }}>
            <CountdownCircleTimer
              isPlaying
              rotation={'counterclockwise'}
              key={key}
              duration={60}
              colors={[colors.primary, colors.primary]}
              colorsTime={[6, 4]}
              size={120}
              strokeWidth={5}
              onComplete={onCompleteTimer}>
              {({ remainingTime }) => {
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                return (
                  <View
                    style={{
                      width: 105,
                      height: 105,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#00000029',
                      borderRadius: 50,
                    }}>
                    <Text style={styles.timerText}>{`00:${timerCode < 10 ? '0' + timerCode : timerCode}`}</Text>
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>
        </View>
        <Text style={styles.textNormal}>OTP:{focusIndex}</Text>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}>Didn't receive a code?</Text>
          <TouchableOpacity disabled={timerCode !== 0} onPress={handleReset}>
            <Text
              style={timerCode === 0 ? styles.textNormalWithColor1 : styles.textNormalWithColor}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton buttonStyle={styles.buttonStyle} title="Submit" onPress={onSubmit} />
      </View>
    </CustomBackground>
  );
};

export default Otp;
