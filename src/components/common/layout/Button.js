import React, {Component} from 'react';

import {
    Text,
    View,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';

import { StyleSheet } from 'react-native';

const IOS_BLUE = '#007AFF';
const MATERIAL_BLUE = '#2196F3';

const styles = StyleSheet.create({
    button: {
        padding: 20,
        margin: 10,
        width: 200,
    },
    buttonRaised: {
        borderRadius: 2,
        backgroundColor: MATERIAL_BLUE,
        elevation: 3
    },
    buttonFlat: {
        backgroundColor: 'transparent'
    },
    buttonLabel: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonDisabled: {
        color: '#CCC'
    },
    buttonLabelRaised: {
        color: '#FFFFFF',
    },
    buttonLabelFlat: {
        color: MATERIAL_BLUE
    },
});

const ButtonWrapper = ({raised, transparent, onPress, children, disabled}) => {
    if (disabled) {
        return (
            <View style={[styles.button]}>
                {children}
            </View>
        );
    }

    // All Android Buttons should have the ripple effect
    if (Platform.OS === 'android') {
        // Raised Android buttons need a white ripple
        if (raised) {
            return (
                <TouchableNativeFeedback
                    onPress={onPress}
                    background={TouchableNativeFeedback.Ripple('#FFF')}
                >
                    <View style={[styles.button, styles.buttonRaised]}>
                        {children}
                    </View>
                </TouchableNativeFeedback>
            );
        }

        const style = transparent ? styles.buttonFLat : [styles.button, styles.buttonFLat];
        // Normal Android buttons get a gray ripple
        return (
            <TouchableNativeFeedback
                onPress={onPress}
                background={TouchableNativeFeedback.Ripple()}
            >
                <View style={style}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        );
    }
};

class Button extends Component {
    renderLabel() {
        const labelStyles = [styles.buttonLabel];
        if (this.props.raised) {
            labelStyles.push(styles.buttonLabelRaised);
        } else {
            labelStyles.push(styles.buttonLabelFlat);
        }

        let labelText = this.props.label;
        if (Platform.OS === 'android' && labelText) {
            labelText = labelText.toUpperCase();
        }

        if (this.props.disabled) {
            return <Text style={[labelStyles, styles.buttonDisabled]}>{labelText}</Text>;
        }
        return <Text style={labelStyles}>{labelText}</Text>;
    }

    render() {
        return (
            <ButtonWrapper {...this.props}>
                {this.renderLabel()}
            </ButtonWrapper>
        );
    }
}

export default Button;