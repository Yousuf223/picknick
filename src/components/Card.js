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

const { width } = Dimensions.get('screen');

const Card = ({ onPress,item, cardStyle }) => {
  const [like, setLike] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.card, cardStyle]}>
      <Image style={styles.post} source={{uri:item?.coverImage}} />
      <View style={{paddingHorizontal:10,paddingVertical:10}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text numberOfLines={3} style={styles.dec}>{item?.description}</Text>
   
 
      </View>

        <View style={[styles.row,{position:'absolute',bottom:0,paddingHorizontal:10}]}>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",}}>
          <Image style={styles.icon} source={appIcons.calender} />
          <Text style={styles.dateTime}>{moment(item?.startTime).format('MMM-DD-YYYY')}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",}}>
          <Image style={styles.icon} source={appIcons.time} />
          <Text style={styles.dateTime}>{moment(item?.startTime).format('hh:mm A')} - {moment(item?.endTime).format('hh:mm A')}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    ...Shadows.shadow0,
    borderRadius: 10,
    backgroundColor: '#ffffff20',
    marginTop: 14,
    width: width / 1.5,
    marginHorizontal: 6,

  },
  post: {
     width: '100%',
    height: 140,
    borderTopRightRadius:7,
    borderTopLeftRadius:7,
    // resizeMode:'cover',
  },
  dec:{
    color:colors.white,
    fontSize:size.xtiny,
    paddingBottom:27,
    maxWidth:'90%'
  },
  title:{
    color:colors.white,
  },
  icon:{
    width:16,height:16,
    resizeMode:"contain"
  },
  row:{
    flexDirection:"row",
     justifyContent:"space-between",
     alignItems:"center",
    marginVertical:10,
    width:'100%'
  },
  dateTime:{
    color:colors.white,
    fontSize:size.xtiny,
    marginLeft:6
  }
});
