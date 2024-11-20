import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Keyboard } from "react-native";
import AppBackground from "../../../../components/AppBackground";
import styles from "./styles";
import Img from "../../../../components/Img";
import { appIcons } from "../../../../assets";
import { colors } from "../../../../utils";
import appStyles from "../../../appStyles";
import CustomButton from "../../../../components/CustomButton";
import SearcherModal from "../../../../containers/Popup/SearcherModal/SearcherModal";

class MyEarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            modalVisible: false,
        };
    };

    render() {
        const { searchText, modalVisible } = this.state;

        const SearchData = async text => {
            Keyboard.dismiss();
            this.setState({ searchText: text });
            console.log(text);
            this.setState({ searchList: [] });
        };

        return (
            <AppBackground
                back
                title={"My Earning"}
                marginHorizontal={false}
            >
                <View style={styles.cont}>
                    <View style={styles.earningCont}>
                        <Img
                            local
                            style={styles.dollarIcon}
                            src={appIcons.dollar}
                            resizeMode={'contain'}
                            tintColor={colors.white}
                        />
                        <Text style={styles.earning}>2563.60</Text>
                        <Text style={styles.totalTitle}>Total Earning</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[styles.flexRow, styles.searchCont]}
                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    >
                        <Text style={styles.searchTitle}>Search here</Text>
                        <Img
                            local
                            style={styles.searchIcon}
                            src={appIcons.search}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>


                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{ paddingTop: 10 }}
                        data={[1, 2, 3, 4, 5, 6, 7]}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.flexRow, styles.listCont]}>
                                    <View>
                                        <Text style={[styles.earning, { ...appStyles.font15 }]}>Session Name ABC</Text>
                                        <Text style={styles.date}>Feb 08, 2023</Text>
                                    </View>
                                    <CustomButton
                                        title={"$250.00"}
                                        buttonStyle={styles.btn}
                                        textStyle={styles.btnTitle}
                                    />
                                </View>
                            );
                        }} />
                </View>
                <SearcherModal
                    isModalVisible={modalVisible}
                    togglePopup={() => this.setState({ modalVisible: !this.state.modalVisible })}
                    Title={"Search By Date"}
                    onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                />
            </AppBackground>
        );
    }
};

export default MyEarning;