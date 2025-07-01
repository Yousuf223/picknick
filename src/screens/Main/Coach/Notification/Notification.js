import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppBackground from "../../../../components/AppBackground";
import { appIcons } from "../../../../assets";
import { colors } from "../../../../utils";
import appStyles from "../../../appStyles";
import Img from "../../../../components/Img";
import styles from "./styles";
import { getNotification } from "../../../../redux/actions/appAction";
import ListEmptyComponent from "../../../../components/ListEmptyComponent";
import moment from "moment";

const Notification = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer?.user);
    const [notificationList, setNotificationList] = useState([]);

    useEffect(() => {
        dispatch(getNotification(result => {
            console.log('Fetched Notifications:', result);
            if (Array.isArray(result)) {
                setNotificationList(result);
            }
        }));
    }, [dispatch]);

    const renderNotificationItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.flexRow, styles.notiCont]}
        >
            <View style={{
                width:"100%" ,
                marginLeft: (item.icon && item.type) ? 15 : 0,
            }}>
                <View style={[styles.flexRow, appStyles.justifySpaceBetween]}>
                    <Text style={styles.notiheader}>{item.message}</Text>
                    
                        <Text style={[styles.noticontent, appStyles.family_Oswald_Regular]}>
                            {moment(item.createdAt).format('MM-DD-YYYY')}
                        </Text>
                    
                </View>
                <View style={[styles.flexRow, appStyles.justifySpaceBetween]}>
                    <Text style={[styles.noticontent, {
                        // width:"55%",
                    }]}>
                        {item.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <AppBackground
            back
            title="Notification"
            marginHorizontal={false}
            appLogo={false}
        >
            <View style={styles.cont}>
                <FlatList
                    data={notificationList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                        return (
                            <ListEmptyComponent
                                viewStyle={styles.listEmpty}
                                titleStyle={styles.textListEmpty}
                                title={'No notification found at the moment'}
                            />
                        );
                    }}
            
                />
            </View>
        </AppBackground>
    );
};

export default Notification;
