import { StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import Shadows from "../../../../helpers/Shadows";
import { colors , size , family } from "../../../../utils";

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },
    cont1: {
        ...appStyles.mainContainer,
        ...appStyles.w100
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
    containerStyle:{
        width:'100%',
        backgroundColor: colors.gray,
        marginBottom:15
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
      rowBack: {
        width: 65,
        height: 80,
        position: "absolute",
        alignItems: 'center',
        backgroundColor: colors.lightBlack,
        flex: 1,
        // flexDirection: 'row',
        justifyContent: "center",
        paddingLeft: 15,
        right: 10,
        marginTop: 5,
        borderRadius: 10,
    },

    deleteTitle: {
        ...appStyles.font11,
        color: colors.white
    },
});

export default styles;