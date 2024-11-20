import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, FlatList} from 'react-native';
import Img from '../../../components/Img';
import CustomModal from '../../../components/CustomModal';
import CustomButton from '../../../components/CustomButton';
import {appIcons} from '../../../assets';
import {colors, size} from '../../../utils';
import appStyles from '../../../screens/appStyles';
import {ASSETS_URL} from '../../../config/WebService';
import {friendList} from '../../../redux/actions/appAction';
import {useDispatch} from 'react-redux';

function HomeShareModal(props) {
  const {
    isModalVisible = false,
    currentfocus,
    postID,
    item,
    togglePopup = () => {},
    onPress1,
  } = props;
  console.log('ItemInShareMyModalNewConsole', item);
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('');
  const [reciverId, setReciverId] = useState('');
  const getFriendList = () => {
    dispatch(
      friendList(null, response => {
        console.log('resposnoffriendLIstInHomeShare', response);
        setList(response);
      }),
    );
  };
  const shareThisPost = () => {
    console.log('ItemInShareThisPost', item);
    let payload = {
      receiver_id: reciverId,
      post_id: postID,
      shareType: 'post',
      type: 'others',
    };
    togglePopup(payload)
    // dispatch(sharePostOrStory(payload));
    // setTimeout(() => {
    //   currentfocus.setState({isModalVisible: false});
    // }, 850);

    console.log('SHARETHISPOSTONLY', payload);
  };
  useEffect(() => {
    getFriendList();
  }, []);
  console.log('listlistlistlistlistlistlist', list);
  console.log('selectedselectedselected', selected);
  console.log('postIDpostIDpostIDpostID', postID)
  return (
    <CustomModal
      visible={isModalVisible}
      togglePopup={togglePopup}
      style={styles.modal}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={togglePopup} style={styles.closeBtn}>
          <Img
            local
            src={appIcons.close}
            style={styles.closeIcon}
            tintColor={colors.primary}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={[styles.flexRow]}>
          <Img
            local
            src={
              item?.user_image
                ? {uri: ASSETS_URL + item?.user_image}
                : appIcons.userPlaceholder
            }
            style={styles.profileImage}
            resizeMode={'contain'}
          />
          <View>
            <Text numberOfLines={1} style={styles.username}>
              {item?.name}
            </Text>
          </View>
        </View>

        <View style={[styles.flexRow, styles.messageView]}>
          <Img
            local
            src={appIcons.message}
            style={styles.messageIcon}
            resizeMode={'contain'}
          />
          <View>
            <Text style={styles.username}>Send in Message</Text>
          </View>
        </View>

        <FlatList
          data={list}
          horizontal
          contentContainerStyle={styles.contentCont}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log('InsideHooooooooooooo', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item?._id);
                  setReciverId(item?.friend_details?._id);
                }}
                style={{
                  alignItems: 'center',
                }}>
                <Img
                  local
                  src={
                    item?.friend_details?.user_image
                      ? {uri: ASSETS_URL + item?.friend_details?.user_image}
                      : appIcons.userPlaceholder
                  }
                  style={[
                    styles.userImage,
                    {
                      borderWidth: 2,
                      borderColor: colors.primary,
                    },
                  ]}
                  resizeMode={'contain'}
                />
                <Text style={styles.username}>
                  {item?.friend_details?.name}
                </Text>

                <TouchableOpacity
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor:
                      selected == item?._id
                        ? colors?.primary
                        : colors.lightGray,
                  }}></TouchableOpacity>
              </TouchableOpacity>
            );
          }}
          //   ListFooterComponent={() => {
          //     return (
          //       <TouchableOpacity activeOpacity={0.9} style={styles.dotBtn}>
          //         <Img
          //           local
          //           src={appIcons.dots}
          //           style={styles.dotIcon}
          //           resizeMode={'contain'}
          //           tintColor={colors.white}
          //         />
          //       </TouchableOpacity>
          //     );
          //   }}
        />
        <CustomButton
          title={'Share Now'}
          buttonStyle={styles.btn}
          textStyle={styles.btnTitle}
          onPress={() => shareThisPost()}
        />
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    ...appStyles.w100,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  modalView: {
    ...appStyles.w100,
    ...appStyles.justifyCenter,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  closeBtn: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },

  closeIcon: {
    width: 13,
    height: 13,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 100,
  },

  username: {
    maxWidth: 100,
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_Oswald_Medium,
    marginHorizontal: 10,
  },

  messageView: {
    marginVertical: 10,
    marginHorizontal: 5,
  },

  messageIcon: {
    width: 20,
    height: 20,
  },

  userImage: {
    width: 48,
    height: 48,
    borderRadius: 100,
    marginHorizontal: 5,
  },

  dotBtn: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  dotIcon: {
    width: 20,
    height: 20,
  },

  contentCont: {
    marginVertical: 5,
  },

  btn: {
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
  },

  btnTitle: {
    ...appStyles.font14,
    ...appStyles.family_Oswald_Regular,
  },
});

export default HomeShareModal;
