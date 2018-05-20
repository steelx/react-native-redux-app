
import React, {Component} from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import {TouchableNativeFeedback, View} from "react-native";

export default class HeartIcon extends Component {

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.Ripple()}
            >
                <View style={{padding: 5, margin: 10}}>
                    <Ionicons name='md-heart' size={32} color="red" />
                </View>
            </TouchableNativeFeedback>
        );
    }
}