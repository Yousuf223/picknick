import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { appImages } from '../../assets/index';
import NavService from '../../helpers/NavService';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from './styles';
import AppNavigation from '../../routes/appStack/userStack';
import AuthNavigation from '../../routes/Auth/authNavigation';

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNavigation: false,
        };
        this.locationTimeInterval = null;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ showNavigation: true });
        }, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.locationTimeInterval);
    }

    render() {
        const { user } = this.props;
        const { showNavigation } = this.state;

        if (!showNavigation) {
            return (
                <ImageBackground style={{ flex: 1 }} source={appImages.splash}></ImageBackground>
            );
        }

        return (
                <View style={{ flex: 1 }}>
                    {user ? (
                        <AppNavigation initialRoute="Home" /> // Change "Home" to your initial route
                    ) : (
                        <AuthNavigation initialRoute="Login" /> // Change "Login" to your initial route
                    )}
                </View>
        );
    }
}

function mapStateToProps({ authReducer: { user }, appReducer: { socket } }) {
    return {
        user,
        socket,
    };
}

export default connect(mapStateToProps, null)(Splash);
