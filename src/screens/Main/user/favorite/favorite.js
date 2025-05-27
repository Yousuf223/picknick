import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { useDispatch } from 'react-redux';
import { listLikes, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';

const Favorite = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [search, setSearch] = useState('');
    const [data, setData] = useState([{}, {}]);
    useEffect(() => {
        dispatch(loaderStop())
    }, [])

    useEffect(() => {
        if (isFocused) {
            dispatch(listLikes(response => {
                console.log('Fetched event list:', response);
                setData(response);
            }));
        }
    }, [isFocused]);

    return (
        <AppBackground
            menu
            title={'Favorite'}
            Cart={true}
            appLogo={false}
            notification
            marginHorizontal={false}>
            <View style={styles.cardData}>
                {/* <Text style={styles.title}>How Can Help You</Text> */}
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: '40%' }}
                    renderItem={({ item }) => (
                        console.log('item?.listingId?.userId?.profileImage item?.listingId?.userId?.profileImage ',item?.listingId?.userId?.profileImage ),
                        <Card 
                        price={item?.listingId?.price} 
                        title={item?.listingId?.name}
                        dec={item?.listingId?.description}
                        fullName={item?.listingId?.userId?.firstName + ' ' +item?.listingId?.userId?.lastName}
                        image={item?.listingId?.media?.length > 0 ?  {uri:item?.listingId?.media[0]?.mediaPath} :appIcons.userPlaceholder}
                        userImage={item?.listingId?.userId?.profileImage ?  {uri:item?.listingId?.userId?.profileImage} :appIcons.userPlaceholder}
                        item={item} />
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.listempty}>
                            <Text style={styles.txtlistempty}>No Service Found</Text>
                        </View>
                    )}
                />
            </View>
        </AppBackground>
    );
};

export default Favorite;
