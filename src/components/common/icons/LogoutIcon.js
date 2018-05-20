
import React, {Component} from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import {TouchableNativeFeedback, View} from "react-native";

export default class LogoutIcon extends Component {

    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                background={TouchableNativeFeedback.Ripple()}
            >
                <View>
                    <Ionicons name='md-power' size={32} color="red" style={{marginLeft: 10}} />
                </View>
            </TouchableNativeFeedback>

        );
    }
}