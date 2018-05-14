import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import NavHeader from '../common/NavHeader';
import ImageUpload from '../common/ImageUpload';

import { setProfileLocation, getProfileLocation, offProfileLocation } from '../../store/actions/profile.actions';

const getDateFromMs = (ms) => {
    let _ms = typeof ms === "string" ? Number(ms) : ms;
    let dd = new Date(_ms);
    return ms ? dd.toString() : '-';
};

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {auth} = this.props;
        if (auth && auth.hasOwnProperty('user')) {
            this.props.getProfileLocation({uid: auth.user.uid});
        }
    }

    componentWillUnmount() {
        const {auth} = this.props;
        this.props.offProfileLocation({uid: auth.user.uid});
    }

    render() {
        const {auth, profile, title} = this.props;

        return (
            <Container>
                <NavHeader title={title} />
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: auth.user.photoURL || profile.thumbnail }} />
                                <Body>
                                    <Text>{auth.user.displayName}</Text>
                                    <Text note>{profile.location}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{ uri: profile.photo }} style={{ height: 300, width: 300, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody>
                            <ImageUpload firebase={firebase} uid={auth.user.uid} disabled={profile.loading} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button 
                                    onPress={() => this.props.setProfileLocation({location: '13,37', uid: auth.user.uid})}
                                    disabled={profile.loading}
                                    transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>Set location</Text>
                                </Button>
                            </Left>
                            
                            <Right>
                                <Text>last login @ {getDateFromMs(auth.user.metadata.b)}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({ auth, profile }) {
    return { auth, profile }
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    /* code change */
    return bindActionCreators({
        setProfileLocation,
        getProfileLocation,
        offProfileLocation
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);