import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { acceptReject, getBookings, loaderStart, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';
import DatePickerComponent from '../../../../components/datePickerCompoenent';

import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../../../../config/WebService';
import { colors } from '../../../../utils';

const Bookings = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [filterType, setFilterType] = useState('UPCOMING'); // Filter type: UPCOMING or PAST
    const token = useSelector(state => state?.authReducer?.userToken);

    const getBookingSearch = async () => {
        if (!startDate || !endDate) {
            return;
        }

        const formattedStartDate = moment(startDate).toISOString();
        const formattedEndDate = moment(endDate).toISOString();
        try {
            dispatch(loaderStart());
            const response = await axios.get(`${BASE_URL}vendor/bookings/search`, {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response) {
                dispatch(loaderStop());
                const currentDate = moment();
                const filteredData =
                    filterType === 'PAST'
                        ? response.data?.data.filter(item => moment(item.startDate).isBefore(currentDate))
                        : response.data?.data.filter(item => moment(item.startDate).isSameOrAfter(currentDate));
                setData(filteredData);
                setEndDate('');
                setStartDate('');
            }
        } catch (error) {
            dispatch(loaderStop());
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        getBookingSearch();
    }, [startDate, endDate]);

    useEffect(() => {
        if (isFocused) {
            getBooking();
        }
    }, [isFocused]);

    useEffect(() => {
        dispatch(loaderStop());
    }, []);

    const getBooking = () => {
        dispatch(
            getBookings(response => {
                const currentDate = moment();
                const filteredData =
                    filterType === 'PAST'
                        ? response.filter(item => moment(item.startDate).isBefore(currentDate))
                        : response.filter(item => moment(item.startDate).isSameOrAfter(currentDate));
                setData(filteredData);
            })
        );
    };

    useEffect(() => {
        if (isFocused) {
            getBooking();
        }
    }, [isFocused, filterType]);

    const handleFilterChange = type => {
        setFilterType(type);
    };

    const handleAccept = bookingId => {
        const param = {
            bookingId: bookingId,
            type: 'ACCEPT',
        };
        console.log('Booking Accepted:', bookingId);
        dispatch(
            acceptReject(param, response => {
                if (response) {
                    getBooking();
                }
            })
        );
    };

    const handleReject = bookingId => {
        const param = {
            bookingId: bookingId,
            type: 'REJECT',
        };
        dispatch(
            acceptReject(param, response => {
                console.log('responseresponse', response);
                if (response) {
                    getBooking();
                }
            })
        );
    };

    const BookingCard = ({ item }) => {
        return (
            <View style={styles.bookingCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Image style={styles.userImage} source={{ uri: item?.user?.profilePicture }} />
                    <Text style={[styles.bookingTitle, { paddingLeft: 12 }]}>
                        {item?.user?.firstName + ' ' + item?.user?.lastName}
                    </Text>
                </View>
                <Text style={styles.bookingTitle}>Service Name: {item.listing?.name}</Text>
                <Text style={styles.bookingDetails}>Start Date: {moment(item.startDate).format('MM-DD-YYYY')}</Text>
                <Text style={styles.bookingDetails}>End Date: {moment(item.endDate).format('MM-DD-YYYY')}</Text>
                {item?.status !== 'ACCEPTED' && (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => handleAccept(item._id)}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleReject(item._id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <AppBackground back appLogo={false} title={'Booking Requests'} marginHorizontal={false}>
            <View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: 15 }}>
                    <DatePickerComponent
                        label={startDate ? moment(startDate).format('MM-DD-YYYY') : 'Start Date'}
                        mode="date"
                        onConfirm={date => setStartDate(date)}
                    />
                    <DatePickerComponent
                        label={endDate ? moment(endDate).format('MM-DD-YYYY') : 'End Date'}
                        mode="date"
                        onConfirm={date => setEndDate(date)}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filterType === 'PAST' && styles.activeFilterButton,
                        ]}
                        onPress={() => handleFilterChange('PAST')}
                    >
                        <Text style={filterType === 'PAST' ? styles.filterButtonText : { color: colors.black, fontWeight: '500' }}>Past</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filterType === 'UPCOMING' && styles.activeFilterButton,
                        ]}
                        onPress={() => handleFilterChange('UPCOMING')}
                    >
                        <Text style={filterType === 'UPCOMING' ? styles.filterButtonText : { color: colors.black, fontWeight: '500' }}>Upcoming</Text>
                    </TouchableOpacity>
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

export default Bookings;
