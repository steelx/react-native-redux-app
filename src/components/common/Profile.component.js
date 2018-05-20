import firebase from 'firebase';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Image} from 'react-native';
import {Body, Card, CardItem, Item, Left, Right, Text, Thumbnail} from 'native-base';
import ImageUpload from './ImageUpload';
import HeartIcon from "./icons/HeartIcon";

const getDateFromMs = (ms) => {
    let dd = new Date(ms);
    return ms ? dd.toString() : '-';
};

export default class ProfileComponent extends Component {

    static propTypes = {
        isPrivate: PropTypes.bool,
        thumbnail: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
        photo: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        lastSeen: PropTypes.string
    };

    render() {
        const { thumbnail, displayName, location, photo, uid,
            loading, lastSeen, isPrivate, uploadImageAsync } = this.props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: thumbnail }} />
                        <Body>
                            <Text>{displayName}</Text>
                            <Text note>{loading ? 'Receiving location...' : `${location.latitude} :: ${location.longitude}` }</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    { loading ? <Item><Text>please wait..</Text></Item>
                        : <Image source={{ uri: photo }} style={{ height: 300, width: 300, flex: 1 }} /> }
                </CardItem>
                {isPrivate ?
                    <CardItem cardBody>
                        <ImageUpload firebase={firebase} uid={uid} uploadImageAsync={uploadImageAsync} loading={loading} />
                    </CardItem> : null
                }
                {lastSeen ?
                    <CardItem>
                        <Left>
                            <Text note>last seen: {getDateFromMs(lastSeen)}</Text>
                        </Left>
                        <Right>
                            <HeartIcon />
                        </Right>
                    </CardItem> : null
                }
            </Card>
        );
    }
}