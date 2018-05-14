import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class UserCard extends Component {
    render() {
        const {displayName, photo, location} = this.props;

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
                <CardItem cardBody>
                    <Image source={{ uri: photo }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
            </Card>
        );
    }
}