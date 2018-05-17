import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

export default class UserCard extends Component {
    render() {
        const { thumbnail, displayName, location, photo, uid, lastSeen } = this.props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{displayName}</Text>
                            <Text note>{location.latitude}/{location.longitude}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <TouchableHighlight onPress={() => Actions.otherprofile({ thumbnail, displayName, location, photo, uid, lastSeen })}>
                    <CardItem cardBody>
                        <Image source={{ uri: photo }} style={{ height: 300, width: null, flex: 1 }} />
                    </CardItem>
                </TouchableHighlight>
                <CardItem footer>
                    <Body>
                        <Button transparent warning>
                            <Ionicons name='md-heart' size={32} color="red" style={{marginLeft: 10}} />
                            <Text>Like</Text>
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}