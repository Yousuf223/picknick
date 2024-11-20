import React, { Component } from "react";
import { FlatList, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import { colors } from "../../../../../../utils";
import Img from "../../../../../../components/Img";
import { appImages, appIcons } from "../../../../../../assets";
import CustomButton from "../../../../../../components/CustomButton";
import { connect } from 'react-redux';
import { friendList } from "../../../../../../redux/actions/appAction";
import styles from "./styles";
import FriendList from "../../../../../../components/FriendList";
import { ASSETS_URL } from "../../../../../../config/WebService";
import NavService from "../../../../../../helpers/NavService";

class MyFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendList: [],
            refreshing: false
        };
    };
    friendList = () => {
        this.props.friendList(null, response => {
            console.log('resposnoffriendLIst', response)
            this.setState({ friendList: response })
        })
    }
    componentDidMount() {
        this?.friendList();

    }
    render() {
        const { friendList, refreshing } = this.state;
        const RenderItem = ({ item, index }) => {
            console.log('itemmmm', item)
            const { user } = this.props;
            console.log('UserInMyFriendsScreen', user)
            let payload = {
                sender_id: user?._id,
                receiver_id: item?.friend_details?._id,
                user_name:item?.friend_details?.name
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
                            <TouchableOpacity onPress={() => NavService.navigate('OtherProfile', { id: item?.friend_details?._id })}>
                                <Img
                                    local
                                    src={item?.friend_details?.user_image ? { uri: ASSETS_URL + item?.friend_details?.user_image } : appImages.user}
                                    style={styles.profileImage}
                                />
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <Text numberOfLines={1} style={styles.username}>{item?.friend_details?.name}</Text>
                                {/* <Text numberOfLines={2} style={styles.country}>{item?.friend_details?.address}</Text> */}
                            </View>
                        </View>
                        <CustomButton
                            title="Message Now"
                            buttonStyle={styles.addBtn}
                            textStyle={styles.btnTitle}
                            onPress={() => NavService.navigate('Chat', { screenName: "PersonalChat", payload: payload })}
                        />
                    </View>
                </View>
            )
        }
        const onRefresh = () => {
            this?.friendList();
        };

        return (
            <View style={styles.cont}>
                <FlatList
                    contentContainerStyle={styles.flatListCont}
                    data={friendList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => { return <RenderItem item={item} /> }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.listempty}>
                                <Text style={styles.txtlistempty}>No Friends Found</Text>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
};
function mapStateToProps({ authReducer: { user } }) {
    return {
        user: user
    }
}
const actions = { friendList }
export default connect(mapStateToProps, actions)(MyFriends);