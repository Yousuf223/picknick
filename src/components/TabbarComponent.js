import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  Platform
} from 'react-native';
import NavService from '../helpers/NavService';
import { colors } from '../utils';
import { appIcons } from '../assets';


const { width } = Dimensions.get('screen');
export default class TabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isUpdated: 0,
      keyboardStatus: false
    };
  }
  componentDidMount() {
    this.showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardStatus: true });
    });
    this.hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardStatus: false });
    });
  }
  componentWillUnmount() {
    this.showSubscription.remove();
    this.hideSubscription.remove();
  }
  render() {
    const { isVisible, isUpdated, keyboardStatus } = this.state;
console.log('statestate',state)
    const { state, navigation } = this.props;
    const togglePopUp = () => {
      this.setState({ isVisible: !isVisible });
    };
    const navigateFromPopUp = nav => {
      togglePopUp();
      NavService.navigate(nav);
    };
    console.log('keyBoardStatuskeyBoardStatus-------', keyboardStatus)
    return (
      <View
        style={[{
          width: '100%',
           height: 78,
          position: 'absolute',
          bottom: 0,
          justifyContent: 'flex-end',
          shadowColor: '#000',    
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 5,
          alignSelf: 'center',
          backgroundColor: colors.white,
          borderTopWidth:1,
          borderColor:colors.lightGray1
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          // paddingVertical: 12,
        }, keyboardStatus ? styles.hideTabNavigation : null]}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent:"space-around"
            // overflow: 'hidden',
             justifyContent: 'space-between',
             paddingHorizontal: 10,
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              if (route.name === 'Home')
                this.setState({ isUpdated: isUpdated + 1 }, () => {
                  navigation.navigate('Home', {
                    refresh: true,
                    isUpdated,
                  });
                });

              if (route.name === 'Groups') navigation.navigate('Groups');
              // if (route.name === 'CreatePost')
              //   navigation.navigate('CreatePost');
              // if (route.name === 'Message') navigation.navigate('Message');
              if (route.name === 'Profile') navigation.navigate('Profile');
            };
            let imageSrc = appIcons.heart;
            let title = ''
            // if (route.name === 'CreatePost') return;
            if (route.name === 'Home') imageSrc = appIcons.home, title = 'Home';
            return (
              <View style={{paddingHorizontal:15}}>
                {/* {isFocused ? <View style={{ backgroundColor: colors.secondary, width: 69, 
                  height: 5, position: "absolute",borderBottomLeftRadius:10,alignSelf:'center',
                  borderBottomRightRadius:10,top:-12 ,right:index === 1 ? 7 : 6}}></View> : null} */}

                <TouchableOpacity
                  key={index + 1}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityRole="button"
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={index === 1 ? styles.tabs1 :[
                    styles.tabs,
                    // route.name === 'Message' && {marginLeft: '20%'},
                    // route.name === 'Groups' && {marginRight: '10%'},
                  ]}>

                  <Image
                    source={imageSrc}
                    style={{
                      height: route.name === 'Profile' ? 21 : 21,
                      width: route.name === 'Profile' ? 21 : 21,
                      tintColor: isFocused ? colors.primary : colors.black,
                      //  borderRadius:route.name === 'Profile' ? 50 :0
                    }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: isFocused ? colors.primary : colors.black, fontSize: 12, fontWeight: "300", marginTop: 3 }}>{title}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
    flex: 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: width * 0.4,
    borderRadius: 10,
  },
  buttonPerfectionNext: {
    backgroundColor: colors.secondary,
    marginLeft: 15,
  },
  tabs: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // marginBottom: 2,
    height: 65,
  },
  hideTabNavigation: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: 0,
    top: 0,

  },
  tabs1:{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        // marginBottom: 2,
        height: 65,
        right:8
  }
});
