import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card'; // Ensure this Card component is implemented
import { useDispatch } from 'react-redux';
import { getServices, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';
import ResortCard from '../../../../components/resortCard';

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loaderStop());
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log('Fetching event list...');
      dispatch(
        getServices(response => {
          console.log('Fetched event list:', response);
          setData(response);
        })
      );
    }
  }, [isFocused]);

  const renderCard = ({ item }) => {
    return (
      <ResortCard item={item}
      />
    );
  };

  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      appLogo={false}
      notification
      marginHorizontal={false}>
        <Text style={{color:'#000',marginTop:7,textAlign:'center'}}>Home</Text>
      {/* <CustomTextInput
        leftIcon={appIcons.search}
        placeholder={'Search'}
        value={search}
        keyboardType={'email-address'}
        onChangeText={setSearch}
        maxLength={35}
        containerStyle={styles.containerStyle}
      />
      <View style={styles.cardData}>
        <Text style={styles.title}>Explore Places</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View> */}
    </AppBackground>
  );
};

export default Home;
