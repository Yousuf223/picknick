import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import AppBackground from "../../../../components/AppBackground";
import { appIcons, appImages } from "../../../../assets";
import { colors } from "../../../../utils";
import appStyles from "../../../appStyles";
import { TouchableOpacity } from "react-native";
import Img from "../../../../components/Img";
import CustomButton from "../../../../components/CustomButton";
import styles from "./styles";
import NavService from "../../../../helpers/NavService";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: [
                {
                    icon: appIcons.notification,
                    type: "alarm",
                    heading: "Session Reminder",
                    content: "Your session will be start in 2 minutes",
                    createdat: "Jan, 05, 20233",
                },
                {
                    icon: appIcons.notification,
                    type: "reminder",
                    heading: "Session Reminder",
                    content: "Your session will be start on tomorrow Feb 11,2023 at 06:00 am",
                    createdat: "Jan, 05, 20233",
                },
                {
                    icon: appImages.user,
                    type: "request",
                    heading: "Smith John",
                    content: "Accept your friend request",
                    createdat: "Jan, 05, 20233",
                },
                {
                    icon: appImages.user,
                    type: "friend request",
                    heading: "Smith John",
                    content: "Accept your friend request",
                    createdat: "Jan, 05, 20233",
                },
                {
                    heading: "Lorem ipsum dolor sit amet",
                    content: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    createdat: "Jan, 05, 20233",
                },
                {
                    heading: "Lorem ipsum dolor sit amet",
                    content: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    createdat: "Jan, 05, 20233",
                },
                {
                    heading: "Lorem ipsum dolor sit amet",
                    content: "Lorem ipsum dolor sit amet consectetur adipis cing elit te, nisl inceptos.",
                    createdat: "Jan, 05, 20233",
                },
            ],
        };
    };

    render() {
        const { notificationList } = this.state;
        return (
            <AppBackground
                back
                title={"Notification"}
                marginHorizontal={false}
            >
                <View style={styles.cont}>
                    <FlatList
                        data={notificationList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[styles.flexRow, styles.notiCont]}
                                >
                                    {(item.icon && item.type) ?
                                        (item.type == "request" || item.type == "friend request")
                                            ? <View style={[styles.flexRow, { alignSelf: item.type == "friend request" ? "flex-start" : "center" }]}>
                                                <Img
                                                    local
                                                    src={appIcons.userPlaceholder}
                                                    style={styles.profileImage}
                                                    resizeMode={"contain"}
                                                />
                                            </View>
                                            :
                                            <View style={styles.bellCont}>
                                                <Img
                                                    local
                                                    src={item.icon}
                                                    style={styles.bellIcon}
                                                    tintColor={colors.yellow}
                                                    resizeMode={"contain"}
                                                />
                                            </View>
                                        : null
                                    }
                                    <View style={[{
                                        width: (item.icon && item.type) ? "80%" : undefined,
                                        marginLeft: (item.icon && item.type) ? 15 : 0,
                                    }]}>
                                        <View style={[styles.flexRow, { ...appStyles.justifySpaceBetween }]}>
                                            <Text style={styles.notiheader}>{item.heading}</Text>
                                            {
                                                !item.type == "alarm" &&
                                                <Text style={[styles.noticontent, {
                                                    ...appStyles.family_Oswald_Regular
                                                }]}>{item.createdat}</Text>
                                            }
                                        </View>
                                        <View style={[styles.flexRow, {
                                            ...appStyles.justifySpaceBetween
                                        }]}>
                                            <Text style={[styles.noticontent, {
                                                width: item.type == "alarm" ? "55%" : undefined,
                                            }]}>{item.content}</Text>
                                            {
                                                item.type == "alarm" &&
                                                <CustomButton
                                                    title="Join Now"
                                                    buttonStyle={styles.joinBtn}
                                                    textStyle={styles.btnTitle}
                                                    onPress={() => NavService.navigate("LiveSession")}
                                                />
                                            }
                                        </View>

                                        {
                                            item.type == "friend request" &&
                                            <View style={[styles.flexRow, styles.btnCont]}>
                                                <CustomButton
                                                    title="Accept"
                                                    buttonStyle={styles.btn}
                                                    textStyle={styles.btnTitle}
                                                />
                                                <CustomButton
                                                    title="Ignore"
                                                    buttonStyle={styles.btn}
                                                    textStyle={styles.btnTitle}
                                                />
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </AppBackground>
        );
    };
};

export default Notification;