import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Img from '../../../components/Img';
import CustomModal from '../../../components/CustomModal';
import { appIcons } from '../../../assets';
import { colors } from '../../../utils';
import appStyles from '../../../screens/appStyles';

function CommentModal(props) {
    const {
        userId,
        commentId,
        isModalVisible = false,
        togglePopup = () => { },
        onDeletePress,
        onReport = () => { },
        onEditPress = () => { }
    } = props;
    console.log('User__id', userId, 'Comment_____id', commentId)

    return (
        <CustomModal visible={isModalVisible} togglePopup={togglePopup} style={styles.modal}>
            <View style={styles.modalView}>
                <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
                    <Img
                        local
                        src={appIcons.close}
                        style={styles.closeIcon}
                        tintColor={colors.primary}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                {userId == commentId ?
                    <>
                        <TouchableOpacity
                            onPress={onEditPress}
                            activeOpacity={0.9}
                            style={styles.btn}>
                            <Text style={styles.title}>Edit</Text>
                            <View style={styles.verticalLine} />
                        </TouchableOpacity>
                    </> : ''}
                {userId == commentId ?
                    <>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.btn}
                            onPress={onDeletePress}
                        >
                            <Text style={styles.title}>Delete</Text>
                            <View style={styles.verticalLine} />
                        </TouchableOpacity>
                    </> : ''}



                {userId == commentId ? '' :
                    <>
                        <TouchableOpacity
                            onPress={onReport}
                            activeOpacity={0.9}
                            style={styles.btn}>
                            <Text style={styles.title}>Report</Text>
                        </TouchableOpacity>
                    </>
                }

            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    modal: {
        ...appStyles.w100,
        justifyContent: "flex-end",
        alignSelf: "center",
    },

    modalView: {
        ...appStyles.w100,
        ...appStyles.justifyCenter,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 15
    },

    flexRow: {
        ...appStyles.directionRow,
        ...appStyles.alignCenter,
    },

    closeBtn: {
        alignSelf: "flex-end",
        alignItems: "flex-end"
    },

    closeIcon: {
        width: 13,
        height: 13,
    },

    title: {
        ...appStyles.family_Oswald_Regular,
        color: colors.black,
        ...appStyles.font16
    },

    verticalLine: {
        width: "100%",
        height: 0.6,
        backgroundColor: colors.lightGray1,
        alignSelf: "center",
        marginVertical: 10
    },
});

export default CommentModal;