import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { acceptReject, getBookings, loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';
import DatePickerComponent from '../../../../components/datePickerCompoenent';

import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
import { colors } from '../../../../utils';
import styles from './syles';
import CustomButton from '../../../../components/CustomButton';

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
        { name: 'REJECTED' },
        { name: 'COMPLETED' }
    ]
    useEffect(() => {
        getBookingSearch()
        // dispatch(loaderStop());
    }, [filterType]);



    const getBookingSearch = async () => {
        try {
            dispatch(loaderStart());
            const response = await axios.get(`${BASE_URL}user/home/get-bookings-by-type`, {
                params: {
                    type: filterType,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {cd
                dispatch(loaderStop());
                setData(response.data?.data);
            }
        } catch (error) {
            dispatch(loaderStop());
            console.error('Error fetching bookings:', error?.response?.data);
        }
    };

    const BookingCard = ({ item }) => {
        console.log('itemitem', item);
        return (
            <View style={styles.bookingCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Image style={styles.userImage} source={{ uri: item?.vendorId?.profileImage }} />
                    <Text style={[styles.bookingTitle, { paddingLeft: 12 }]}>
                        {item?.vendorId?.firstName + ' ' + item?.vendorId?.lastName}
                    </Text>
                </View>
                <Text style={styles.bookingTitle}>Service Name: {item.listing?.name}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.bookingDetails, { flex: 1 }]}>Start Date: {moment(item.startDate).format('MM-DD-YYYY')}</Text>
                    <Text style={[styles.bookingDetails, { flex: 1, textAlign: 'right' }]}>End Date: {moment(item.endDate).format('MM-DD-YYYY')}</Text>
                </View>
                {item?.status == 'ACCEPTED' && <CustomButton buttonStyle={styles.buttonStyle}  title='Pay Now' />}
                {item?.status == 'COMPLETED' && <CustomButton buttonStyle={styles.buttonStyle} title='Rate' />}
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
                                <Text style={filterType === item.name ? styles.filterButtonText : { color: colors.black, fontWeight: '500' }}>{item?.name}</Text>
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
