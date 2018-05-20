import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeartIcon from "./icons/HeartIcon";

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
                    <Left>
                        <Text>&nbsp;</Text>
                    </Left>
                    <Right>
                        <HeartIcon />
                    </Right>
                </CardItem>
            </Card>
        );
    }
}