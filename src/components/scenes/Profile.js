import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import NavHeader from '../common/NavHeader';

import { setTitle } from '../../store/actions/home.actions';

class Profile extends Component {
  render() {
    return (
      <Container>
        <NavHeader title={this.props.title} onLeftPress={() => Actions.signin()} />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'user thumb'}} />
                <Body>
                  <Text>User full name</Text>
                  <Text note>currunt location</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'user image'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent disabled={true}>
                  <Icon active name="thumbs-up" />
                  <Text>Set location</Text>
                </Button>
              </Left>

              <Right>
                <Text>last online 11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth }
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    /* code change */
    return bindActionCreators({
        setTitle
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);