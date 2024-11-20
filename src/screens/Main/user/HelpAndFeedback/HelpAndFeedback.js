import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import {colors} from '../../../../utils';
import CustomButton from '../../../../components/CustomButton';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import NavService from '../../../../helpers/NavService';
import {appIcons} from '../../../../assets';
import Img from '../../../../components/Img';
import CustomImagePicker from '../../../../components/CustomImagePicker';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';

class HelpAndFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: '',
      image: [],
      hideImage: false,
    };
  }

  onSubmit = () => {
    const {subject, message} = this.state;
    if (!subject) {
      Toast.show({
        text1: 'Subject field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!message) {
      Toast.show({
        text1: 'Message field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Toast.show({
        text1: 'Feedback noted successfully',
        type: 'success',
        visibilityTime: 3000,
      });
      NavService.goBack();
    }
  };

  render() {
    const {subject, message, image, hideImage} = this.state;

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
        this.setState({image: mergeImagesWithExistingGalleryAssets});
      } else {
        const getExistingGalleryAssets = [...image];
        const imageObject = {
          uri: path,
          name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
          type: mime,
          tempType: type,
        };
        getExistingGalleryAssets.push(imageObject);
        this.setState({image: getExistingGalleryAssets});
      }
    };

    const removeSelectedAsset = asset => {
      const assetsWithoutTheCurrentAsset = image.filter(
        item => item.uri !== asset,
      );
      this.setState({image: assetsWithoutTheCurrentAsset});
    };

    const handelClose = image => {
      const deleteImage = galleryAssets.filter(item => item?.uri !== image);
      this.setState({galleryAssets: deleteImage});
    };
    const callBackForGalleryAssets = galleryAssets => {
      console.log('galleryAssets', galleryAssets);
      this.setState({galleryAssets});
    };

    return (
      <AppBackground title={'Help & Feedback'} back marginHorizontal={false}>
        <View style={styles.cont}>
          <TextInput
            maxLength={30}
            style={styles.Input}
            blurOnSubmit={true}
            placeholder={'Subject'}
            placeholderTextColor={colors.lightGray1}
            value={subject}
            onChangeText={value => this.setState({subject: value})}
          />
          <TextInput
            maxLength={275}
            style={[styles.Input, {height: 250, paddingTop: 15}]}
            textAlignVertical="top"
            multiline
            editable
            blurOnSubmit={true}
            placeholder={'Type your message here...'}
            placeholderTextColor={colors.lightGray1}
            value={message}
            onChangeText={value => this.setState({message: value})}
          />
          <View style={{flexDirection:"row"}}>
          <CustomImagePicker
            isMultiple={true}
            onImageChange={(path, mime, type) => {
              updateImageInGallery(path, mime, type);
            }}
            style={{justifyContent: 'flex-end'}}>
            <View>
              <View style={styles.imageBtn}>
                <Img
                  local
                  src={appIcons.plus}
                  style={styles.plusIcon}
                  resizeMode={'contain'}
                  tintColor={colors.gray}
                />
              </View>
            </View>
          </CustomImagePicker>
          {image?.length > 0 && (
            <FlatList
              data={image}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              // numColumns={3}
              renderItem={({item, index}) => {
                return (
                  <View>
                    <ImageBackground
                      source={{uri: item?.uri}}
                      style={styles.videoStyle}
                      imageStyle={{borderRadius: 10}}>
                      <TouchableOpacity
                        onPress={() => removeSelectedAsset(item.uri)}
                        style={styles.closeBtn}>
                        <Img
                          local
                          src={appIcons.close}
                          style={styles.closeIcon}
                          tintColor={colors.white}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                );
              }}
            />
          )}
    </View>
          <CustomButton
            title="Submit"
            onPress={this.onSubmit}
            buttonStyle={styles.submitBtn}
            textStyle={styles.submitTitle}
          />
        </View>
      </AppBackground>
    );
  }
}

export default HelpAndFeedback;
