import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Form, Item, Label, Input, Icon } from 'native-base';
import styles from './styles';
import NavHeader from '../common/NavHeader';

import { signInUser, clearState, facebookLogin } from '../../store/actions/auth.actions';

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
    }

    handleFormSubmit(props) {
        const { email, password } = this.state;

        this.setState({ errors: validate({ email, password }) }, (state) => {
            if (this.state.errors.valid !== false) {
                this.props.signInUser({ email, password });
            }
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const { email, password, errors } = this.state;

        return (
            <Container style={styles.container}>
                <NavHeader title="Sign in" hideIcons={true} />
                <Content>
                    <Form>
                        <Item floatingLabel error={errors.email === true}>
                            <Label>Email</Label>
                            <Input value={email} onChangeText={(val) => this.setState({ email: val })} />
                        </Item>

                        <Item floatingLabel error={errors.password === true}>
                            <Label>Password</Label>
                            <Input value={password} onChangeText={(val) => this.setState({ password: val })} />
                            <Icon name='checkmark-circle' />
                        </Item>

                        {this.props.auth.error ?
                            <Item error style={{ paddingVertical: 20 }}>
                                <Text>{this.props.auth.error}</Text>
                            </Item> : null
                        }
                        <Item last style={{ paddingVertical: 20 }}>
                            <Button onPress={this.handleFormSubmit} full disabled={this.props.auth.loading}>
                                <Text>Login</Text>
                            </Button>
                        </Item>
                        <Item last style={{ paddingVertical: 5, borderBottomColor: 'transparent' }}>
                            <Text>OR</Text>
                        </Item>
                        <Item style={{ borderBottomColor: 'transparent' }}>
                            <Button onPress={() => this.props.facebookLogin()}>
                                <Text>Login with Facebook</Text>
                            </Button>
                        </Item>

                        <Item last style={{ paddingVertical: 5, borderBottomColor: 'transparent' }}>
                            <Text>Don't have an account?</Text>
                        </Item>
                        <Item style={{ borderBottomColor: 'transparent' }}>
                            <Button onPress={() => Actions.signup()}>
                                <Text>Click here to sign up</Text>
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
        signInUser, clearState, facebookLogin
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
