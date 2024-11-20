import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {appImages} from '../../assets/index';
import NavService from '../../helpers/NavService';
import {connect} from 'react-redux';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import UserAppStack from '../../routes/appStack/drawer/drawer'
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavigation: false,
    };
    this.locationTimeInterval = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({showNavigation: true});
    }, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.locationTimeInterval);
  }

  render() {
    const {user} = this.props;

    return (
      <LinearGradient
        colors={['#1656BF', '#1656BF', '#000', '#000']}
        style={{flex: 1}}>
            <UserAppStack/>
        </LinearGradient>
    );
  }
}

function mapStateToProps({authReducer: {user}, appReducer: {socket}}) {
  return {
    user,
    socket,
  };
}

export default connect(mapStateToProps, null)(Demo);
