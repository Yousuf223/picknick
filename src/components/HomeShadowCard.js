import React from 'react'
import { View, TouchableOpacity, Image, Text,StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { colors, size } from '../utils'
import { appIcons } from '../assets'

const HomeShadowCard = ({onPress,item}) => {
  console.log('itemitem',item)
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.pointCard}>
            {/* <ImageBackground source={appIcons.shadow} > */}
            <Image style={styles.strike} source={appIcons.strike} />
            <View style={{marginLeft:6}}>
                <Text style={styles.name}>{item?.badgesCount} Honor Badges</Text>
                <Text style={styles.dec}>Earn {7 - item?.badgesCount} more badges for next level</Text>
            </View>
            <LinearGradient  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  style={styles.linear} colors={[colors.primary, colors.border]}>
                <Text style={styles.level}>Level {item?.UserLevelPoints?.level}</Text>
            </LinearGradient>
            {/* </ImageBackground> */}

        </TouchableOpacity>
    )
}

export default HomeShadowCard

const styles = StyleSheet.create({
    strike:{
        width:102,height:102,
        resizeMode:"contain"
      },
      pointCard:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:'#ffffff20',
        borderRadius:7,
        borderColor:colors.border,
        borderWidth:0.8,marginTop:19,
        width:"100%",
        paddingVertical:10,
        paddingLeft:10
      },
      name:{
        color:colors.white,
        fontWeight:"600",
        fontSize:size.xxsmall
      },
      dec:{
        color:colors.secondary,
        fontSize:size.tiny,
        paddingTop:6
      },
      linear:{
        width:70,
        height:30,
        alignItems:"center",
        justifyContent: 'center',
        borderRadius:20,
        position:"absolute",top:15,
        right:12
      },
      level:{
        color:colors.white,
        fontSize:size.tiny,
        fontWeight:'500'
      }
})
