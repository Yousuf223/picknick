import React, {Component} from 'react';
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  LayoutAnimation,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import {appIcons, appImages} from '../../../../assets';
import Chats from '../../../../components/Chats';
import {colors} from '../../../../utils';
import Img from '../../../../components/Img';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  loaderStartWithDispatch,
  loaderStopWithDispatch,
  chatImage,
} from '../../../../redux/actions/appAction';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: [
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
        {
          userImage: appIcons.userPlaceholder,
        },
      ],
    };
    this.messageInput = React.createRef(null);
  }
  updateImageInGallery = (path, mime) => {
    this.setState({image: path});
  };
  componentDidMount() {
    loaderStartWithDispatch();
    this.response();
  }
  componentWillUnmount() {
    this.setState({messages: []});
  }
  response = () => {
    const socket = this.props?.socket;
    console.log('SockettttInchat', socket);
    // const recieverInfo = this?.props?.route?.params?.getUserProfile;
    // const senderInfo = this?.props?.user;
    const {payload} = this?.props?.route?.params;
    if (socket && socket !== null && typeof socket == 'object' && socket?.emit !== undefined) {
      socket?.emit('get_messages', {
        sender_id: payload?.sender_id,
        receiver_id: payload?.receiver_id,
      });
      loaderStopWithDispatch();
      socket?.on('response', data => {
        console.log('Dataaaaaaaaa', data);
        if (data?.data?.length == 0) {
          loaderStopWithDispatch();
          return;
        }
        if (data?.object_type == 'get_messages') {
          const chatList = data?.data || [];
          this.setState({messages: chatList});
        } else if (data?.object_type == 'get_message') {
          this.setState(prevState => {
            const currentMessages = [data?.data, ...prevState?.messages];
            currentMessages.reverse();
            return {
              messages: currentMessages,
            };
          });
        }
        loaderStopWithDispatch();
        LayoutAnimation.linear();
      });
      socket.on('error', data => {
        console.log('datattttt', data);
        loaderStopWithDispatch();
      });
    }
  };
  render() {
    const {messages, user} = this.state;
    const {payload} = this?.props?.route?.params;
    console.log('payloaaaddddd', payload);
    // let messageInput = React.createRef(null);
    // let message = React.createRef('');
    const screenName = this.props.route.params.screenName;
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    const sendNewMessage = async (messageType, image) => {
      console.log('hdhskdksjdksjdsjkdjksjdk');
      const socket = this.props?.socket;
      if (messageType == 'image') {
        let params = {
          sender_id: payload?.sender_id,
          receiver_id: payload?.receiver_id,
          message: image,
          type: messageType,
        };
        console.log('payloadinchat', params);
        socket?.emit('send_message', params);
        LayoutAnimation.linear();
      } else if (messageType == 'text' && this.messageInput.current) {
        loaderStartWithDispatch();
        const data = {
          sender_id: payload?.sender_id,
          receiver_id: payload?.receiver_id,
          message: this.messageInput?.current,
          type: messageType,
        };
        console.log('payloadinchatpayloadinchat', data);
        socket?.emit('send_message', data);
        this.messageInput.current = '';
        this.messageInput.clear();
        LayoutAnimation.linear();
      } else {
        Toast.show({
          text1: 'Please enter a message',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    };
    const SendImage = async (path, mime, type) => {
      const payload = new FormData();
      if (path?.length) {
        payload.append('message_image', {
          uri: path,
          type: mime,
          name: `post${Date.now()}.${mime?.slice(mime.lastIndexOf('/') + 1)}`,
        });
      }
      this.props.chatImage(payload, response => {
        response && sendNewMessage('image', response);
      });
    };

    return (
      <AppBackground back title={payload?.user_name}>
        <View style={styles.cont}>
          {screenName == 'GroupChat' && (
            <View>
              <FlatList
                data={user}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <View>
                      <Img
                        local
                        src={appIcons.userPlaceholder}
                        style={styles.userImage}
                        resizeMode={'contain'}
                      />
                    </View>
                  );
                }}
              />
            </View>
          )}
          <FlatList
            data={messages?.reverse()}
            inverted
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            contentContainerStyle={styles.flatListCont}
            renderItem={({item, index}) => {
              console.log('item---------item---------item', item);
              return (
                <>
                  <Chats item={item} currentUser={this.props.user} />
                </>
              );
            }}
          />
          <View style={[styles.flexRow, styles.messageView]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
              <ImagePicker
                onImageChange={(path, mime, type) => {
                  SendImage(path, mime, type);
                }}>
                <Img
                  local
                  src={appIcons.attachment}
                  style={styles.attachmentIcon}
                  resizeMode={'contain'}
                />
              </ImagePicker>
            </TouchableOpacity>
            <View style={[styles.flexRow, styles.inputCont]}>
              <TextInput
                ref={input => {
                  this.messageInput = input;
                }}
                numberOfLines={4}
                multiline
                style={styles.textInput}
                placeholder="Type Message"
                placeholderTextColor={colors.white}
                value={this.messageInput}
                onChangeText={text => {
                  this.messageInput.current = text;
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  sendNewMessage('text');
                }}
                style={styles.sendCont}>
                <Img
                  local
                  src={appIcons.send}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AppBackground>
    );
  }
}

function mapStateToProps({authReducer: {user}, appReducer: {socket}}) {
  return {
    user,
    socket,
  };
}
const actions = {chatImage};
export default connect(mapStateToProps, actions)(Chat);
