import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import CustomTextInput from '../../../../components/CustomTextInput';
import { appIcons } from '../../../../assets';
import styles from './styles';
import Card from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList, loaderStop } from '../../../../redux/actions/appAction';
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const userData = useSelector(state => state?.authReducer?.user)
  console.log(userData, 'userDatauserData')
  useEffect(() => {
    dispatch(loaderStop())
  }, [])

  useEffect(() => {
    if (isFocused) {
      dispatch(getEventList(response => {
        console.log('Fetched event list:', response);
        setData(response);
      }));
    }
  }, [isFocused]);
console.log('userDatauserData',userData?.data)
  return (
    <AppBackground
      menu
      title={'Home'}
      Cart={true}
      appLogo={false}
      notification
      marginHorizontal={false}>
      <CustomTextInput
        leftIcon={appIcons.search}
        placeholder={'Search'}
        value={search}
        keyboardType={'email-address'}
        onChangeText={setSearch}
        maxLength={35}
        containerStyle={styles.containerStyle}
      />
      <View style={styles.cardData}>
        {/* <Text style={styles.title}>How Can Help You</Text> */}
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: '40%' }}
          renderItem={({ item }) => (
            <Card userImage={userData?.data?.profileImage ? { uri: userData?.data?.profileImage } : appIcons.userPlaceholder}
              fullName={userData?.data?.firstName + ' ' + userData?.data?.lastName}
              image={item?.media?.length > 0 && { uri: item?.media[0]?.mediaPath }}
              price={item?.price} title={item?.name} item={item} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.listempty}>
              <Text style={styles.txtlistempty}>No Service Found</Text>
            </View>
          )}
        />
      </View>
    </AppBackground>
  );
};

export default Home;
