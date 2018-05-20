import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, Text, View} from "react-native";
import HeartIcon from "../icons/HeartIcon";
import BackIcon from "../icons/BackIcon";
import ProfileIcon from "../icons/ProfileIcon";
import MessagesIcon from "../icons/MessagesIcon";
import HomeIcon from "../icons/HomeIcon";
import FavoritesIcon from "../icons/FavoritesIcon";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: '#B9E4DE'
    },
    utilRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rightSide: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

export default class Footer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.utilRow}>
                    <HomeIcon onPress={() => Actions.home()} />
                    <FavoritesIcon />
                </View>
                <View style={styles.rightSide}>
                    <ProfileIcon onPress={() => Actions.profile()} />
                </View>
            </View>
        );
    }
};