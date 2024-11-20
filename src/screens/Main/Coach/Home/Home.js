import React, {useRef} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  RefreshControl,
  TouchableHighlight,
  Platform,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';




const Home = () => {
  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      notification
      // video={true}
      onVideoPress={() => togglePopUp()}
      marginHorizontal={false}>
      <Text>Vendor</Text>
    </AppBackground>
  );
};

export default Home;
