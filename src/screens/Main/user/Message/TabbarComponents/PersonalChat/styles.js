import { Dimensions, StyleSheet } from "react-native";
import appStyles from "../../../../../appStyles";
import { colors, size, family } from "../../../../../../utils";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    cont: {
        ...appStyles.mainContainer,
        ...appStyles.w100
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    noMessageView: {
        ...appStyles.mainContainer,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
    },

    noMessageTitle: {
        color: colors.lightGray1,
        ...appStyles.font14,
        ...appStyles.family_Oswald_Regular,
        marginVertical: width * 0.5
    },

    flatListCont: {
        marginVertical: 10
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
    containerStyle: {
        width: '100%',
        backgroundColor: colors.gray,
        marginBottom: 15
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
    }
});

export default styles;