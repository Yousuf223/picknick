import {Dimensions, StyleSheet} from 'react-native';
import appStyles from '../../../appStyles';
import {colors, size} from '../../../../utils';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cont: {
    ...appStyles.mainContainer,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  card: {
    ...appStyles.w100,
    borderRadius: 10,
    paddingVertical: 20,
    backgroundColor: colors.lightBlack,
    marginVertical: 10,
    paddingHorizontal: 15,
  },

  cardMainView: {
    ...appStyles.justifySpaceBetween,
  },

  userDetail: {
    marginHorizontal: 10,
  },

  username: {
    color: colors.white,
    ...appStyles.font13,
    ...appStyles.family_Oswald_Regular,
    maxWidth: 150,
  },
  username1: {
    color: colors.white,
    ...appStyles.font11,
    ...appStyles.family_Oswald_Regular,
    maxWidth:150
},
  city: {
    color: colors.lightGray1,
    ...appStyles.font10,
    ...appStyles.family_Oswald_Regular,
    maxWidth: 150,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },

  createBtn: {
    width: 110,
    height: 40,
    borderRadius: 5,
  },

  createTitle: {
    ...appStyles.font12,
    ...appStyles.family_Oswald_Regular,
  },

  detailView: {
    marginTop: 10,
  },

  dec: {
    marginTop: 6,
    color: colors.lightGray1,
    ...appStyles.font10,
    lineHeight: 17,
  },

  btnBarView: {
    ...appStyles.w100,
    backgroundColor: colors.gray,
    borderRadius: 10,
    paddingHorizontal: 20,
  },

  barBtn: {
    backgroundColor: 'none',
    width: 70,
    borderRadius: 5,
    borderBottomColor: colors.primary,
    ...Shadows.shadow0,
  },

  flatListCont: {
    paddingBottom: width * 0.85,
  },
  viewStyle: {
    alignItems: 'center',
    top: 50,
  },
  locked: {
    color: colors.white,
    fontSize: size.medium,
    ...appStyles.family_Oswald_Regular,
  },
});

export default styles;
