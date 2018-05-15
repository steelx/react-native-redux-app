
import firebase from 'firebase';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import ImageUpload from './ImageUpload';

const getDateFromMs = (ms) => {
    let _ms = typeof ms === "string" ? Number(ms) : ms;
    let dd = new Date(_ms);
    return ms ? dd.toString() : '-';
};

/**
* @augments {Component<{
    thumbnail:string.isRequired,
    displayName:string.isRequired,
    location:string.isRequired,
    photo:string.isRequired,
    uid:string.isRequired,
    loading:boolean.isRequired,
    setProfileLocation:Function,
    lastSeen:string.isRequired >}
*/
export default class ProfileComponent extends Component {

    static propTypes = {
        thumbnail: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        loading: PropTypes.bool,
        setProfileLocation: PropTypes.func,
        lastSeen: PropTypes.string.isRequired
    }

    render() {
        const { thumbnail, displayName, location, photo, uid, loading, setProfileLocation, lastSeen } = this.props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: thumbnail }} />
                        <Body>
                            <Text>{displayName}</Text>
                            <Text note>{location}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: photo }} style={{ height: 300, width: 300, flex: 1 }} />
                </CardItem>
                <CardItem cardBody>
                    <ImageUpload firebase={firebase} uid={uid} disabled={loading} />
                </CardItem>
                <CardItem>
                    {setProfileLocation ?
                        <Left>
                            <Button
                                onPress={() => setProfileLocation({ location: '13,37', uid: uid })}
                                disabled={loading} transparent>
                                <Icon active name="thumbs-up" />
                                <Text>Set location</Text>
                            </Button>
                        </Left> : null
                    }

                    <Right>
                        <Text note>last seen: {getDateFromMs(lastSeen)}</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}