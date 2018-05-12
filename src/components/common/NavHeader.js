import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class NavHeader extends Component {
    
    render() {
        const {title, onLeftPress, hideIcons} = this.props;
        const signOut = () => {firebase.auth().signOut(); Actions.signin();};
        return (
            <Header style={{marginTop: 20}}>
                <Left>
                    {!hideIcons ? <Button transparent onPress={onLeftPress ? onLeftPress : signOut}>
                        { onLeftPress ? <Icon name='arrow-back' /> : <Text>Logout</Text>}
                    </Button> : null}
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {!hideIcons ? <Button transparent onPress={() => Actions.pop()}>
                        <Text>Back</Text>
                    </Button> : null}
                </Right>
            </Header>
        );
    }
};