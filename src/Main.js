import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';
import {
    Container, Content, Button, Text, Item
} from 'native-base';

import NavHeader from './components/common/NavHeader';
import FooterBottom from './components/common/FooterBottom';
import UserCard from './components/common/UserCard';

import {getUsers, loadUsers} from './store/actions/home.actions';

class Main extends Component {
    static propTypes = {
        routes: PropTypes.object,
    };

    constructor(props) {
        super(props);
        // console.log("props", props);
    }

    componentWillMount() {
        this.props.getUsers();
    }

    render() {
        const {loadUsers, home} = this.props;
        let lastUser = home.users[home.users.length - 1];
        return (
            <Container>
                <NavHeader title={this.props.title} onRightPress={() => Actions.profile()}/>

                <Content>
                    {
                        home.users.length ?
                            home.users.map(user => <UserCard key={user.uid} {...user} />)
                            : null
                    }

                    <Item>
                        <Button onPress={() => loadUsers(lastUser.uid)} disabled={home.loading}>
                            <Text>Load users</Text>
                        </Button>
                    </Item>
                </Content>
                <FooterBottom disabled={home.loading} />
            </Container>
        );
    }
}

function mapStateToProps({home}) {
    return {home}
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers, loadUsers
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
