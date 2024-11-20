import React, {Component, createRef} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import {colors} from '../../../../utils';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import MessageList from '../../../../components/MessageList';
import CustomTextInput from '../../../../components/CustomTextInput';
import {chatList, groupChatList} from '../../../../redux/actions/appAction';
import {Swipeable} from 'react-native-gesture-handler';
import {appIcons} from '../../../../assets';
import {SwipeListView} from 'react-native-swipe-list-view';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      refreshing: false,
      searchList: [],
      searchText: '',
      chatList: [],
      filteredChats: [],
      groupChatList: [],
      filteredChatsGroup: [],
      searchTextGroup: '',
      refreshingGroup: false,
    };
    this.swipeableRef = React.createRef(null);
  }
  chatList = () => {
    this.props.chatList(null, response => {
      console.log('chatListchatListchatListchatList', response);
      this.setState({chatList: response, filteredChats: response});
    });
  };
  groupChatList = () => {
    this.props.groupChatList(null, response => {
      console.log('groupChatListgroupChatListREsponse', response);
      this.setState({groupChatList: response, filteredChatsGroup: response});
    });
  };
  deleteRow = index => {
    const {messageList} = this.state;
    const remaining = messageList?.filter((item, i) => {
      return item?.index !== index;
    });
    this.setState({messageList: remaining});
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.chatList();
        this.groupChatList();
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {
      index,
      searchText,
      refreshing,
      filteredChatsGroup,
      chatList,
      filteredChats,
      searchTextGroup,
      groupChatList,
      refreshingGroup,
    } = this.state;
    const PersonalChatComponent = () => {
      // const renderRightActions = (progress, dragX) => {
      //     const trans = dragX.interpolate({
      //         inputRange: [-101, -100, -50, 0],
      //         outputRange: [1, 0, 0, 20],
      //     });
      //     return (
      //         <TouchableOpacity>
      //             <Animated.View
      //                 style={[styles.rightAction, { transform: [{ translateX: trans }] }]}>
      //                 <TouchableOpacity
      //                     onPress={() => this.deleteRow(item?.index)}
      //                     style={styles.rowBack}>
      //                     <Image
      //                         style={{ width: 28, height: 28, resizeMode: 'contain' }}
      //                         source={appIcons.delete}
      //                     />
      //                     <Text style={styles.deleteTitle}>Delete</Text>
      //                 </TouchableOpacity>
      //             </Animated.View>
      //         </TouchableOpacity>
      //     );
      //     // const handleDelete = (user_id) => {
      //     //   const payload = {
      //     //     user_id: user_id,
      //     //   };
      //     //   dispatch(
      //     //     ChatDelete(payload, value => {
      //     //       console.log(value, '===dispatch');
      //     //     }),
      //     //   );
      // };
      const onRefresh = () => {
        this.chatList();
      };
      return (
        <View style={styles.cont1}>
          <FlatList
            ref={this.swipeableRef}
            friction={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '30%'}}
            key={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={filteredChats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              console.log('iteminmessageList', item);
              return (
                // <Swipeable renderRightActions={renderRightActions}>
                <MessageList item={item} screenName={'PersonalChat'} />
                // </Swipeable>
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
    };
    const GroupChatComponent = () => {
      const onRefresh = () => {
        this.groupChatList();
      };
      return (
        <View style={styles.cont}>
          <SwipeListView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '30%'}}
            key={item => item.id}
            data={filteredChatsGroup}
            refreshControl={
              <RefreshControl
                refreshing={refreshingGroup}
                onRefresh={onRefresh}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <MessageList item={item} screenName={'GroupChat'} />
            )}
            renderHiddenItem={({item, index}) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() => this.deleteRow(item?.index)}
                  style={styles.rowBack}>
                  <Image
                    style={{width: 28, height: 28, resizeMode: 'contain'}}
                    source={appIcons.delete}
                  />
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
    const handleSearch = keyword => {
      console.log('keyword', keyword);
      if (keyword == '') {
        return Toast.show({
          text1: `Please enter some text to search`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        const findKeyword = chatList.filter(
          item =>
            String(item?.friend_id?.name)?.toLowerCase() ==
            String(keyword)?.toLowerCase(),
        );
        this.setState({filteredChats: findKeyword});
      }
    };
    const handleSearchForGroup = keyword => {
      console.log('keyword', keyword);
      if (keyword == '') {
        return Toast.show({
          text1: `Please enter some text to search`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        const findKeyword = groupChatList.filter(
          item =>
            String(item?.friend_id?.name)?.toLowerCase() ==
            String(keyword)?.toLowerCase(),
        );
        this.setState({filteredChatsGroup: findKeyword});
      }
    };
    return (
      <AppBackground title={'Chats'} menu marginHorizontal={false}>
        <View style={styles.cont}>
          <View style={[styles.flexRow, styles.BtnView]}>
            <CustomButton
              title="Personal Chat"
              onPress={() => this.setState({index: 0})}
              buttonStyle={[
                styles.buttonStyle,
                {
                  borderBottomColor:
                    index == 0 ? colors.primary : colors.lightGray,
                },
              ]}
              textStyle={[
                styles.btnTitle,
                {
                  color: index == 0 ? colors.white : colors.lightGray1,
                },
              ]}
            />
            <CustomButton
              title="Group Chat"
              onPress={() => this.setState({index: 1})}
              buttonStyle={[
                styles.buttonStyle,
                {
                  borderBottomColor:
                    index == 1 ? colors.primary : colors.lightGray,
                },
              ]}
              textStyle={[
                styles.btnTitle,
                {
                  color: index == 1 ? colors.white : colors.lightGray1,
                },
              ]}
            />
          </View>
          <CustomTextInput
            placeholder={'Search here'}
            value={searchText}
            onChangeText={value => {
              if (value == '' && index == 0) {
                this.setState({filteredChats: chatList, searchText: value});
              }
              else if(value == '' && index == 1){
                this.setState({filteredChatsGroup: groupChatList, searchText: value});
              }
              else {
                this.setState({searchText: value});
              }
            }}
            // onChangeText={value => this.setState({searchText: value})}
            containerStyle={styles.containerStyle}
            searchIcon
            onSearch={() =>
              index == 0
                ? handleSearch(searchText)
                : handleSearchForGroup(searchText)
            }
          />

          {index == 0 ? <PersonalChatComponent /> : <GroupChatComponent />}
        </View>
      </AppBackground>
    );
  }
}
const actions = {chatList, groupChatList};
export default connect(null, actions)(Message);
