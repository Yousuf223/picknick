import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils';
import appStyles from '../../../appStyles';

const styles = StyleSheet.create({
  cont: {
    ...appStyles.mainContainer
  },

  input: {
    width: "100%"
  },

  SubmitBtn: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginTop: 20,
    width: "100%",
  },

  submitBtnTitle: {
    color: colors.white,
    ...appStyles.family_Oswald_Regular,
    ...appStyles.font20
  },
});

export default styles;
