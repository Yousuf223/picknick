import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomModal from "../../../components/CustomModal";
import { appIcons } from "../../../assets";
import appStyles from "../../../screens/appStyles";
import { colors } from "../../../utils";
import Img from "../../../components/Img";
import CustomButton from "../../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const SearcherModal = (props) => {
    const {
        isModalVisible = false,
        togglePopup = () => { },
        Title,
        titleStyle
    } = props;

    const [isVisible, setIsVisible] = useState(false);
    const [openPickerFor, setOpenPickerFor] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const showDatePicker = value => {
        setIsVisible(true);
        setOpenPickerFor(value);
    };

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const handleConfirm = date => {
        if (openPickerFor == 'startDate') {
            setStartDate(moment(date).format('MM-DD-YYYY'));
        } else {
            setEndDate(moment(date).format('MM-DD-YYYY'));
        }
        hideDatePicker();
    };

    return (
        <CustomModal visible={isModalVisible} togglePopup={togglePopup}>
            <View style={styles.modalView}>
                <View style={[styles.flexRow, styles.subCont]}>
                    <Text style={[styles.Title, titleStyle]}>{Title}</Text>
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
                <View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[styles.btn, { marginTop: 20 }]}
                        onPress={() => showDatePicker('startDate')}
                    >
                        <Text style={styles.btnTitle}>{startDate ? startDate : "Start Date"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.btn}
                        onPress={() => showDatePicker('endDate')}
                    >
                        <Text style={styles.btnTitle}>{endDate ? endDate : "End Date"}</Text>
                    </TouchableOpacity>
                    <CustomButton
                        title={"Apply"}
                        buttonStyle={styles.singleBtn}
                        textStyle={[styles.btnTitle, { color: colors.white }]}
                        onPress={togglePopup}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={new Date()}
                />
            </View>
        </CustomModal>
    );
};

export default SearcherModal;

const styles = StyleSheet.create({
    modalView: {
        ...appStyles.w100,
        ...appStyles.alignCenter,
        ...appStyles.justifyCenter,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingVertical: 20,
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
        width: 12,
        height: 12,
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
    },

    Title: {
        ...appStyles.font18,
        ...appStyles.family_Oswald_Regular,
        color: colors.black,
        paddingTop: 20
    },

    btn: {
        width: 270,
        padding: 15,
        backgroundColor: colors.white1,
        marginTop: 10,
        borderRadius: 8
    },

    btnTitle: {
        ...appStyles.font14,
        ...appStyles.family_Oswald_Regular,
        color: colors.lightGray
    },

    singleBtn: {
        width: 270,
        marginTop: 20,
        marginBottom: 20
    },

});