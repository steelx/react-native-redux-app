import React from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import {StyleSheet, View, Platform} from "react-native";
import Layout from "../../utils/Layout";

export default class Map extends React.Component {
    static propTypes = {
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        name: PropTypes.string.isRequired
    };

    render() {
        const {latitude, longitude, name} = this.props;
        if(latitude === undefined || longitude === undefined) {
            return null;
        }
        return (
            <View style={[styles.card, styles.mapContainer]}>
                <MapView
                    cacheEnabled={Platform.OS === 'android'}
                    style={styles.map}
                    loadingBackgroundColor="#f9f5ed"
                    loadingEnabled={false}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09
                    }}
                >
                    <MapView.Marker coordinate={{ latitude, longitude }} title={name} />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: 150,
        width: Layout.window.width
    },
    card: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E8E8E8',
        backgroundColor: '#fff',
    },
    mapContainer: {
        marginTop: 15,
    }
});
