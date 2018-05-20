import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View,} from 'react-native';
import {ImagePicker} from 'expo';
import Button from '../common/layout/Button';

export default class ImageUpload extends React.Component {
    state = {
        image: null,
        uploading: false,
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button raised label="Upload an image" onPress={this._pickImage} disabled={this.props.loading} />

                {this._maybeRenderUploadingOverlay()}

                <StatusBar barStyle="default"/>
            </View>
        );
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading || this.props.loading) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 200,
                            flex: 1
                        },
                    ]}>
                    <ActivityIndicator color="#fff" animating size="large"/>
                </View>
            );
        }
    };


    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {
        try {
            this.setState({uploading: true});

            if (!pickerResult.cancelled) {
                this.props.uploadImageAsync(pickerResult.uri, this.props.uid, this.props.firebase);
                // this.setState({image: uploadUrl});
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({uploading: false});
        }
    };
}
