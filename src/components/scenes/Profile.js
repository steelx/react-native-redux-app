import firebase from "firebase";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content} from 'native-base';
import {Actions} from "react-native-router-flux";

import {getProfile, offGetProfile, setProfileLocation, uploadImageAsync} from '../../store/actions/profile.actions';
import Map from "../common/Map";
import {View} from "react-native";
import ProfileComponent from '../common/Profile.component';
import LogoutIcon from "../common/icons/LogoutIcon";
import Header from "../common/layout/Header";

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
            this.props.getProfile({ uid: auth.user.uid });
        }
    }

    componentWillUnmount() {
        const { auth } = this.props;
        this.props.offGetProfile({ uid: auth.user.uid });
    }

    logout() {
        firebase.auth().signOut();
        Actions.auth();
    }

    render() {
        const { auth, profile, uploadImageAsync, title } = this.props;

        return (
            <Container>
                <Header title={title} />
                <Content>
                    <ProfileComponent
                        isPrivate={true}
                        uploadImageAsync={uploadImageAsync}
                        thumbnail={auth.user.photoURL || profile.thumbnail}
                        displayName={auth.user.displayName} location={profile.location} photo={profile.photo}
                        uid={auth.user.uid} loading={profile.loading || auth.loading} />

                    <Map name={auth.user.displayName} {...profile.location} />

                    <View style={{flex: 1, margin: 20, alignItems: 'center'}}>
                        <LogoutIcon onPress={() => this.logout()} />
                    </View>
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