import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  LayoutAnimation,
  Text,
  Platform,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import { appIcons } from '../../../../assets';
import { colors } from '../../../../utils';
import Img from '../../../../components/Img';
import { connect, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  loaderStartWithDispatch,
  loaderStopWithDispatch,
  chatImage,
  getChatMessages,
} from '../../../../redux/actions/appAction';
import ImagePicker from '../../../../components/ImagePicker'; // Assuming this is your custom component
import Chats from '../../../../components/Chats';

const Chat = ({ route, socket, user, chatImage }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
  ]);

  const messageInputRef = useRef(null);
  const messageText = useRef('');
  const [currentChatId, setCurrentChatId] = useState(null);
  const { chatIds, userDetail } = route?.params;
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (data) => {
      console.log('datadatadata',data)
      loaderStopWithDispatch();
      if (data) {
        setMessages((prev) => [data, ...prev]);
      }
    };

    const handleError = (error) => {
      loaderStopWithDispatch();
      Toast.show({
        text1: 'Socket error',
        text2: error?.message || 'An error occurred',
        type: 'error',
      });
      console.error('Socket error:', error);
    };

    const handleJoinRoom = ( chatId ) => {
      console.log('chatIdchatIdchatId',chatId)
      if (chatId?.roomId || chatIds) {
        getMessages(chatId?.roomId || chatIds);
      }
      setCurrentChatId(chatId?.roomId || chatIds);
    };

    socket.on('joined-room', handleJoinRoom);
    socket.on('new-message', handleNewMessage);
    socket.on('error', handleError);

    return () => {
      socket.off('joined-room', handleJoinRoom);
      socket.off('new-message', handleNewMessage);
      socket.off('error', handleError);
    };
  }, [socket]);


  useEffect(() => {
    loaderStartWithDispatch();

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    loaderStopWithDispatch();

    return () => {
      setMessages([]);
    };
  }, []);
  const getMessages = (chatId) => {
    const param = {
      key: "roomId",
      value: chatId
    };
    dispatch(getChatMessages(param, response => {
      console.log('msg response', response)
      setMessages(response);
    }));
  }
  const sendNewMessage = async (messageType, image) => {
    if (!socket || typeof socket.emit !== 'function') {
      Toast.show({
        text1: 'Connection error. Please try again later.',
        type: 'error',
      });
      return;
    }

    const trimmedMsg = messageText.current.trim();
    if (!trimmedMsg) {
      Toast.show({
        text1: 'Please enter a message',
        type: 'error',
      });
      return;
    }

    // loaderStartWithDispatch();

    try {
      const data = {
        message: trimmedMsg,
        roomId: currentChatId,
      };

      messageText.current = '';
      if (messageInputRef.current) {
        messageInputRef.current.clear();
      }

      socket.emit('send-message', data, (ack) => {
        console.log('ackack',ack)
        // Optional: check acknowledgement from server
        // loaderStopWithDispatch();
        if (ack?.error) {
          Toast.show({
            text1: ack.error || 'Failed to send message',
            type: 'error',
          });
        }
      });

      LayoutAnimation.linear();
    } catch (error) {
      // loaderStopWithDispatch();
      Toast.show({
        text1: 'An unexpected error occurred',
        type: 'error',
      });
    }
  };



  //   const formData = new FormData();
  //   if (path?.length) {
  //     formData.append('message_image', {
  //       uri: path,
  //       type: mime,
  //       name: `post${Date.now()}.${mime?.split('/').pop()}`,
  //     });
  //   }
  //   chatImage(formData, response => {
  //     if (response) sendNewMessage('image', response);
  //   });
  // };
  return (
    <AppBackground back appLogo={false} title={userDetail?.firstName + ' ' + userDetail?.lastName}>
      <View style={styles.cont}>
        <FlatList
          data={messages}
          inverted
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.flatListCont}
          renderItem={({ item }) => <Chats item={item} />}
        />
        <View style={[styles.flexRow, styles.messageView]}>
          <View style={[styles.flexRow, styles.inputCont]}>
            <TextInput
              ref={messageInputRef}
              numberOfLines={4}
              multiline
              style={styles.textInput}
              placeholder="Type Message"
              placeholderTextColor={colors.white}
              onChangeText={text => (messageText.current = text)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => sendNewMessage('text')}
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
};

const mapStateToProps = ({ authReducer: { user }, appReducer: { socket } }) => ({
  user,
  socket,
});

export default connect(mapStateToProps, { chatImage })(Chat);
