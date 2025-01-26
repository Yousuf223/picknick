import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { appIcons } from '../assets';
import NavService from '../helpers/NavService';

const ResortCard = ({item}) => {
  console.log('itemitem',item)
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=>NavService.navigate('ServiceDetail',{id:item?._id})} style={styles.card}>
      <Image
        source={item?.media ? {uri:item?.media[0]?.mediaPath} : ''} 
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.location}>{item?.address}</Text>

        <View style={styles.ratingContainer}>
        <Text style={styles.price}>${item?.price}/night</Text>
          <Text style={styles.rating}>⭐ {item?.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    marginHorizontal:10,
    width:200
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  rating: {
    fontSize: 14,
    color: '#333',
  },
});

export default ResortCard;
