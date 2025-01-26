import React, { useRef, useState } from 'react';
import {
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    Keyboard,
    TextInput,
    RefreshControl,
    TouchableHighlight,
    Platform,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { colors } from '../../../../utils';
import { useSelector } from 'react-redux';

const Profile = () => {
    const userData = useSelector((state) => state?.authReducer?.user)
    console.log('---------', userData)
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        { title: 'First Name', subTitle: userData?.firstName },
        { title: 'Last Name', subTitle: userData?.lastName },
        { title: 'Gender', subTitle: userData?.gender },
        // { title: 'Phone', subTitle: userData?.contactNumber }
    ])

    return (
        <AppBackground
            menu
            title={'Profile'}
            Cart={true}
            appLogo={false}
            notification
            onVideoPress={() => togglePopUp()}
            marginHorizontal={false}>
            <Image style={styles.userImage} source={userData?.profileImage ? { uri: userData?.profileImage } : appIcons.userPlaceholder} />
            <TouchableOpacity style={{
                width: 46, height: 40, alignSelf: "center", bottom: 50, backgroundColor: colors.white, justifyContent: 'center',
                alignItems: 'center', borderRadius: 10, right: -53,borderWidth:1,borderColor:colors.primary
            }} >
                <Image style={styles.edit} source={appIcons.edit} />
            </TouchableOpacity>

            <View style={styles.cardData}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index?.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: '20%' }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subTitle}>{item.subTitle}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </AppBackground>
    );
};

export default Profile;
