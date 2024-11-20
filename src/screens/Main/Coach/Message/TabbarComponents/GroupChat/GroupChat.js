import React, { Component } from "react";
import { Image, Keyboard, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import styles from "./styles";
import { connect } from 'react-redux';
import Search from "../../../../../../components/Search";
import MessageList from "../../../../../../components/MessageList";
import { SwipeListView } from "react-native-swipe-list-view";
import { appIcons, appImages } from "../../../../../../assets";
import { groupChatList } from "../../../../../../redux/actions/appAction";
import CustomTextInput from "../../../../../../components/CustomTextInput";
import Toast from 'react-native-toast-message';

class GroupChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            chatList: [],
            searchList: [],
            searchText: '',
            messageList: [
                {
                    index: 1,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 2,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 3,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 4,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 5,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 6,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
                {
                    index: 7,
                    image: [
                        { img: appImages.user },
                        { img: appImages.user },
                        { img: appImages.user },
                    ],
                    username: "Group Name",
                    message: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    date: "Jan,05,2023",
                },
            ],
            groupChatList: [],
            filteredChats: [],
            refreshing: false

        };
    };
    groupChatList = () => {
        this.props.groupChatList(null, response => {
            console.log('groupChatListgroupChatListREsponse', response)
            this.setState({ groupChatList: response, filteredChats: response });
        });
    };
    componentDidMount() {
        console.log('naviagaaggagation', this.props.navigation)
        this.focusListener = this.props.navigation.addListener(
            'focus',
            async () => {
                this.groupChatList();
            },
        );
    }
    componentWillUnmount() {
        this.focusListener();
    }

    deleteRow = index => {
        const { messageList } = this.state;
        const remaining = messageList?.filter((item, i) => {
            return item?.index !== index;
        });
        this.setState({ messageList: remaining });
    };

    render() {
        const { groupChatList, searchText, filteredChats, refreshing } = this.state;
        const handleSearch = keyword => {
            console.log('keyword', keyword)
            if (keyword == '') {
                return Toast.show({
                    text1: `Please enter some text to search`,
                    type: 'error',
                    visibilityTime: 3000,
                });
            } else {
                const findKeyword = groupChatList.filter(item => String(item?.group_id?.group_name)?.toLowerCase() == String(keyword)?.toLowerCase())
                this.setState({ filteredChats: findKeyword })
            }
        };
        const onRefresh = () => {
            this.groupChatList();
        };

        return (
            <View style={styles.cont}>
                <CustomTextInput
                    search
                    placeholder={'Search here'}
                    value={searchText}
                    onChangeText={value => {
                        if (value == '') {
                            this.setState({ filteredChats: groupChatList, searchText: value });
                        } else {
                            this.setState({ searchText: value });
                        }
                    }}
                    containerStyle={styles.containerStyle}
                    mainView={styles.margin}
                    searchIcon
                    onSearch={() => handleSearch(searchText)}
                />
                <SwipeListView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: "30%" }}
                    key={item => item.id}
                    data={filteredChats}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <MessageList item={item} screenName={"GroupChat"} />}
                    renderHiddenItem={({ item, index }) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity
                                onPress={() => this.deleteRow(item?.index)}
                                style={styles.rowBack}
                            >
                                <Image style={{ width: 28, height: 28, resizeMode: "contain" }} source={appIcons.delete} />
                                <Text style={styles.deleteTitle}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-95}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.listempty}>
                                <Text style={styles.txtlistempty}>No chat Found</Text>
                            </View>
                        );
                    }}
                />

            </View>
        );
    };
};


const actions = { groupChatList }
export default connect(null, actions)(GroupChat);