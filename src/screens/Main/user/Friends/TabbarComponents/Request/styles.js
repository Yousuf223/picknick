import { StyleSheet } from "react-native";
import appStyles from "../../../../../appStyles";
import { colors, size, family } from "../../../../../../utils";

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },
    profileImage: {
        backgroundColor: "transparent",
        borderColor: colors.primary,
        height: 30,
        width: 30,
        left: 10,
        borderRadius:50
    },

    content: {
        left: 20
    },

    username: {
        maxWidth: 100,
        color: colors.white,
        ...appStyles.font13,
        ...appStyles.family_Oswald_Medium,
    },

    country: {
        maxWidth: 100,
        color: colors.lightGray1,
        ...appStyles.font11,
    },

    verticalLine: {
        width: "100%",
        height: 0.6,
        backgroundColor: colors.lightGray1,
        alignSelf: "center",
        marginVertical: 5
    },

    detailCont: {
        width: "83%",
        ...appStyles.justifySpaceBetween
    },

    buttonStyle: {
        width: 75,
        height: 43,
        borderRadius: 5
    },

    btnTitle: {
        ...appStyles.family_Oswald_Regular,
        ...appStyles.font13
    },

    deleteCont: {
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter
    },

    deleteIcon: {
        width: 25,
        height: 25
    },

    removeTitle: {
        color: colors.lightGray1,
        ...appStyles.family_Oswald_Regular,
        ...appStyles.font11
    },
    listempty: {
        flex: 1,
        alignItems: 'center',
        marginTop: 75
    },
    txtlistempty: {
        color: colors.white,
        fontSize: size.medium,
        fontFamily: family.RedHatDisplay_Bold
    },
});

export default styles;