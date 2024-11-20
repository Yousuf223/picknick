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

    earningCont: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: colors.primary,
        borderRadius: 10
    },

    dollarIcon: {
        width: 30,
        height: 30,
    },

    earning: {
        ...appStyles.font38,
        ...appStyles.family_Oswald_Regular,
        color: colors.white,
        fontWeight: "bold"
    },

    totalTitle: {
        ...appStyles.font13,
        ...appStyles.family_Oswald_Regular,
        color: colors.white,
        marginBottom: 5
    },

    searchCont: {
        ...appStyles.w100,
        marginTop: 20,
        height: 55,
        borderRadius: 10,
        backgroundColor: colors.gray,
        ...appStyles.alignSelf,
        ...appStyles.alignCenter,
        ...appStyles.justifySpaceBetween,
        paddingHorizontal: 12,
    },

    btn: {
        width: "30%",
        height: 40,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5
    },

    btnTitle: {
        ...appStyles.family_Oswald_Regular,
        ...appStyles.font13,
        color: colors.primary
    },

    date: {
        ...appStyles.font12,
        ...appStyles.family_Oswald_Regular,
        color: colors.lightGray1,
    },

    searchIcon: {
        width: 18,
        height: 18,
    },

    searchTitle: {
        color: colors.white,
        ...appStyles.font15,
        ...appStyles.family_Oswald_Regular,
    },

    listCont:{
        ...appStyles.w100,
        backgroundColor: colors.lightBlack,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 10,
        ...appStyles.justifySpaceBetween,
        paddingVertical: 20
    },
});

export default styles;