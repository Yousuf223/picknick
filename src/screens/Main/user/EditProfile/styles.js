import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, HP, WP, size } from '../../../../utils';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.black,
        marginVertical: '8%',
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    textNormal: {
        marginVertical: 20,
    },
    applogo: {
        width: 400,
        height: 160,
        marginBottom: "6%", marginTop: '8%'
    },
    logoStyle: {
        position: 'relative',
    },
    upload: {
        position: 'absolute',
        bottom: '16%',
        zIndex: 20,
        right: '28%',
    },
    inputstyle: {
        width: Platform.OS =='ios' ? 330 : 318 ,
        // alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 2,
        height: 55,
        borderWidth: 1,
        borderColor: colors.darkGray,
        marginTop: 15,
        justifyContent: "space-between",
        backgroundColor: colors.gray,
    },
    dateOfbirth: {
        color: colors.white,
        fontSize: size.normal
    },
    uploadStyle: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: '#7DC2FF',
        position: 'absolute',
        bottom: 5,
        right: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowBtn: {
        width: "47%",
        backgroundColor: colors.gray,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darkGray,
    },

    saveBtn: {
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        alignSelf:'center',
        width:width - 80
    },

    saveTitle: {
        fontSize: 16
    },
    containerStyleBio: {
        borderRadius: 10,
        height: 100,
        width: '90%',
        borderWidth: 1,
        borderColor: colors.darkGray,
        backgroundColor: colors.gray,
        marginBottom:10
    },
});

export default styles;
