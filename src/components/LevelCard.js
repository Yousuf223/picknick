import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, size} from '../utils';
import {appIcons} from '../assets';

const LevelCard = ({onPress, item, level}) => {
  console.log('item?.profilePicture', item?.profilePicture);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.rankingCard}>
        <View style={{flexDirection:'row',alignItems:"center",flex:1}}>
        <Text style={styles.rank}>{level}</Text>
        <View style={styles.borderW}></View>
        </View>
   
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 14,flex:3,justifyContent:'space-evenly'}}>
        <Image
          style={[styles.userPhoto]}
          source={
            item?.profilePicture
              ? {uri: item?.profilePicture}
              : appIcons.userPlaceholder
          }
        />
        <View>
          <Text style={styles.title}>Player Name</Text>
          <Text  style={styles.subTitle}>
            {item?.firstName} {item?.lastName}
          </Text>
        </View>
      </View>
      <View style={{flex:2}}>
        <View style={{left: 17}}>
          <Text style={styles.title}>Honor Badge</Text>
          <Text style={styles.subTitle}>{item?.badgesCount}</Text>
        </View>
      </View>
      {item?.position == 1 ? (
        <Image style={styles.fire} source={appIcons.fire} />
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};

export default LevelCard;

const styles = StyleSheet.create({
  rankingCard: {
    backgroundColor: '#ffffff20',
    borderRadius: 7,
    borderColor: colors.border,
    borderWidth: 0.8,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 13,
    height: 69,
  },
  fire: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  borderW: {
    height: 40,
    width: 1,
    backgroundColor: colors.white,
  },
  subTitle: {
    color: colors.white,
    fontSize: size.normal,
    fontWeight: '600',
    // maxWidth:120
  },
  title: {
    color: colors.secondary,
    fontSize: size.tiny,
  },
  rank: {
    color: colors.white,
    paddingRight:14
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // marginRight:10
  },
});
