import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  Keyboard,
  Text,
  RefreshControl,
  View,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '../../../../utils';
import {appIcons, appImages} from '../../../../assets';
import Img from '../../../../components/Img';
import ProfileImage from '../../../../components/ProfileImage';
import CustomButton from '../../../../components/CustomButton';
import PostCard from '../../../../components/PostCard';
import {
  myPost,
  postGallery,
  like,
  SendRequest,
  profileDetails,
  unFriend,
} from '../../../../redux/actions/appAction';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {ASSETS_URL} from '../../../../config/WebService';
import NavService from '../../../../helpers/NavService';
import {
  loaderStartWithDispatch,
  loaderStopWithDispatch,
} from '../../../../redux/actions/appAction';

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
      searchText: '',
      index: 0,
      post: [
        {
          img: [
            {img: appImages.post},
            {img: appImages.post},
            {img: appImages.post},
          ],
          userImg: appIcons.man,
          userName: 'Willam Roy',
          date: 'Jan, 05, 20233',
          dec: 'Lorem ipsum dolor sit amet consectetur adipiscing elit te,nisl inceptos odio non nam fames ante ',
        },
        {
          img: [{img: appImages.post}],
          join: true,
          userImg: appIcons.man,
          userName: 'Willam Roy',
          date: 'Jan, 05, 20233',
          dec: 'Lorem ipsum dolor sit amet consectetur adipiscing elit te,nisl inceptos odio non nam fames ante ',
        },
      ],

      photosGallery: [
        {
          img: appImages.post1,
        },
        {
          img: appImages.post2,
        },
        {
          img: appImages.post,
        },
        {
          img: appImages.post2,
        },
        {
          img: appImages.post1,
        },
        {
          img: appImages.post,
        },
        {
          img: appImages.post1,
        },
        {
          img: appImages.post2,
        },
        {
          img: appImages.post1,
        },
        {
          img: appImages.post,
        },
        {
          img: appImages.post1,
        },
        {
          img: appImages.post2,
        },
        {
          img: appImages.post1,
        },
        {
          img: appImages.post,
        },
        {
          img: appImages.post,
        },
      ],
      myPost: [],
      postGallery: [],
      refreshingImage: false,
      profileDetails: [],
      refreshing: false,
      selectedLike: '',
    };
  }
  myPost = params => {
    this?.props?.myPost(params, response => {
      console.log('responseresponseresponse', response);
      this.setState({myPost: response});
    });
  };
  profileDetails = params => {
    this?.props?.profileDetails(params, response => {
      console.log('responseinprofiledetailapi', response);
      this.setState({profileDetails: response});
    });
  };
  postGallery = params => {
    this?.props?.postGallery(params, response => {
      this.setState({postGallery: response});
    });
  };
  componentDidMount() {
    const {id} = this?.props?.route?.params;
    console.log('idfromotherscreen', id);
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        let params = {
          user_id: id,
        };
        this?.myPost(params);
        this.postGallery(params);
        this.profileDetails(params);
      },
    );
  }
  render() {
    const {
      index,
      myPost,
      refreshingImage,
      postGallery,
      profileDetails,
      refreshing,
      selectedLike,
    } = this.state;
    const {user} = this?.props;
    console.log('userrrrr', user);
    console.log('profileDetailsprofileDetails', profileDetails);
    const {itemInside, itemfrom} = this?.props?.route?.params;
    const onLikes = index => {
      const {id} = this?.props?.route?.params;
      console.log('indexindex', index);
      let params = {
        post_id: index,
      };
      this?.props?.like(params);
      let payload = {
        user_id: id,
      };
      this?.myPost(payload);
    };
    const onRefreshImage = () => {
      const {id} = this?.props?.route?.params;
      let params = {
        user_id: id,
      };
      this.postGallery(params);
    };
    const onRefresh = () => {
      const {id} = this?.props?.route?.params;
      let params = {
        user_id: id,
      };
      this?.myPost(params);
    };
    const onSendRequest = id => {
      console.log('idinconsoleoffreind', id);
      let payload = {
        reciever_Id: id,
      };
      this.props.SendRequest(payload);
      setTimeout(() => {
        Toast.show({
          text1: 'You request has been send.',
          type: 'success',
          visibilityTime: 3000,
        });
        NavService.goBack();
      }, 850);
    };
    const onUnFriend = id => {
      console.log('idinunfriendfunction', id);
      let payload = {
        request_id: id,
        type: 'unfriend',
      };
      this?.props.unFriend(payload);
      setTimeout(() => {
        NavService.goBack();
      }, 850);
    };

    return (
      <AppBackground
        back
        title={itemInside?.posted_user_details?.name}
        marginHorizontal={false}>
        <View style={styles.cont}>
          <View activeOpacity={0.9} style={styles.card}>
            <View style={[styles.flexRow, styles.cardMainView]}>
              <View style={styles.flexRow}>
                <ProfileImage
                  name={'UserName'}
                  size={45}
                  innerAsset
                  imageUri={
                    profileDetails?.user_image
                      ? {uri: ASSETS_URL + profileDetails?.user_image}
                      : appIcons.userPlaceholder
                  }
                  darwerImg
                  viewStyle={{
                    width: 45,
                    height: 45,
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: colors.blue,
                  }}
                />
                <View style={styles.userDetail}>
                  <Text style={styles.username}>{profileDetails?.name}</Text>
                  <Text style={styles.username1}>@{profileDetails?.username}</Text>
                  {profileDetails?._id == user?._id && (
                  <Text numberOfLines={2} style={styles.city}>{profileDetails?.address}</Text>
                  )}
                </View>
              </View>
              {profileDetails?.request_id == null &&
                profileDetails?._id !== user?._id && (
                  <>
                    <View style={styles.flexRow}>
                      <CustomButton
                        title="Send Request"
                        buttonStyle={styles.createBtn}
                        textStyle={styles.createTitle}
                        onPress={() => onSendRequest(profileDetails?._id)}
                      />
                    </View>
                  </>
                )}
              {profileDetails?.is_friend == 0 && (
                <>
                  <View style={styles.flexRow}>
                    <CustomButton
                      title="Requested"
                      buttonStyle={styles.createBtn}
                      textStyle={styles.createTitle}
                    />
                  </View>
                </>
              )}
              {profileDetails?.is_friend == 1 && (
                <>
                  <View style={styles.flexRow}>
                    <CustomButton
                      title="Unfriend"
                      buttonStyle={styles.createBtn}
                      textStyle={styles.createTitle}
                      onPress={() => onUnFriend(profileDetails?.request_id)}
                    />
                  </View>
                </>
              )}
            </View>
            <View style={styles.detailView}>
              <Text style={styles.username}>About Me</Text>
              <Text style={styles.dec}>{profileDetails?.about}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.btnBarView]}>
            <CustomButton
              title={'All Post'}
              buttonStyle={[
                styles.barBtn,
                {
                  borderBottomWidth: index == 0 ? 5 : 0,
                },
              ]}
              textStyle={styles.createTitle}
              onPress={() => this.setState({index: 0})}
            />
            <CustomButton
              title={'Timeline'}
              buttonStyle={[
                styles.barBtn,
                {
                  width: 100,
                  borderBottomWidth: index == 1 ? 5 : 0,
                  marginLeft: 40,
                },
              ]}
              textStyle={[styles.createTitle]}
              onPress={() => this.setState({index: 1})}
            />
          </View>
          {profileDetails?.is_friend == 1 ||
          profileDetails?.is_profile_private == 0 ||
          user?._id == profileDetails?._id ? (
            <>
              <View>
                {index == 0 ? (
                  <View>
                    <FlatList
                      contentContainerStyle={styles.flatListCont}
                      data={myPost}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                      renderItem={({item, index}) => {
                        console.log('iteminuserprofile', item);
                        return (
                          <>
                            <PostCard
                              dec={item?.description}
                              date={moment(item?.createdAt).format(
                                'MM-DD-YYYY',
                              )}
                              userImg={item?.posted_user_details?.user_image}
                              userName={item?.posted_user_details?.name}
                              image={item?.post_images}
                              item={item}
                              join={item.join}
                              count={selectedLike}
                              imgColor={
                                selectedLike == 1 ? {tintColor: 'red'} : false
                              }
                              onLike={() => onLikes(item?._id)}
                              onPress2={() =>
                                NavService.navigate('Comment', {
                                  item: item?._id,
                                })
                              }
                            />
                          </>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={postGallery}
                    contentContainerStyle={styles.flatListCont}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshingImage}
                        onRefresh={onRefreshImage}
                      />
                    }
                    columnWrapperStyle={{
                      marginHorizontal: 20,
                    }}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      console.log('itemmmmpostgallert', item);
                      return (
                        <>
                          {/* {index == 0 && (
                                            <View style={{
                                                width: 105,
                                                height: 105,
                                                borderColor: colors.lightGray1,
                                                borderWidth: 2,
                                                borderStyle: "dotted",
                                                ...appStyles.alignCenter,
                                                ...appStyles.justifyCenter,
                                                borderRadius: 10
                                            }}
                                            >
                                                <TouchableOpacity onPress={() => NavService.navigate('CreatePost')}>
                                                    <Img
                                                        local
                                                        style={{ width: 15, height: 15 }}
                                                        src={appIcons?.plus}
                                                        resizeMode={"contain"}
                                                        tintColor={colors.lightGray1}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )} */}

                          <Img
                            local
                            style={{width: 105, height: 105, marginVertical: 8}}
                            src={{uri: ASSETS_URL + item?.post_images}}
                            resizeMode={'contain'}
                          />
                        </>
                      );
                    }}></FlatList>
                )}
              </View>
            </>
          ) : (
            <>
              <View style={styles.viewStyle}>
                <Text style={styles.locked}>
                  {profileDetails == '' ? '' : 'This profile is locked'}
                </Text>
              </View>
            </>
          )}
        </View>
      </AppBackground>
    );
  }
}
function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}
const actions = {
  myPost,
  postGallery,
  like,
  SendRequest,
  profileDetails,
  unFriend,
};
export default connect(mapStateToProps, actions)(OtherProfile);
