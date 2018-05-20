import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {clearState, facebookLogin, signInUser} from '../../store/actions/auth.actions';
import {clearProfile} from '../../store/actions/profile.actions';
import {clearUsers} from '../../store/actions/home.actions';

import {Button, Text} from 'native-base';
import {View} from "react-native";
import Loading from "../common/Loading";
import Main from "../common/layout/Main";
import Section from "../common/layout/Section";
import BackgroundImage from "../common/BackgroundImage";

class Signin extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearState();
        this.props.clearUsers();
        this.props.clearProfile();
    }

    render() {
        const { auth, profile } = this.props;
        const source = require('../../../assets/splash.png');
        return (
            <Main>
                <Section>
                    <BackgroundImage source={source}>
                        { auth.loading || profile.loading ? <Loading /> : null }
                    </BackgroundImage>
                </Section>
                <View style={{position: 'absolute', bottom: 3, left: 0, right:0}}>
                    <Button onPress={() => this.props.facebookLogin()}
                            disabled={auth.loading || profile.loading} primary full>
                        <Text>Login with Facebook</Text>
                    </Button>
                </View>
            </Main>
        );
    }
}


function mapStateToProps({ auth, profile }) {
    return { auth, profile }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signInUser, clearState, facebookLogin, clearProfile, clearUsers
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
