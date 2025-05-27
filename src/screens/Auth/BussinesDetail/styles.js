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
    marginBottom: 40,
  },
  textNormal: {
    marginVertical: 20,
  },
  applogo: {
    width: 400,
    height: 160,
    marginBottom: '6%',
    marginTop: '8%',
  },
  logoStyle: {
    position: 'relative',
  },
  upload: {
    position: 'absolute',
    bottom: '16%',
    zIndex: 20,
    right: '28%',
  },
  inputstyle: {
    width: width * 0.86,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 2,
    height: 55,
    borderWidth: 1,
    borderColor: colors.black,
    marginTop: 15,
    justifyContent: 'space-between',
    marginBottom: 7,
    alignSelf:'center'
    // backgroundColor:"red"
  },
  dateOfbirth: {
    color: colors.black,
    fontSize: size.tiny,
    fontWeight: '300',
  },
  uploadStyle: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 8,
    right: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    resizeMode: 'contain',
  },

  rowBtn: {
    width: '45%',
    // backgroundColor: colors.darkGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  containerStyleBio: {
    borderRadius: 10,
    height: 122,
    backgroundColor: 'transparent',
    width: '94%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '94%',
  },
  inputField: {
    backgroundColor: 'transparent',
    width: '48%',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 6,
    color: colors.black,
    fontSize: 12,
    paddingLeft: 14,
    fontWeight: '300',
    height: 50
  },
  verified: {
    color: colors.black,
    fontSize: size.xxsmall,
    fontWeight: '300',
    marginLeft: 8,
  },
  verifiedEmail: {
    color: colors.black,
    fontSize: size.small,
    fontWeight: '500',
    maxWidth: 220,
  },
  dropDown: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: colors.secondary,
  },
  phoneInputStyle: {
    width: '94%',
    backgroundColor: 'transparents',
    height: 50,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    alignSelf: 'center',
    width: '89%',
  },
  bottomView: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#000000',
    bottom: -10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleId:{
    color:colors.black,
    fontSize:14,
    paddingVertical:10,
    fontWeight:'300',
    maxWidth:290
  },
  idBtn:{
    width:'88%',
    height:200,
    marginBottom:20,
    borderRadius:10,
    backgroundColor:colors.primary,
    justifyContent:'center',
    alignItems:'center',alignSelf:"center",
  }
});

export default styles;
