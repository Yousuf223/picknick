import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { appLogos } from '../../assets';
import CustomBackground from '../../components/CustomBackground';
import CustomButton from '../../components/CustomButton';
import NavService from '../../helpers/NavService';
import { colors, size, family } from '../../utils';
import { connect } from 'react-redux';
import styles from './styles';
import AppNavigation from '../../routes/appStack/userStack';
import AuthNavigation from '../../routes/Auth/authNavigation';

class AppStarter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    setTimeout(() => {
    }, 10);
    loaderStopWithDispatch();
    Orientation.lockToPortrait();
  }
  componentWillUnmount() {
    clearInterval(this.locationTimeInterval);
  }
  render() {
    return (
      <CustomBackground >
        <View style={{
          height: '100%', alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image style={styles.applogo} source={appLogos.appLogo} />
        </View>

      </CustomBackground>
    );
  }
}

function mapStateToProps({ authReducer: { user }, appReducer: { socket } }) {
  return {
    user,
    socket,
  };
}

export default connect(mapStateToProps, null)(AppStarter);


