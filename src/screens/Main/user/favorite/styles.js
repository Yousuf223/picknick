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
  cardData:{
    backgroundColor:colors.white,
    flex:1,
    borderTopLeftRadius:28,
    borderTopRightRadius:28
  },
});
export default styles;
