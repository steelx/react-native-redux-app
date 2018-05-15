import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Form, Item, Label, Input, Icon } from 'native-base';
import styles from './styles';
import NavHeader from '../common/NavHeader';

import { signInUser, clearState, facebookLogin } from '../../store/actions/auth.actions';
import {clearProfile} from '../../store/actions/profile.actions';
import {clearUsers} from '../../store/actions/home.actions';

const validate = (props) => {
    const errors = {};
    const fields = ['email', 'password'];

    fields.forEach((f) => {
        if (!(f in props) || props[f] === '') {
            errors[f] = true;
            errors.valid = false;
        } else {
            errors[f] = false;
        }
    });

    return errors;
};

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillMount() {
        this.props.clearState();
        this.props.clearUsers();
        this.props.clearProfile();
    }

    handleFormSubmit(props) {
        const { email, password } = this.state;

        this.setState({ errors: validate({ email, password }) }, (state) => {
            if (this.state.errors.valid !== false) {
                this.props.signInUser({ email, password });
            }
            Keyboard.dismiss();
        });
    }

    render() {
        const { handleSubmit, auth } = this.props;
        const { email, password, errors } = this.state;

        return (
            <Container style={styles.container}>
                <NavHeader title="Login" hideIcons={true} />
                <Content>
                    <Form>
                        <Item style={{ borderBottomColor: 'transparent' }}>
                            <Button onPress={() => this.props.facebookLogin()} disabled={auth.loading}>
                                <Text>Login with Facebook</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}


function mapStateToProps({ auth }) {
    return { auth }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signInUser, clearState, facebookLogin, clearProfile, clearUsers
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
