import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Form, Item, Label, Input, Icon } from 'native-base';
import styles from './styles';
import NavHeader from '../common/NavHeader';

import { signUpUser, clearState } from '../../actions/auth.actions';

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password', 'username'];

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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      errors: {}
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearState();
  }

  handleFormSubmit() {
    const {
      username, firstname, lastname, email, password
    } = this.state;

    this.setState({ errors: validate({ username, firstname, lastname, email, password }) }, (state) => {
      if (this.state.errors.valid !== false) {
        this.props.signUpUser({ username, firstname, lastname, email, password });
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const {
      username, firstname, lastname, email, password, errors
    } = this.state;

    return (
      <Container style={styles.container}>
        <NavHeader title="Sign in" hideIcons={true} />
        <Content>
          <Form>
            <Item floatingLabel error={errors.username === true}>
              <Label>Username</Label>
              <Input value={username} onChangeText={(val) => this.setState({ username: val })} />
            </Item>

            <Item floatingLabel>
              <Label>First name</Label>
              <Input value={firstname} onChangeText={(val) => this.setState({ firstname: val })} />
            </Item>

            <Item floatingLabel>
              <Label>Last name</Label>
              <Input value={lastname} onChangeText={(val) => this.setState({ lastname: val })} />
            </Item>

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
                <Text>Sign-up</Text>
              </Button>
            </Item>

            <Item style={{ paddingVertical: 5, borderBottomColor: 'transparent' }}>
              <Text>Already have an account?</Text>
            </Item>
            <Item style={{ borderBottomColor: 'transparent' }}>
              <Button onPress={() => Actions.signin()}>
                <Text>Click here to Login</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

// Signup.propTypes = propTypes;

function mapStateToProps({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUpUser, clearState
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
