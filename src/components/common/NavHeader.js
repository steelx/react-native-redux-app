import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class NavHeader extends Component {
    
    render() {
        const {title, onLeftPress, onRightPress, hideIcons, hideLeft} = this.props;
        const signOut = () => {firebase.auth().signOut(); Actions.signin();};
        const leftFunc = onLeftPress ? onLeftPress : signOut;
        const rightFunc = onRightPress ? onRightPress : () => Actions.pop();
        return (
            <Header style={{marginTop: 20}}>
                <Left>
                    {!hideIcons || !hideLeft ?
                        <Button transparent onPress={leftFunc}>
                            { onLeftPress ? <Icon name='arrow-back' /> : <Icon name='log-out' />}
                        </Button> : null
                    }
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {!hideIcons ? <Button transparent onPress={rightFunc}>
                        { onRightPress ? <Icon name='md-woman' /> : <Text>Back</Text>}
                    </Button> : null}
                </Right>
            </Header>
        );
    }
};