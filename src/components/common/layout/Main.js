
import React, {Component} from 'react';
import {View} from "react-native";

export default class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                {this.props.children}
            </View>
        );
    }
}