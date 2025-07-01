import { Dimensions, StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import { colors } from "../../../../utils";
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    notiCont: {
        ...appStyles.w100,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: colors.white,
        marginVertical: 5,
        borderRadius: 8,
        borderBottomWidth:1,
        borderColor:colors.lightGray1
    },

    profileImage: {
        width: 40,
        height: 40,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 100,
    },

    bellCont: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: colors.lightGray2,
    },

    bellIcon: {
        width: 25,
        height: 25,
    },

    notiheader: {
        ...appStyles.font16,
        color: colors.black,
        ...appStyles.family_Oswald_Medium
    },

    noticontent: {
        ...appStyles.font12,
        color: colors.lightGray1,
        marginTop: 5
    },

    btn: {
        width: "46%",
        height: 45,
        borderRadius: 5,
    },

    btnTitle: {
        ...appStyles.font14,
        ...appStyles.family_Oswald_Regular
    },
  listEmpty: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.4,
  },
  textListEmpty: {
    color: colors.black,
    fontSize: 12,
  },
});

export default styles;