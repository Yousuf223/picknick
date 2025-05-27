import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';
import { colors, size } from '../utils';
import { appIcons } from '../assets';
import moment from 'moment';
import { T } from 'ramda';

const { width } = Dimensions.get('screen');

const Card = ({ title,price,dec,image, userImage,fullName, cardStyle }) => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=>NavService.navigate('BusinessDetail')} style={[styles.card, cardStyle]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingLeft: 20 }}>
        <Image style={styles.userImage} source={userImage} />
        <Text style={{color:colors.black,fontWeight:'600'}}>{fullName}</Text>
      </View>
      <Image style={styles.post} source={image} />
   
      <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{paddingHorizontal:10,fontSize:12,color:colors.black,fontWeight:'300'}}>{dec}</Text>
        <Text style={styles.title}>Property Rent</Text>
        <Text numberOfLines={3} style={styles.dec}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    // ...Shadows.shadow5,
    borderRadius: 10,
    backgroundColor: '#ffffff20',
    width: '94%',
    // marginHorizontal: 6,
    marginVertical: 6,
    alignSelf: "center",
    shadowColor:colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,

  },
  post: {
    width: '96%',
    height: 220,
    marginTop: 20,
    alignSelf:'center'
    // borderTopRightRadius:7,
    // borderTopLeftRadius:7,
    // resizeMode:'contain',
  },
  dec: {
    color: colors.black,
    fontSize: size.xtiny,
    paddingBottom: 27,
    maxWidth: '90%',
    paddingLeft: 10,
    lineHeight: 18
  },
  title: {
    color: colors.black,
    fontWeight: '500',
    paddingTop: 10,
    paddingLeft: 10
  },
  icon: {
    width: 16, height: 16,
    resizeMode: "contain"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: '100%'
  },
  dateTime: {
    color: colors.white,
    fontSize: size.xtiny,
    marginLeft: 6
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight:10
  },
  userImage:{
    width:50,
    height:50,
    borderRadius:50,
    marginRight:10
  }
});
