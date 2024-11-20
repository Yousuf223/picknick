import { } from "react";
import CustomModal from "../../../components/CustomModal";
import { StyleSheet, TouchableOpacity } from "react-native";
import appStyles from "../../../screens/appStyles";
import { colors } from "../../../utils";
import { View } from "react-native";
import { Text } from "react-native";
import Img from "../../../components/Img";
import { appIcons } from "../../../assets";
import CustomButton from "../../../components/CustomButton";

const ShareModal = (props) => {

    const {
        isModalVisible,
        togglePopup,
        Title,
        btnTitle1,
        onPressBtn1,
        btnTitle2,
        onPressBtn2,
        onPressFacebook,
        onPressWhatsapp,
        onPressTwitter,
        onPressReddit,
        showBtn
    } = props;

    return (
        <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
            <View style={styles.modalView}>
                <View style={[styles.flexRow, styles.subCont]}>
                    <Text style={styles.Title}>{Title}</Text>
                    <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
                        <Img
                            local
                            src={appIcons.close}
                            style={styles.closeIcon}
                            tintColor={colors.primary}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexRow, { width: "80%", ...appStyles.justifySpaceBetween, marginVertical: 20 }]}>
                    <View style={styles.iconCont}>
                        <TouchableOpacity
                            onPress={onPressFacebook}
                            style={[styles.socialBtn, { backgroundColor: colors.facebook }]}
                        >
                            <Img
                                local
                                src={appIcons.facebook}
                                style={styles.socialIcon}
                                tintColor={colors.white}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>FaceBook</Text>
                    </View>

                    <View style={styles.iconCont}>
                        <TouchableOpacity
                            onPress={onPressWhatsapp}
                            style={[styles.socialBtn, { backgroundColor: colors.whatsApp }]}
                        >
                            <Img
                                local
                                src={appIcons.whatsApp}
                                style={styles.socialIcon}
                                tintColor={colors.white}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>Whatsapp</Text>
                    </View>

                    <View style={styles.iconCont}>
                        <TouchableOpacity
                            onPress={onPressTwitter}
                            style={[styles.socialBtn, { backgroundColor: colors.twitter }]}
                        >
                            <Img
                                local
                                src={appIcons.twitter}
                                style={styles.socialIcon}
                                tintColor={colors.white}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>Twitter</Text>
                    </View>

                    <View style={styles.iconCont}>
                        <TouchableOpacity
                            onPress={onPressReddit}
                            style={[styles.socialBtn, { backgroundColor: colors.reddit }]}
                        >
                            <Img
                                local
                                src={appIcons.reddIt}
                                style={styles.socialIcon}
                                tintColor={colors.white}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.subtitle}>Reddit</Text>
                    </View>
                </View>
                {
                    showBtn
                        ? <View>
                            <CustomButton
                                title={btnTitle1}
                                buttonStyle={[styles.bottomBtn]}
                                textStyle={styles.btnTitle}
                                onPress={onPressBtn1}
                            />
                            <CustomButton
                                title={btnTitle2}
                                buttonStyle={[styles.bottomBtn, { backgroundColor: colors.black }]}
                                textStyle={styles.btnTitle}
                                onPress={onPressBtn2}
                            />
                        </View>
                        : null
                }

            </View>
        </CustomModal>
    );
};

export default ShareModal;

const styles = StyleSheet.create({
    modalView: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingVertical: 20,

    },

    closeIcon: {
        width: 13,
        height: 13,
        alignSelf: 'flex-end',
        marginRight: 20,
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    subCont: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingBottom: 20,
    },

    Title: {
        ...appStyles.font16,
        ...appStyles.family_Oswald_Regular,
        color: colors.black,
    },

    closeBtn: {
        position: 'absolute',
        right: 15,
        width: 30,
        height: 30,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        backgroundColor: colors.white1,
        borderRadius: 100
    },

    closeIcon: {
        width: 10,
        height: 10,
    },

    bottomBtn: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        ...appStyles.alignCenter,
    },

    btnTitle: {
        ...appStyles.font14,
        ...appStyles.family_Oswald_Regular,
        color: colors.white
    },

    iconCont: {
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter
    },

    socialBtn: {
        width: 50,
        height: 50,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        borderRadius: 100
    },

    socialIcon: {
        width: 20,
        height: 20,
    },

    subtitle: {
        ...appStyles.font12,
        ...appStyles.family_Oswald_Regular
    },
});