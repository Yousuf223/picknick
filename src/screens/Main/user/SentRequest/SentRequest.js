import React, { Component } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import styles from "./styles";
import { colors } from "../../../../utils";
import AppBackground from "../../../../components/AppBackground";
import { connect } from 'react-redux';
import { SendRequestList, unFriend } from "../../../../redux/actions/appAction";
import CustomButton from "../../../../components/CustomButton";
import Img from "../../../../components/Img";
import { ASSETS_URL } from "../../../../config/WebService";
import { appIcons } from "../../../../assets";

class SentRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            SendRequestList: [],
            refreshing: false
        };
    };
    SendRequestList = () => {
        this.props.SendRequestList(null, response => {
            console.log('SendRequestListSendRequestList', response)
            this.setState({ SendRequestList: response });
        });
    };
    componentDidMount() {
        this?.SendRequestList()
    }

    render() {
        const { SendRequestList, refreshing } = this.state;
        const onRefresh = () => {
            this?.SendRequestList();
        };

        const RenderItem = ({ item, index }) => {
            console.log('itemminsenyrequest', item)
            let payload = {
                request_id: item?._id,
                type: 'cancel_request'
            }
            const handleCancel = (index) => {
                console.log('payload-payload', payload)
                this?.props?.unFriend(payload)
                const deleteCancle = SendRequestList.filter(item => item?._id != index)
                this.setState({ SendRequestList: deleteCancle })
            }
            return (
                <View>
                    <View style={[styles.flexRow, {
                        width: "100%",
                        marginVertical: 10,
                        backgroundColor: colors.lightBlack,
                        paddingRight: 15,
                        paddingVertical: 10,
                        borderRadius: 8,
                        justifyContent: 'space-between'
                    }]}>
                        <View style={[styles.flexRow]}>
                            <Img
                                local
                                src={item?.reciever_Id?.user_image ? { uri: ASSETS_URL + item?.reciever_Id?.user_image } : appIcons.userPlaceholder}
                                style={styles.profileImage}
                            />
                            <View style={styles.content}>
                                <Text numberOfLines={1} style={styles.username}>{item?.reciever_Id?.name}</Text>
                                <Text numberOfLines={2} style={styles.country}>{item?.reciever_Id?.address}</Text>
                            </View>
                        </View>


                        <View style={{ alignItems: "flex-end" }}>
                            <View style={[styles.flexRow, {
                                width: 155,
                                justifyContent: 'space-between'
                            }]}>

                                <CustomButton
                                    title={"Cancel"}
                                    onPress={() => handleCancel(item?._id)}
                                    buttonStyle={styles.buttonStyle}
                                    textStyle={styles.btnTitle}
                                />
                                <CustomButton
                                    title={"Pending"}

                                    buttonStyle={styles.buttonStyle}
                                    textStyle={styles.btnTitle}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <AppBackground
                title={"Sent Request"}
                back
                marginHorizontal={false}
            >
                <FlatList
                    contentContainerStyle={{ flexGrow: 1, marginTop: 10, paddingBottom: '10%' }}
                    data={SendRequestList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => { return <RenderItem item={item} /> }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.listempty}>
                                <Text style={styles.txtlistempty}>No Request Found</Text>
                            </View>
                        );
                    }}
                />
            </AppBackground>
        );
    }
};
const actions = { SendRequestList, unFriend };
export default connect(null, actions)(SentRequest); 