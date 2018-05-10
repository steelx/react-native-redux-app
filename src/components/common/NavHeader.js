import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

export default class NavHeader extends Component {
    
    render() {
        const {title, onLeftPress, hideIcons} = this.props;
        return (
            <Header style={{marginTop: 20}}>
                <Left>
                    {!hideIcons ? <Button transparent onPress={onLeftPress}>
                        <Icon name='arrow-back' />
                    </Button> : null}
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {!hideIcons ? <Button transparent>
                        <Icon name='menu' />
                    </Button> : null}
                </Right>
            </Header>
        );
    }
};