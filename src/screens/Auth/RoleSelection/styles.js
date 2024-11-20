import {StyleSheet,Dimensions} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent:'center'
  },
  buttonStyle:{
    marginTop:13
  }
});

export default styles;
