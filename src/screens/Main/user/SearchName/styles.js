import { StyleSheet } from 'react-native';
import { colors, size, family } from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  search:{
    width:20,
    height:20
  },
  viewStyle1:{
    flexDirection:'row',
    alignItems:'center'
  },
  containerStyle: {
    borderRadius: 5,
    width: '100%',
    height: 50,
    alignSelf:'center'
  },
  userImage:{
    width:40,
    height:40,
    borderRadius:50
  },
  tchStyle1:{
    flexDirection:'row',
    // justifyContent:'space-between',
    width:'95%',
    // alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:colors.lightGray,
    paddingBottom:10,
    marginVertical:10,
    // alignSelf:'center'
  },
  txt:{
    color:colors.white,
    fontFamily:family.Oswald_Medium,
    fontSize:size.small,
    marginLeft:15
  },
  txtUsername:{
    color:colors.white,
    fontFamily:family.Oswald_Medium,
    fontSize:size.tiny,
    marginLeft:15
  }

});

export default styles;
