import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    }
});

const Loading = ({size}) => {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={size || 'large'}/>
        </View>
    );
};

export default Loading;