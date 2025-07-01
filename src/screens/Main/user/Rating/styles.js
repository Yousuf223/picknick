import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../../utils'; // Assuming colors are defined in utils

const styles = StyleSheet.create({
  dec: {
    height: 246,
    width: '90%',
    backgroundColor: colors.lightGray1,
    alignSelf: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    color: colors.white,
    marginVertical: 10,
    paddingTop: 12
  },
  title: {
    fontSize: 16,
    color: colors.black,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  crossContainer: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    //  padding: 5
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    left: 63,
    top: 14,
    //  position:"absolute",
    zIndex: 100,
    // paddingRight:20
    // right:0

  },
  cross: {
    color: colors.white,
    fontSize: 14,
  },
  videoStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  dec: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.white,
    height: 140,
    width:'90%',
    alignSelf:'center'
  },
  buttonStyle:{
    alignSelf:'center',
    marginTop:20
  }
});

export default styles;
