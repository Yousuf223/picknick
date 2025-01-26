import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { appIcons } from '../../../../assets'; // Ensure the path is correct
import styles from './styles';
import { colors } from '../../../../utils';
import NavService from '../../../../helpers/NavService';
import { useDispatch } from 'react-redux';
import { getServicesDetail, likeService } from '../../../../redux/actions/appAction';
import CustomButton from '../../../../components/CustomButton';
import CreateBooking from '../../../../containers/Popup/CreateBooking/CreateBooking';

const ServiceDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { id } = route.params
  console.log('-sadsad', id)
  const [data, setData] = useState([
  ]);
  const [detail, setDetail] = useState(null)
  const [like,setLike] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  useEffect(() => {
    dispatch(
      getServicesDetail(id, response => {
        setDetail(response);
        setData(response?.listing?.media)
        setLike(response?.isFavourite)
      })
    );
  }, [])
  let a = 2
  console.log( 'type of', typeof a)
  const onLike = () => {
    const param = {listingId :id };
    dispatch(likeService(param, response => {
      setLike(response?.isFavourite)
    }));
  };
  const renderCard = ({ item }) => {
    console.log('itemitem', item)
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Image
          source={{ uri: item?.mediaPath }}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Horizontal Image Gallery */}
        <View style={styles.header}>
          <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index?.toString()}
            renderItem={renderCard}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
          <View style={styles.iconContainer1}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => NavService.goBack()} style={styles.iconButton}>
              <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: colors.black }} source={appIcons.back} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => onLike()} style={styles.iconButton}>
              {like ? <Text style={styles.iconText}>❤️</Text> :               <Image style={{width:20,height:20,resizeMode:'contain',tintColor:'red'}} source={appIcons.heart} />}

             
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.title}>{detail?.listing?.name}</Text>
          <Text style={styles.location}>
            {detail?.listing?.address}
          </Text>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.description}>
            {detail?.listing?.description}        </Text>
          <Text style={styles.sectionTitle}>Services & Facilities</Text>
          <View style={styles.services}>
            {detail?.listing?.services?.map((item, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.ticBg}>
                  <Image
                    style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    source={appIcons.tic}
                  />
                </View>
                <Text style={styles.serviceText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.price}>${detail?.listing?.price}/night</Text>
          </View>
        </View>


      </ScrollView>
 
      <View style={{ alignSelf: 'center', position: 'absolute', bottom: '6%' }}>
        <CustomButton onPress={()=>setModalVisible(true)} title={'Book Now'} />
      </View>
      <CreateBooking
          isModalVisible={modalVisible}
          togglePopup={() =>
            setModalVisible(false)
          }
          setModalVisible={setModalVisible}
          SubTitle={'Please select the start and end dates and times for your booking'}
          id={id}
        />
    </>
  );
};

export default ServiceDetail;
