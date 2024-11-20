import { StyleSheet } from 'react-native';
import { colors, size, family } from '../../../../utils';
import appStyles from '../../../appStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  dec: {
    height: 246,
    width: '97%',
    backgroundColor: colors.gray,
    alignSelf: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    color: colors.white,
    marginVertical: 10,
    paddingTop: 12
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", paddingHorizontal: 10,
    paddingTop: 5, paddingBottom: 22
  },
  rowIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  icons: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  },
  title: {
    fontSize: size.tiny,
    color: colors.lightGray1,
    paddingLeft: 5
  },
  XPosi: {
    position: 'absolute',
    zIndex: 1000,
    right: -7,
    // bottom:20,
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
    fontSize: size.xxxtiny,
    color: colors.white,
    fontWeight: 'bold'
  },
  videoStyle: {
    width: 75,
    height: 75,
    // backgroundColor: colors.grey,
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 10,
    // position: 'relative'
  },

  bottomBtnsView: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifySpaceBetween,
  },

  bottomBtn: {
    width: '47%',
    height: 50,
    borderRadius: 10,
    marginLeft: 5,
  },

  btnTitle: {
    ...appStyles.font14,
    ...appStyles.family_Oswald_Regular,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

});

export default styles;
