import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, Text, View} from "react-native";
import HeartIcon from "../icons/HeartIcon";
import BackIcon from "../icons/BackIcon";
import ProfileIcon from "../icons/ProfileIcon";
import MessagesIcon from "../icons/MessagesIcon";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 5,
        marginBottom: 5,
        backgroundColor: "#FFF",
        borderBottomWidth: 1,
        borderBottomColor: '#B9E4DE'
    },
    utilRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rightSide: {
        flex: 1,
        alignItems: 'flex-end'
    },
    title: {
        flex: 3,
        paddingHorizontal: 5
    },
    titleText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    }
});

export default class Header extends Component {

    render() {
        // const goBack = () => Actions.pop();
        const goToProfile = () => Actions.profile();

        return (
            <View style={styles.container}>
                <View style={styles.utilRow}>
                    <MessagesIcon/>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                <View style={styles.rightSide}>
                    <ProfileIcon onPress={goToProfile} />
                </View>
            </View>
        );
    }
};