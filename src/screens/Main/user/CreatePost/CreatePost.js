import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView, Platform
} from 'react-native';
import { connect } from 'react-redux';
import AppBackground from '../../../../components/AppBackground';
import NavService from '../../../../helpers/NavService';
import { appIcons, appImages } from '../../../../assets';
import { colors } from '../../../../utils';
import styles from './style';
import CustomButton from '../../../../components/CustomButton';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,

} from 'react-native-compressor';
import CustomVideoPicker from '../../../../components/CustomVideoPicker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { createPost } from '../../../../redux/actions/appAction';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      image: [],
      video: [],
    };
  };

  onSubmit = () => {
    const { description, image, video } = this.state;
    if (description == '' && image.length == 0 && video.length == 0) {
      Toast.show({
        text1: 'Please post something',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (image.length > 10) {
      Toast.show({
        text1: 'Images cannot exceed from 10',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else {
      const payload = new FormData();
      console.log('image-payloadd', image)
      console.log('videooos-payloadd', video)
      payload.append('description', description);
      if (image.length > 0) {
        image.map(item => {
          delete item?.tempType
          payload.append('post_images', item);
        });
      }
      if (video.length > 0) {
        video.map(item => {
          delete item?.tempType
          payload.append('post_videos', item);
        });
      }
      this?.props?.createPost(payload)
      console.log('payload-of-create-post', payload)
      setTimeout(() => {
        NavService.navigate('BottomTabs', { name: 'Home' })
      },3500)
    }
  };

  render() {
    const { description, image, video } = this.state;
    const params = this.props.route.params;

    const updateImageInGallery = async (path, mime, type) => {
      console.log('path', path);
      let multipleImages = [];
      if (Array.isArray(path)) {
        const arr = path?.map(async item => {
          const result = await ImageCompressor.compress(item.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          console.log('result', item);
          let imageObject = {
            uri: result,
            name: `image${Date.now()}${item?.filename}.${item?.mime.slice(
              item?.mime.lastIndexOf('/') + 1,
            )}`,
            type: item?.mime,
            tempType: 'image',
          };
          multipleImages.push(imageObject);
        });
        await Promise.all(arr);
        console.log('arr', arr);
        const mergeImagesWithExistingGalleryAssets = [
          ...image,
          ...multipleImages,
        ];
        this.setState({ image: mergeImagesWithExistingGalleryAssets });
      } else {
        const getExistingGalleryAssets = [...image];
        const imageObject = {
          uri: path,
          name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
          type: mime,
          tempType: type,
        };
        getExistingGalleryAssets.push(imageObject);
        this.setState({ image: getExistingGalleryAssets });
      }
    };
    const removeSelectedAsset = asset => {
      const assetsWithoutTheCurrentAsset = image.filter(
        item => item.uri !== asset,
      );
      this.setState({ image: assetsWithoutTheCurrentAsset });
    };
    const removeSelectedAsset1 = asset => {
      const assetsWithoutTheCurrentAsset = video.filter(
        item => item !== asset,
      );
      this.setState({ video: assetsWithoutTheCurrentAsset });
    };
    const updateVideoInGallery = async (path, mime, type) => {
      // console.log('path', path);
      let multipleImages = [];
      if (Array.isArray(path)) {
        const arr = path?.map(async item => {
          let imageObject = {
            uri: item.path,
            name: `video${Date.now()}${item?.filename}.${item?.mime.slice(
              item?.mime.lastIndexOf('/') + 1,
            )}`,
            type: item?.mime,
            tempType: 'video',
          };
          multipleImages.push(imageObject);
        });
        await Promise.all(arr);
        const mergeImagesWithExistingGalleryAssets = [
          ...video,
          ...multipleImages,
        ];
        console.log(
          'mergeImagesWithExistingGalleryAssets',
          mergeImagesWithExistingGalleryAssets,
        );
        this.setState({ video: mergeImagesWithExistingGalleryAssets });
      } else {
        const getExistingGalleryAssets = [...video];
        const imageObject = {
          uri: path,
          name: `video${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
          type: mime,
          tempType: type,
        };
        getExistingGalleryAssets.push(imageObject);
        this.setState({ video: getExistingGalleryAssets });
      }
    };
    return (
      <AppBackground
        title={'Create Post'}
        onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })}
        onVideoPress={() => togglePopUp()}
        marginHorizontal={false}>
        <View>
          <ScrollView
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: 10,
              marginHorizontal: 10,
              paddingRight: Platform.OS === 'android' ? 36 : 25,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <>
              {image?.length > 0 &&
                image?.map((item, index) => {
                  console.log('item', item);
                  return (
                    <View key={index + 1} style={{ position: 'relative' }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => removeSelectedAsset(item.uri)}
                          style={styles.crossContainer}>
                          <Text style={styles.cross}>X</Text>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={{ uri: item?.uri }}
                        style={styles.videoStyle}
                      />
                    </View>
                  );
                })}
              {video?.length > 0 &&
                video?.map((item, index) => {
                  console.log('item', item);
                  return (
                    <View key={index + 1} style={{ position: 'relative' }}>
                      <View>
                        <TouchableOpacity
                          onPress={() => removeSelectedAsset1(item)}
                          style={styles.crossContainer}>
                          <Text style={styles.cross}>X</Text>
                        </TouchableOpacity>
                      </View>
                      <Image
                        source={appImages.post1}
                        style={styles.videoStyle}
                      />
                    </View>
                  );
                })}
            </>
          </ScrollView>
          <TextInput
            maxLength={275}
            style={styles.dec}
            textAlignVertical="top"
            multiline
            editable
            blurOnSubmit={true}
            placeholder={'Write something.'}
            placeholderTextColor={colors.lightGray1}
            value={description}
            onChangeText={value => this.setState({ description: value })}
          />
        </View>

        <View style={styles.row}>
          <CustomImagePicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateImageInGallery(path, mime, type);
              // if (type == 'video') {
              //   // this.setState({video: path});
              //   // this.setState({videoMime: mime});
              //   // this.setState({type: type});
              //   updateVideoInGallery(path, mime, type);
              // } else {
              //   // this.setState({image: path});
              //   // this.setState({Imagemime: mime});
              //   // this.setState({type: type});
              //   updateImageInGallery(path, mime, type);
              // }
            }}
            style={{ justifyContent: 'flex-end' }}>
            {image.length < 10 && (
              <View style={styles.rowIcons}>
                <Image style={styles.icons} source={appIcons.photos} />
                <Text style={styles.title}>Photos</Text>
              </View>
            )}
          </CustomImagePicker>
          <CustomVideoPicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateVideoInGallery(path, mime, type);
            }}
            style={{ justifyContent: 'flex-end' }}>
            {video.length == 0 && (
              <View style={styles.rowIcons}>
                <Image style={styles.icons} source={appIcons.videos} />
                <Text style={styles.title}>Videos</Text>
              </View>
            )}

          </CustomVideoPicker>
        </View>
        {params &&
          params?.screenName == "GroupName"
          ? <View style={[styles.flexRow, [styles.bottomBtnsView]]}>
            <CustomButton
              title={"Create Session"}
              buttonStyle={[styles.bottomBtn, { backgroundColor: colors.black }]}
              textStyle={styles.btnTitle}
              onPress={() => NavService.navigate("CreateSession")}
            />
            <CustomButton
              title={'Post'}
              buttonStyle={styles.bottomBtn}
              textStyle={styles.btnTitle}
              onPress={() => NavService.goBack()}
            />
          </View>
          : <CustomButton
            onPress={this.onSubmit}
            title="Post"
          />
        }

      </AppBackground>
    );
  }
}
const actions = { createPost };
export default connect(null, actions)(CreatePost);
