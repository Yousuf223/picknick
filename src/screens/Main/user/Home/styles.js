import { StyleSheet, Dimensions } from 'react-native';
import { colors, size, family } from '../../../../utils';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  containerStyle:{
    width:'100%'
  },
  title:{
    paddingVertical:10,
    color:colors.black,
    fontWeight:'600'
  }
});
export default styles;
