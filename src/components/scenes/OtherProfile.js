import firebase from 'firebase';
import React, { Component } from 'react';

import { Image } from 'react-native';
import { Container, Header, Content } from 'native-base';
import NavHeader from '../common/NavHeader';
import ProfileComponent from '../common/Profile.component';


class OtherProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {thumbnail, displayName, location, photo, uid, lastSeen} = this.props;

        return (
            <Container>
                <NavHeader title={displayName} />
                <Content>
                    <ProfileComponent 
                        thumbnail={thumbnail}
                        displayName={displayName} location={location} photo={photo} 
                        uid={uid} loading={false} lastSeen={lastSeen} />
                </Content>
            </Container>
        );
    }
}

export default OtherProfile;
