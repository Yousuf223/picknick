import React from 'react';
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
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <AppBackground   menu notification title={'Chats'}  appLogo={false} >
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
    </AppBackground>
  );
};

export default Messages;
