import { StyleSheet } from "react-native";
import appStyles from "../../../appStyles";
import { colors, size } from "../../../../utils";

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    Input: {
        marginTop: 15,
        backgroundColor: colors.gray,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        color: colors.lightGray1,
        ...appStyles.family_Oswald_Regular,
    },

    imageBtn: {
        width: 100,
        height: 90,
        borderColor: colors.gray,
        borderStyle: "dotted",
        borderWidth: 2,
        borderRadius: 10,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        overflow: "hidden",
        marginTop: 15,
        marginRight: 10
    },

    plusIcon: {
        width: 16,
        height: 16,
    },


    closeBtn: {
        position: 'absolute',
        right: 3,
        top: 5,
        width: 15,
        height: 15,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        backgroundColor: colors.red,
        borderRadius: 100,
        borderColor: colors.white,
        borderWidth: 1
    },

    closeIcon: {
        width: 8,
        height: 8,
    },

    videoStyle: {
        width: 100,
        height: 90,
        marginTop: 15,
        marginRight: 10
    },

    submitBtn: {
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 10
    },

    submitTitle: {
        fontSize: 16
    },
});

export default styles;