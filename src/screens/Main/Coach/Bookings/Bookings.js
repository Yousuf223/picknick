import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import { appIcons } from '../../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { acceptReject, acceptRejectRequest, getBookings, loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';


import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
import { colors } from '../../../../utils';
import CustomButton from '../../../../components/CustomButton';
import styles from './styles';
import Toast from 'react-native-toast-message';

const MyBookings = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [filterType, setFilterType] = useState('PENDING');
    const token = useSelector(state => state?.authReducer?.userToken);


    const btnData = [
        { name: 'PENDING' },
        { name: 'ACCEPTED' },
        { name: 'COMPLETED' }
    ]
    useEffect(() => {
        getBookingSearch()
        // dispatch(loaderStop());
    }, [filterType]);



    const getBookingSearch = async () => {
        try {
            dispatch(loaderStart());
            const response = await axios.get(`${BASE_URL}vendor/my-bookings`, {
                params: {
                    type: filterType,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                dispatch(loaderStop());
                setData(response.data?.data);
            }
        } catch (error) {
            dispatch(loaderStop());
            console.error('Error fetching bookings:', error?.response);
        }
    };
    const onSubmit = async (item, type) => {
        try {
            dispatch(loaderStart());
            const response = await axios.patch(
                `${BASE_URL}vendor/update-booking-status/${item._id}`, 
                { status: type }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Request successful:', response.data);
            if(response?.data){
                dispatch(loaderStop());
                Toast.show({
                    text1: response?.data?.message,
                    type: 'success',
                    visibilityTime: 3000,
                });
                getBookingSearch()
            }
        } catch (error) {
            console.error('Request failed:', error?.response?.data || error);
            dispatch(loaderStop());
            Toast.show({
                text1: error?.response?.data?.message || 'Request failed',
                type: 'error',
                visibilityTime: 3000,
            });
        }
    };
    const BookingCard = ({ item }) => {
        console.log('itemitem', item);
        return (
            <View style={styles.bookingCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Image style={styles.userImage} source={{ uri: item?.userId?.profileImage }} />
                    <Text style={[styles.bookingTitle, { paddingLeft: 12 }]}>
                        {item?.userId?.firstName + ' ' + item?.userId?.lastName}
                    </Text>

                </View>
                <Text style={styles.bookingTitle}>Service Name: {item.listingId?.name}</Text>
                <Text style={styles.bookingTitle}>Amount: {item.price}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.bookingDetails, { flex: 1 }]}>Start Date: {moment(item.startDate).format('MM-DD-YYYY')}</Text>
                    <Text style={[styles.bookingDetails, { flex: 1, textAlign: 'right' }]}>End Date: {moment(item.endDate).format('MM-DD-YYYY')}</Text>
                </View>
                {item?.status == 'PENDING' && <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomButton onPress={() => onSubmit(item, 'ACCEPTED')} buttonStyle={styles.buttonStyle} title='Accept' />
                    <CustomButton onPress={() => onSubmit(item, 'REJECTED')} buttonStyle={styles.buttonStyle1} color={colors.secondary} title='Reject' />
                </View>}
            </View>
        );
    };

    return (
        <AppBackground back appLogo={false} title={'My Bookings'} marginHorizontal={false}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, flexWrap: 'wrap', }}>
                    {btnData?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={[
                                    index < 1 && { marginBottom: 16 }, styles.filterButton,
                                    filterType === item.name && styles.activeFilterButton,
                                ]}
                                onPress={() => setFilterType(item.name)}
                            >
                                <Text style={filterType === item.name ? styles.filterButtonText : { color: colors.black, fontWeight: '500', fontSize: 13 }}>{item?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </View>

            <View style={styles.cardData}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: '40%' }}
                    renderItem={({ item }) => <BookingCard item={item} />}
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

export default MyBookings;
