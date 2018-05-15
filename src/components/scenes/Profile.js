import firebase from 'firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Container, Header, Content } from 'native-base';
import NavHeader from '../common/NavHeader';
import ProfileComponent from '../common/Profile.component';

import { setProfileLocation, getProfileLocation, offProfileLocation } from '../../store/actions/profile.actions';

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
        const {auth, profile, title, setProfileLocation} = this.props;

        return (
            <Container>
                <NavHeader title={title} />
                <Content>
                    <ProfileComponent 
                        thumbnail={auth.user.photoURL || profile.thumbnail}
                        displayName={auth.user.displayName} location={profile.location} photo={profile.photo} 
                        uid={auth.user.uid} loading={profile.loading || auth.loading} setProfileLocation={setProfileLocation} lastSeen={auth.user.metadata.b} />
                    
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