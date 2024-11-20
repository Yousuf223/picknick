import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";
import CustomButton from "./CustomButton";
import { appImages } from "../assets";
import appStyles from "../screens/appStyles";
import { colors } from "../utils";
import { useNavigation } from "@react-navigation/native";
import Img from "./Img";

const FriendList = (props) => {

    const navigation = useNavigation();

    return (
        <View>
            <View style={[styles.flexRow, {
                width: "100%",
                marginVertical: 10,
                backgroundColor: colors.lightBlack,
                paddingRight: 15,
                paddingVertical:10,
                borderRadius: 8,
                justifyContent: 'space-between'
            }]}>
                <View style={[styles.flexRow]}>
                    <Img
                        local
                        src={appImages.user}
                        style={styles.profileImage}
                        resizeMode={"contain"}
                    />
                    <View style={styles.content}>
                        <Text numberOfLines={1} style={styles.username}>William Roy</Text>
                        <Text style={styles.country}>New York</Text>
                    </View>
                </View>
                <CustomButton
                    title="Message Now"
                    buttonStyle={styles.addBtn}
                    textStyle={styles.btnTitle}
                    onPress={() => navigation.navigate('Chat',{screenName:"PersonalChat"})}
                />
            </View>
        </View>
    );
};

export default FriendList;

const styles = StyleSheet.create({

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    profileImage: {
        backgroundColor: "transparent",
        borderColor: colors.primary,
        height: 60,
        width: 60,
    },

    content: {
        // marginHorizontal: 15
    },

    username: {
        maxWidth: 100,
        color: colors.white,
        ...appStyles.font13,
        ...appStyles.family_Oswald_Medium,
    },

    country: {
        maxWidth: 230,
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

    addBtn: {
        width: "40%",
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

});