import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content} from 'native-base';
import {Location, Permissions} from 'expo';

import NavHeader from '../common/NavHeader';
import ProfileComponent from '../common/Profile.component';

import {getProfile, offGetProfile, setProfileLocation, uploadImageAsync} from '../../store/actions/profile.actions';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gpsLocation: null
        };
    }

    componentDidMount() {
        const { auth } = this.props;
        if (auth && auth.hasOwnProperty('user')) {
            this.getLocationAsync();
            this.props.getProfile({ uid: auth.user.uid });
        }
    }

    componentWillUnmount() {
        const { auth } = this.props;
        this.props.offGetProfile({ uid: auth.user.uid });
    }

    getLocationAsync = async () => {
        const { auth, setProfileLocation } = this.props;
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        setProfileLocation({ location, uid: auth.user.uid });
    };

    render() {
        const { auth, profile, title, uploadImageAsync } = this.props;

        return (
            <Container>
                <NavHeader title={title} />
                <Content>
                    <ProfileComponent
                        isPrivate={true}
                        uploadImageAsync={uploadImageAsync}
                        thumbnail={auth.user.photoURL || profile.thumbnail}
                        displayName={auth.user.displayName} location={profile.location} photo={profile.photo}
                        uid={auth.user.uid} loading={profile.loading || auth.loading} lastSeen={auth.user.metadata.lastSignInTime} />

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
        getProfile,
        offGetProfile,
        uploadImageAsync
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);