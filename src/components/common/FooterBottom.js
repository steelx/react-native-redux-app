import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FooterBottom extends Component {
    // state = {}
    render() {
        const {disabled} = this.props;
        return (
            <Footer>
                <FooterTab>
                    <Button badge vertical disabled={disabled}>
                        <Badge><Text>2</Text></Badge>
                        <Icon name="apps" />
                        <Text>Apps</Text>
                    </Button>
                    <Button vertical disabled={disabled}>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button active badge vertical disabled={disabled}>
                        <Badge><Text>51</Text></Badge>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                    </Button>
                    <Button onPress={() => Actions.profile()} vertical disabled={disabled}>
                        <Icon name="person" />
                        <Text>Profile</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
