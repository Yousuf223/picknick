import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
} from 'react-native';
import NavService from '../helpers/NavService';
import { colors } from '../utils';
import { appIcons } from '../assets';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const user = useSelector((state) => state?.authReducer?.role)
  console.log('useruser',user)
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    // Cleanup on unmount
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const togglePopUp = () => {
    setIsVisible(!isVisible);
  };

  const navigateFromPopUp = (nav) => {
    togglePopUp();
    NavService.navigate(nav);
  };

  return (
    <>
      <View
        style={[
          {
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
            backgroundColor: colors.primary,
            borderTopWidth: 1,
            borderColor: colors.lightGray1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          keyboardStatus ? styles.hideTabNavigation : null,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              if (route.name === 'Home') {
                setIsUpdated(isUpdated + 1);
                navigation.navigate('Home', {
                  refresh: true,
                  isUpdated,
                });
              }
              if (route.name === 'Message') navigation.navigate('Message');
              if (route.name === 'Profile') navigation.navigate('Profile');
              if (route.name === 'Favorite') navigation.navigate('Favorite');
            };

            let imageSrc = appIcons.heart;
            let title = '';
            if (route.name === 'Favorite') imageSrc = appIcons.heart, title = 'Favorite';
            if (route.name === 'Home') imageSrc = appIcons.home, title = 'Home';
            if (route.name === 'Profile') imageSrc = appIcons.user, title = 'Profile';

            return (
              <View style={{ paddingHorizontal: 15 }} key={route.name}>
                <TouchableOpacity
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityRole="button"
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={index === 1 ? styles.tabs1 : styles.tabs}
                >
                  <Image
                    source={imageSrc}
                    style={{
                      height: route.name === 'Profile' ? 21 : 21,
                      width: route.name === 'Profile' ? 21 : 21,
                      tintColor: isFocused ? colors.white : colors.black,
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: isFocused ? colors.white : colors.black,
                      fontSize: 14,
                      fontWeight: '600',
                      marginTop: 3,
                    }}
                  >
                    {title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      {user && user === 'Vendor' && <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={() => NavService.navigate('CreatePost')} style={styles.fabButton}>
        <Image
          source={appIcons.plus}
          style={styles.fabIcon}
        />
      </TouchableOpacity>}

    </>
  );
};

const styles = StyleSheet.create({
  tabs: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
  },
  tabs1: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    right: 8,
  },
  hideTabNavigation: {
    width: 0,
    height: 0,
    position: 'absolute',
    bottom: 0,
    top: 0,
  },
  fabButton: {
    position: 'absolute',
    bottom: 35, // Adjusted this value to move the button higher
    left: '50%',
    transform: [{ translateX: -35 }],
    width: 83,
    height: 83,
    backgroundColor: colors.white,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    zIndex: 100,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: colors.primary,
  },
});

export default TabBar;
