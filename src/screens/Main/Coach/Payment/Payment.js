import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import AppBackground from '../../../../components/AppBackground';
import styles from './styles';
import CustomButton from '../../../../components/CustomButton';
import {appIcons} from '../../../../assets';
import appStyles from '../../../appStyles';
import {colors} from '../../../../utils';
import Img from '../../../../components/Img';
import ConfirmationModal from '../../../../containers/Popup/ConfirmationModal/ConfirmationModal';
import AddCard from '../../../../containers/Popup/CardAdd/CardAdd';
import NavService from '../../../../helpers/NavService';
import Toast from 'react-native-toast-message';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      isSelected1: false,
      isSelected2: false,
      isSelected3: false,
      modalVisible: false,
      modalVisible1: false,
      isModalVisible: '',
      methods: [
        {
          icon: appIcons.masterCard,
          title: '5454',
        },
        {
          icon: appIcons.visaCard,
          title: '4242',
        },
        {
          icon: appIcons.masterCard,
          title: '5454',
        },
        {
          icon: appIcons.visaCard,
          title: '4242',
        },
      ],
    };
  }

  render() {
    const {
      isSelected,
      isSelected1,
      isSelected2,
      isSelected3,
      modalVisible,
      isModalVisible,
      modalVisible1,
      methods,
    } = this.state;
    const callback = item => {
      const {methods} = this.state;
      this.setState({methods: item});
    };
    const {screenName, screen} = this?.props?.route?.params;
    console.log('screen', screen);

    return (
      <AppBackground back title={'Card Details'} marginHorizontal={false}>
        <View style={styles.cont}>
          <View>
            <FlatList
              data={methods}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: '1%'}}
              renderItem={({item}) => {
                const lastNumber = item?.cardHolderNumber?.slice(0, 4);
                console.log('itemitem', item?.cardHolderNumber?.slice(0, 4));
                return (
                  <View style={[styles.flexRow, styles.paymentCont]}>
                    <View style={[styles.flexRow]}>
                      <Img
                        local
                        src={
                          lastNumber
                            ? lastNumber == '5454' || '4444'
                              ? appIcons.masterCard
                              : appIcons.visaCard
                            : item.icon
                        }
                        style={styles.paymentIcon}
                      />
                      <Text style={styles.paymentTitle}>
                        **** **** **** {lastNumber ? lastNumber : item.title}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({isSelected: item});
                      }}>
                      <Img
                        local
                        src={
                          isSelected == item
                            ? appIcons.radioSelected
                            : appIcons.radioUnSelected
                        }
                        style={styles.radioBtn}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}></FlatList>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => this.setState({isModalVisible: true})}>
            <Text style={styles.newCardTitle}>Add New Card</Text>
          </TouchableOpacity>
          <CustomButton
            title={'Pay Now'}
            buttonStyle={styles.btn}
            onPress={() =>
              isSelected
                ? screen == 'Adds'
                  ? this.setState({modalVisible1: !this.state.modalVisible1})
                  : this.setState({modalVisible: !this.state.modalVisible})
                : Toast.show({
                    text1: 'Please Select Card',
                    type: 'error',
                    visibilityTime: 3000,
                  })
            }
          />
          <ConfirmationModal
            isModalVisible={modalVisible}
            togglePopup={() =>
              this.setState({modalVisible: !this.state.modalVisible})
            }
            packageSubsMsg
            Title={'Congratulation!'}
            SubTitle={'You have subscribe Gold Package Plan'}
            btnTitle1={'Continue'}
            onPress1={() => {
              screenName == 'GroupCheckout'
                ? NavService.navigate('CreateGroup')
                : NavService.navigate('BottomTabs', {screen: 'Home'});
              this.setState({modalVisible: false});
            }}
            titleStyle={{
              ...appStyles.font17,
            }}
          />
          <ConfirmationModal
            isModalVisible={modalVisible1}
            togglePopup={() =>
              this.setState({modalVisible1: !this.state.modalVisible1})
            }
            // close
            logout
            Title={'Congratulations!'}
            SubTitle={'Your Ad has been successfully created.'}
            btnTitle={'Go To Ads'}
            onPress={() => {
              this.setState({modalVisible1: !this.state.modalVisible1});
              setTimeout(() => {
                NavService.navigate('MyAdds');
              }, 850);
            }}
            onPress2={() => {
              NavService.navigate('BottomTabs', {
                screen: 'Home',
              });
            }}
            btnTitle2={'Back To Home'}
          />
          <AddCard
            callback={callback}
            methods={methods}
            isModalVisible={isModalVisible}
            currentfocus={this}
          />
        </View>
      </AppBackground>
    );
  }
}

export default Payment;
