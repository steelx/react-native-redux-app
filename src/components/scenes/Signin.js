import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Container, Content, Form, Item} from 'native-base';
import styles from './styles';
import NavHeader from '../common/NavHeader';

import {clearState, facebookLogin, signInUser} from '../../store/actions/auth.actions';
import {clearProfile} from '../../store/actions/profile.actions';
import {clearUsers} from '../../store/actions/home.actions';
import Button from "../common/layout/Button";

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
        const { auth } = this.props;

        return (
            <Container style={styles.container}>
                <NavHeader title="Login" hideIcons={true} />
                <Content>
                    <Form>
                        <Item style={{ borderBottomColor: 'transparent' }}>
                            <Button onPress={() => this.props.facebookLogin()}
                                    label="Login with Facebook"
                                    disabled={auth.loading} />
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
