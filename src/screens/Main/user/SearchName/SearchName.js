import React, { Component } from 'react';
import {
    FlatList,
    View,
    Image,
    Text,
    TouchableOpacity,
    Keyboard,
    TextInput,
} from 'react-native';
import styles from './styles';
import AppBackground from '../../../../components/AppBackground';
import NavService from '../../../../helpers/NavService';
import { appIcons, appImages } from '../../../../assets';
import { colors } from '../../../../utils';
import { searchUsers } from '../../../../redux/actions/appAction';
import { connect } from 'react-redux';
import moment from 'moment';
import Img from '../../../../components/Img';
import CustomTextInput from '../../../../components/CustomTextInput';
import { ASSETS_URL } from '../../../../config/WebService';

class SearchName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchUsers: []
        };
    }
    searchUsers = (params) => {
        this?.props.searchUsers(params, response => {
            console.log('responseeeeeofsearchusers', response)
            this.setState({ searchUsers: response })
        })
    }
    render() {
        const { searchText, searchUsers } = this.state;
        console.log('searchUserssearchUsers', searchUsers)
        let payload = {
            name: searchText
        }

        return (
            <AppBackground
                title={'Search By Name'}
                onBack={() => NavService.navigate('BottomTabs', { name: 'Home' })}
                marginHorizontal={false}>

                <View style={styles.viewStyle1}>
                    <CustomTextInput
                        search
                        placeholder={'Search here'}
                        value={searchText}
                        keyboardType={'email-address'}
                        onChangeText={value => this.setState({ searchText: value })}
                        searchIcon={true}
                        containerStyle={styles.containerStyle}
                        mainView={styles.margin}
                        textInputStyle={styles.textInputStyle}
                        onSearch={() => this.searchUsers(payload)}
                    />
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={searchUsers}
                    contentContainerStyle={{ flexGrow: 1, marginTop: 10, paddingBottom: '10%' }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        console.log('iteminsidesearchserrrrs', item)
                        return (
                            <>
                                <TouchableOpacity style={styles.tchStyle1} activeOpacity={0.8} onPress={() => NavService.navigate('OtherProfile', { id: item?._id, itemfrom: item })}>
                                    <View style={styles.viewStyle1}>
                                        <Img
                                            local
                                            src={item?.user_image ? { uri: ASSETS_URL + item?.user_image } : appIcons.userPlaceholder}
                                            style={styles.userImage}
                                        // resizeMode={'contain'}
                                        />
                                    </View>
                                    <View>
                                    <Text style={styles.txt}>{item?.name}</Text>
                                    <Text style={styles.txtUsername}>@{item?.username}</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        );
                    }}></FlatList>
            </AppBackground>
        );
    }
}
const actions = { searchUsers };
export default connect(null, actions)(SearchName);
