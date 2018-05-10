import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import firebase from 'firebase';

export default class NavHeader extends Component {
    
    render() {
        const {title, onLeftPress, hideIcons} = this.props;
        const signOut = () => {firebase.auth().signOut(); Actions.auth();};
        return (
            <Header style={{marginTop: 20}}>
                <Left>
                    {!hideIcons ? <Button transparent onPress={onLeftPress ? onLeftPress : signOut}>
                        <Icon name='arrow-back' />
                    </Button> : null}
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {!hideIcons ? <Button transparent onPress={() => console.log('Right')}>
                        <Icon name='menu' />
                    </Button> : null}
                </Right>
            </Header>
        );
    }
};