import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import Layout from "../../utils/Layout";

export default class BackgroundImage extends Component {
    render() {
        const {source, children} = this.props;
        return (
            <ImageBackground
                style={{
                    flex: 1,
                    height: Layout.window.height, width: Layout.window.width,
                    position: 'absolute',
                    justifyContent: 'center',
                }}
                source={source}
            >
                {children}
            </ImageBackground>
        );
    }
}