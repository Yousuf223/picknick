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

    paymentCont: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifySpaceBetween,
        backgroundColor: colors.lightBlack,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },

    paymentIcon: {
        width: 50,
        height: 30,
        backgroundColor: colors.white,
        borderRadius: 5,
    },

    paymentTitle: {
        ...appStyles.family_Oswald_Regular,
        ...appStyles.font14,
        color: colors.white,
        fontWeight: "800",
        marginHorizontal: 8
    },

    radioBtn: {
        width: 45,
        height: 45,
        marginTop:10,
    },

    btn:{
        ...appStyles.w100
    },

    newCardTitle:{
        ...appStyles.family_Oswald_Regular,
        ...appStyles.font14,
        color:colors.white,
        textAlign:"right",
        textDecorationLine:"underline",
        marginTop:10,
        marginBottom:20
    },
});

export default styles;