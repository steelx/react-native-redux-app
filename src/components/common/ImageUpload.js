// import firebase from 'firebase';
import React from 'react';
import {
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Constants, ImagePicker} from 'expo';
import uuid from 'uuid';

export default class ImageUpload extends React.Component {
    state = {
        image: null,
        uploading: false,
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    onPress={this._pickImage} disabled={this.props.loading}
                    title="Pick an image"
                />

                {/* <Button onPress={this._takePhoto} title="Take a photo" /> */}

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

    _share = () => {
        Share.share({
            message: this.state.image,
            title: 'Check out this photo',
            url: this.state.image,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
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

async function uploadImageAsync(uri, uid, firebase) {
    console.log("uploadImageAsync uri", uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("blob", blob);
    const ref = firebase
        .storage()
        .ref()
        .child(`users/${uid}/${uuid.v4()}`);
    // console.log("ref", ref);
    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
}
