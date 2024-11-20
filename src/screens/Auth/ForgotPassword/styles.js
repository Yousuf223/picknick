import {StyleSheet,Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {width,height} = Dimensions.get('window');
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
    marginTop:"20%"
  },
  textNormal: {
marginVertical:20
  },
  applogo:{
    width:244,
    height:200,
    marginBottom:"6%",marginTop:'8%',
     resizeMode:"contain",
  },
});

export default styles;
