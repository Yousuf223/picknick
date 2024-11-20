import React, { Component, createRef } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  RefreshControl
} from 'react-native';
import styles from './styles';
import Search from '../../../../../../components/Search';
import MessageList from '../../../../../../components/MessageList';
import { SwipeListView } from 'react-native-swipe-list-view';
import { appIcons, appImages } from '../../../../../../assets';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { chatList } from '../../../../../../redux/actions/appAction';
import { Swipeable } from 'react-native-gesture-handler';
import CustomTextInput from '../../../../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
class PersonalChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      searchList: [],
      searchText: '',
      chatList: [],
      filteredChats: []
    };
    this.swipeableRef = React.createRef(null);
  }
  chatList = () => {
    this.props.chatList(null, response => {
      console.log('chatListchatListchatListchatList', response)
      this.setState({ chatList: response, filteredChats: response });
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.chatList();
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
    const { refreshing, searchText, chatList, filteredChats } = this.state;
    console.log('chatlsitysssssssss', chatList)

    const handleSearch = keyword => {
      console.log('keyword', keyword)
      if (keyword == '') {
        return Toast.show({
          text1: `Please enter some text to search`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        const findKeyword = chatList.filter(item => String(item?.friend_id?.name)?.toLowerCase() == String(keyword)?.toLowerCase())
        this.setState({ filteredChats: findKeyword })
      }
    };
    const renderRightActions = (progress, dragX) => {
      const trans = dragX.interpolate({
        inputRange: [-101, -100, -50, 0],
        outputRange: [1, 0, 0, 20],
      });
      return (
        <TouchableOpacity>
          <Animated.View
            style={[styles.rightAction, { transform: [{ translateX: trans }] }]}>
            <TouchableOpacity
              onPress={() => this.deleteRow(item?.index)}
              style={styles.rowBack}>
              <Image
                style={{ width: 28, height: 28, resizeMode: 'contain' }}
                source={appIcons.delete}
              />
              <Text style={styles.deleteTitle}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      );
      // const handleDelete = (user_id) => {
      //   const payload = {
      //     user_id: user_id,
      //   };
      //   dispatch(
      //     ChatDelete(payload, value => {
      //       console.log(value, '===dispatch');
      //     }),
      //   );
    };
    const onRefresh = () => {
      this.chatList();
    };
    return (
      <View style={styles.cont}>
        <CustomTextInput
          search
          placeholder={'Search here'}
          value={searchText}
          keyboardType={'email-address'}
          onChangeText={value => {
            if (value == '') {
              this.setState({ filteredChats: chatList, searchText: value });
            } else {
              this.setState({ searchText: value });
            }
          }}
          emailstyle={styles.emailstyle}
          containerStyle={styles.containerStyle}
          mainView={styles.margin}
          searchIcon
          onSearch={() => handleSearch(searchText)}
        />
        {/* {searchText ? (
                    <SwipeListView
                        showsVerticalScrollIndicator={false}
                        data={filteredChats}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <MessageList item={item} />}
                        renderHiddenItem={({ item, index }) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity style={styles.rowBack}>
                                    <Image
                                        style={{ width: 28, height: 28, resizeMode: 'contain' }}
                                        source={appIcons.delete}
                                    />
                                    <Text style={styles.deleteTitle}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        rightOpenValue={-95}
                    />
                ) : ( */}
        <FlatList
          ref={this.swipeableRef}
          friction={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '30%' }}
          key={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={filteredChats}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log('iteminmessageListNow', item)
            return (
              <Swipeable renderRightActions={renderRightActions}>
                <MessageList item={item} screenName={'PersonalChat'} />
              </Swipeable>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.listempty}>
                <Text style={styles.txtlistempty}>No chat Found</Text>
              </View>
            );
          }}
        // renderHiddenItem={({ item, index }) => (
        //     <View style={styles.rowBack}>
        //         <TouchableOpacity
        //             onPress={() => this.deleteRow(item?.index)}
        //             style={styles.rowBack}
        //         >
        //             <Image style={{ width: 28, height: 28, resizeMode: "contain" }} source={appIcons.delete} />
        //             <Text style={styles.deleteTitle}>Delete</Text>
        //         </TouchableOpacity>
        //     </View>
        // )}
        // rightOpenValue={refreshing == true ? 0 : -95}
        />
        {/* )} */}
      </View>
    );
  }
}
const actions = { chatList }
export default connect(null, actions)(PersonalChat);
