import { StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import Shadows from "../../../../helpers/Shadows";

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    BtnView: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifySpaceBetween,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        height: 60,

    },

    buttonStyle: {
        ...Shadows.shadow0,
        width: "50%",
        borderRadius: 0,
        height: 30,
        marginTop: 0,
        backgroundColor: "transparent",
        borderBottomWidth: 3,
    },

    btnTitle: {
        ...appStyles.font14,
        ...appStyles.family_Oswald_Regular,
    },
});

export default styles;