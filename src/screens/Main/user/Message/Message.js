import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import AppBackground from '../../../../components/AppBackground';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import NavService from '../../../../helpers/NavService';
import { getChatList } from '../../../../redux/actions/appAction';
import moment from 'moment';

const chatData = [
  {
    id: '1',
    name: 'Ali Khan',
    lastMessage: 'Kal milte hain!',
    time: '10:30 AM',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Fatima Bano',
    lastMessage: 'Ok thanks',
    time: '9:10 AM',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Group Study',
    lastMessage: 'Presentation ready hai?',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const Messages = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [data, setData] = useState([])
  const socket = useSelector(state => state.appReducer.socket);
  const joinRoom = (targetUserId) => {
    socket.emit("join-room", { userId: targetUserId?.otherUser?._id });
    NavService.navigate('Chat', { userId: targetUserId?.otherUser?._id, userDetail: targetUserId?.otherUser, chatIds: targetUserId?.chatId });
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getChatList(response => {
        setData(response);
      }));
    }
  }, [isFocused]);
  const renderItem = ({ item }) => (
    console.log('itemitemitem', item),
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => joinRoom(item)}
    >
      <Image source={{ uri: item?.otherUser?.profileImage }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item?.otherUser?.firstName}</Text>
          <Text style={styles.time}>
            {moment(item.lastMessage?.createdAt).calendar(null, {
              sameDay: 'hh:ss A',
              lastDay: '[Yesterday]',
              lastWeek: 'ddd',
              sameElse: 'DD/MM/YYYY',
            })}
          </Text>

        </View>
        <Text style={styles.lastMessage}>{item.lastMessage?.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <AppBackground menu notification title={'Chats'} appLogo={false} >
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </AppBackground>
  );
};

export default Messages;
