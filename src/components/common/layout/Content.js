
import React, {Component} from 'react';
import {View} from "react-native";

export default class Content extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginBottom: 10}}>
                {this.props.children}
            </View>
        );
    }
}