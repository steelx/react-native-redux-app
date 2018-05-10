import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Text, Form, Item, Label, Input } from 'native-base';
import styles from './styles';
import NavHeader from '../common/NavHeader';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    // this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;
    // this.props.signUpUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container style={styles.container}>
          <NavHeader title="Sign in" hideIcons={true} />
          <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input />
                </Item>

                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input />
                </Item>

                <Item last style={{ paddingVertical: 20 }}>
                  <Button onPress={this.handleFormSubmit} full>
                    <Text>Sign-in</Text>
                  </Button>
                </Item>

                <Item style={{ paddingVertical: 5, borderBottomColor: 'transparent' }}>
                  <Text>Already have an account?</Text>
                </Item>
                <Item  style={{ borderBottomColor: 'transparent' }}>
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

const validate = (props) => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};

// Signup.propTypes = propTypes;

export default Signup;
