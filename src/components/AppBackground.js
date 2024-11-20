import React from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard, ImageBackground, ScrollView, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { appIcons, appLogos } from '../assets/index';
import { appImages } from '../assets';
import { colors, size } from '../utils';
import NavService from '../helpers/NavService';
import Shadows from '../helpers/Shadows';
import appStyles from '../screens/appStyles';

function AppBackground({
  children,
  title,
  back = false,
  menu = false,
  dot = false,
  nav = '',
  rightIcon = appIcons.notification,
  marginHorizontal = true,
  childrenContainerStyle = {},
  rightIconNav = () => {
    NavService.navigate('Notification');
  },
  notification = false,
  group = false,
  onDotPress,
  backgroundColor,
  close,
  onClosePress,
  onBack,
  appLogo = true
}) {
  return (
    <View style={{ flex: 1,backgroundColor:colors.white }}>

      <View
        style={{
          marginTop: Platform.OS === 'ios' ? getStatusBarHeight() * 2.0 : getStatusBarHeight() * 1.4,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 14,

        }}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Keyboard.dismiss()
              nav.length
                ? NavService.navigate(nav)
                : back
                  ? NavService.goBack()
                  : onBack ?
                    onBack()
                    : NavService.openDrawer();
            }}
            style={{
              position: 'absolute',
              alignItems: 'center',
              // backgroundColor: menu || back || onBack ? colors.primary : 'transparent',
              borderRadius: menu ? 10 : 0,
              left: 3,
              width: 45,
              height: 45,
              justifyContent: 'center',
              borderRadius: 30,
              // ...Shadows.shadow3,
            }}>
            {back && (
              <Image
                source={appIcons.back}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  // tintColor: colors.white,
                }}
              />
            )}
            {onBack && (
              <Image
                source={appIcons.back}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: colors.white,
                }}
              />
            )}
            {menu && (
              <Image
                source={appIcons.menu}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  left: 5
                  // tintColor: colors.white,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            {appLogo && <Image source={appLogos.appLogo} style={{ width: 64, height: 32, resizeMode: "contain", marginTop: Platform.OS === 'ios' ? 10 : 0 }} />}

            {title && <Text
              style={{
                color: colors.white,
                fontSize: size.normal,
                marginTop: Platform.OS === 'ios' ? 10 : 0,
              
              }}>
              {title}
            </Text>}
          </View>
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Notification');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 23,
                  height: 23,
                  resizeMode: 'contain',
                  // tintColor: colors.yellow
                }}
              />
            </TouchableOpacity>
          )}
          {dot && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onDotPress}
              style={{
                position: 'absolute',
                right: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,

              }}>
              <Image
                source={appIcons.dots}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  transform: [{ rotateX: '45deg' }, { rotateZ: '90deg' }],
                }}
              />
            </TouchableOpacity>
          )}
          {close && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.goBack()}
              style={{
                position: 'absolute',
                right: 20,
                width: 35,
                height: 35,
                ...appStyles.alignCenter,
                ...appStyles.justifyCenter,
                backgroundColor: colors.primary,
                borderRadius: 100

              }}>
              <Image
                source={appIcons.close}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  tintColor: colors.white
                  // transform: [{ rotateX: '45deg' }, { rotateZ: '90deg' }],
                }}
              />
            </TouchableOpacity>
          )}
        </>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 17 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  );
}

export default AppBackground;
