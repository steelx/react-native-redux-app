
import React, {Component} from 'react';
import Ionicons from "@expo/vector-icons/Octicons";
import {TouchableNativeFeedback, View} from "react-native";

export default class ProfileIcon extends Component {

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.Ripple()}
            >
                <View style={{padding: 5, margin: 10}}>
                    <Ionicons name='kebab-horizontal' size={32} color="black" />
                </View>
            </TouchableNativeFeedback>
        );
    }
}