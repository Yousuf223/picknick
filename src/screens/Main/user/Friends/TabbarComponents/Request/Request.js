import React, { Component, useState } from "react";
import { FlatList, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import styles from "./styles";
import RequestList from "../../../../../../components/RequestList";
import { connect } from 'react-redux';
import { receivedRequest, acceptRejectRequest } from "../../../../../../redux/actions/appAction";
import { colors } from "../../../../../../utils";
import CustomButton from "../../../../../../components/CustomButton";
import Img from "../../../../../../components/Img";
import { appIcons } from "../../../../../../assets";
import { ASSETS_URL } from "../../../../../../config/WebService";
import NavService from "../../../../../../helpers/NavService";
class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receivedRequest: [],
            refreshing: false
        };
    };
    receivedRequest = (params) => {
        this.props.receivedRequest(params, response => {
            console.log('resposneofrecivedrequestlist', response)
            this.setState({ receivedRequest: response });
        });
    };
    componentDidMount() {
        let params = {
            type: 'friend'
        }
        this.receivedRequest(params);
    }
    // componentWillUnmount() {
    //     this.focusListener();
    // }
    render() {
        const { receivedRequest, refreshing } = this.state;
        const onRefresh = () => {
            let params = {
                type: 'friend'
            }
            this.receivedRequest(params);
        }
        const RenderItem = ({ item, index }) => {
            console.log('iteminrequest', item)
            const [status, setStatus] = useState('pending');
            const [accepted, setAccepted] = useState(false);
            let payloadofReject = {
                request_id: item?._id,
                request_status: 2
            }
            const handleReject = (id) => {
                console.log('iddd', id)
                const deleteReject = receivedRequest.filter(item => item?._id !== id)
                this.setState({ receivedRequest: deleteReject })
                this?.props?.acceptRejectRequest(payloadofReject)
            };
            let payloadofAccept = {
                request_id: item?._id,
                request_status: 1
            }
            const handleAccept = (id) => {
                console.log('iddd', id)
                const deleteAccept = receivedRequest.filter(item => item?._id !== id)
                this.setState({ receivedRequest: deleteAccept })
                this?.props?.acceptRejectRequest(payloadofAccept)
            }

            if (status === 'rejected') {
                return null;
                // Return null to remove the card from rendering
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
                            <TouchableOpacity>
                                <Img
                                    local
                                    src={item?.sender_Id?.user_image ? { uri: ASSETS_URL + item?.sender_Id?.user_image } : appIcons.userPlaceholder}
                                    style={styles.profileImage}
                                />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <Text numberOfLines={1} style={styles.username}>{item?.sender_Id?.name}</Text>
                                {/* <Text numberOfLines={2} style={styles.country}>{item?.sender_Id?.city}</Text> */}
                            </View>
                        </View>


                        <View style={{ alignItems: "flex-end" }}>
                            <View style={[styles.flexRow, {
                                width: 155,
                                justifyContent: 'space-between'
                            }]}>
                                {!accepted && (
                                    <CustomButton
                                        title={"Accept"}
                                        onPress={() => handleAccept(item?._id)}
                                        buttonStyle={styles.buttonStyle}
                                        textStyle={styles.btnTitle}
                                    />
                                )}
                                {!accepted && (
                                    <CustomButton
                                        title={"Reject"}
                                        onPress={() => handleReject(item?._id)}
                                        buttonStyle={styles.buttonStyle}
                                        textStyle={styles.btnTitle}
                                    />
                                )}
                            </View>
                            {accepted && (
                                <CustomButton
                                    title="Friend"
                                    buttonStyle={styles.buttonStyle}
                                    textStyle={styles.btnTitle}
                                />
                            )}
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.cont}>
                <FlatList
                    contentContainerStyle={styles.flatListCont}
                    data={receivedRequest}
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
            </View>
        );
    }
};

const actions = { receivedRequest, acceptRejectRequest };
export default connect(null, actions)(Request); 