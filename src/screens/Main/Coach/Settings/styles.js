import { StyleSheet } from 'react-native';
import appStyles from '../../../appStyles';
import { colors } from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  cont: {
    ...appStyles.w100,
    ...appStyles.alignCenter,
    ...appStyles.justifySpaceBetween,
    backgroundColor: colors.lightBlack,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  icon: {
    width: 20,
    height: 20.
  },

  contTitle: {
    ...appStyles.family_Oswald_Regular,
    ...appStyles.font14,
    color: colors.white,
    fontWeight: "800",
    marginHorizontal: 15
  },

  trackonstyle: {
    width: 42,
    height: 24,
    borderColor: colors.white,
    borderWidth: 1
  },
  thumb: {
    height: 18,
    width: 18,
    marginLeft: 0,
  },

  trackoff: {
    width: 42,
    height: 24,
    borderColor: colors.white,
    borderWidth: 1
  },
  thumboff: {
    height: 18,
    width: 18,
    marginLeft: 3,
  },
});

export default styles;
