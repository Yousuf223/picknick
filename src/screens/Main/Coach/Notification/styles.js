import { StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import { colors } from "../../../../utils";

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
        backgroundColor: colors.lightBlack,
        marginVertical: 5,
        borderRadius: 8,
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
        color: colors.white,
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

    btnCont: {
        width: "80%",
        ...appStyles.justifySpaceBetween,
        marginTop: 10,
        alignSelf: "flex-end",
        alignItems:"flex-end"
    },

    joinBtn: {
        position: "absolute",
        width: "40%",
        height: 40,
        borderRadius: 5,
        bottom: 10,
        right: 2
    },
});

export default styles;