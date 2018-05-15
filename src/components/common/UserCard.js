import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class UserCard extends Component {
    render() {
        const {thumbnail, displayName, location, photo, uid, lastSeen} = this.props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{displayName}</Text>
                            <Text note>{location}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem onPress={() => Actions.otherprofile({thumbnail, displayName, location, photo, uid, lastSeen})} cardBody>
                    <Image source={{ uri: photo }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
            </Card>
        );
    }
}