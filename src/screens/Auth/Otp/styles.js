import { StyleSheet, Dimensions } from 'react-native';
import { colors, HP, WP, size } from '../../../utils';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: "6%"
  },
  applogo: {
    width: 244,
    height: 200,
    marginBottom: "4%", marginTop: '4%',
    resizeMode: "contain",
  },
  underlineStyleBase: {
    width: 42,
    height: 48,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: colors.black,
    borderWidth: 1,
    color: '#fff',
    fontSize: 17,
    // backgroundColor:colors.darkGray
  },
  textNormal: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.black,
  },
  textNormalWithColor: {
    color: colors.gray,
    textDecorationColor: colors.gray,
    fontSize: 15,
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
  textNormalWithColor1: {
    color: colors.secondary,
    textDecorationColor: colors.secondary,
    fontSize: 15,
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
  otpInput: {
    width: '80%',
    height: 20,
    alignSelf: 'center',
    marginVertical: 40,

  },
  timerText: {
    color: colors.black,
    fontSize: 15
  },
  dec: {
    color: colors.black,
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 13
  },
  input: {
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20,
    width:'80%'
  },
  buttonStyle:{
    marginBottom:30
  }
});

export default styles;
