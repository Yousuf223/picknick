import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import CustomButton from "../../../../components/CustomButton";
import { colors } from "../../../../utils";
import MyFriends from "./TabbarComponents/MyFriends/MyFriends";
import AppBackground from "../../../../components/AppBackground";
import Request from "./TabbarComponents/Request/Request";

class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    };

    render() {
        const { index } = this.state;

        return (
            <AppBackground
                title={"Friends"}
                back
                marginHorizontal={false}
            >
                <View style={styles.cont}>
                    <View style={[styles.flexRow, styles.BtnView]}>
                        <CustomButton
                            title="Friends"
                            onPress={() => this.setState({ index: 0 })}
                            buttonStyle={[styles.buttonStyle,
                            {
                                borderBottomColor: index == 0 ? colors.primary : colors.lightGray
                            }]}
                            textStyle={[styles.btnTitle,
                            {
                                color: index == 0 ? colors.white : colors.lightGray1
                            }]}
                        />
                        <CustomButton
                            title="Request"
                            onPress={() => this.setState({ index: 1 })}
                            buttonStyle={[styles.buttonStyle,
                            {
                                borderBottomColor: index == 1 ? colors.primary : colors.lightGray
                            }]}
                            textStyle={[styles.btnTitle,
                            {
                                color: index == 1 ? colors.white : colors.lightGray1
                            }]}
                        />
                    </View>
                    {
                        index == 0
                            ? <MyFriends />
                            : <Request />
                    }
                </View>
            </AppBackground>
        );
    }
};

export default MyGroups; 