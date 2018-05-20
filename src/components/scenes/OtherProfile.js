import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import NavHeader from '../common/NavHeader';
import ProfileComponent from '../common/Profile.component';
import Map from "../common/Map";


class OtherProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {thumbnail, displayName, location, photo, uid, lastSeen} = this.props;
        return (
            <Container>
                <NavHeader hideLeft title={displayName} />
                <Content>
                    <ProfileComponent 
                        thumbnail={thumbnail}
                        displayName={displayName} location={location} photo={photo} 
                        uid={uid} loading={false} lastSeen={lastSeen} />
                    <Map name={displayName} {...location} />
                </Content>
            </Container>
        );
    }
}

export default OtherProfile;
