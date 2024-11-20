import React, {useRef, useState} from 'react';
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
import CustomTextInput from '../../../../components/CustomTextInput';
import {appIcons} from '../../../../assets';
import styles from './styles';

const Home = () => {
  const [search, setSearch] = useState('');
  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      notification
      // video={true}
      onVideoPress={() => togglePopUp()}
      marginHorizontal={false}>
      <CustomTextInput
        leftIcon={appIcons.search}
        placeholder={'Enter Email Address'}
        value={search}
        keyboardType={'email-address'}
        onChangeText={setSearch}
        maxLength={35}
        containerStyle={styles.containerStyle}
      />
    </AppBackground>
  );
};

export default Home;
