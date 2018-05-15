import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
    Container, Content, Button, Text, Item
} from 'native-base';

import NavHeader from './components/common/NavHeader';
import FooterBottom from './components/common/FooterBottom';
import UserCard from './components/common/UserCard';

import { getUsers } from './store/actions/home.actions';

class Main extends Component {
    static propTypes = {
        routes: PropTypes.object,
    };

    constructor(props) {
        super(props);
        // console.log("props", props);
    }

    render() {
        return (
            <Container>
                <NavHeader title={this.props.title} onRightPress={() => Actions.profile()} />
                <Content>

                    {
                        this.props.home.users.length ?
                            this.props.home.users.map(user => <UserCard key={user.uid} {...user} />)
                            : null
                    }


                    <Item>
                        <Button onPress={() => this.props.getUsers()}>
                            <Text>Load users</Text>
                        </Button>
                    </Item>
                </Content>
                <FooterBottom />
            </Container>
        );
    }
}

function mapStateToProps({ home }) {
    return { home }
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    /* code change */
    return bindActionCreators({
        getUsers
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
