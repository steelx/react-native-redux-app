import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Container, Content, Item, Spinner, Text} from 'native-base';
import UserCard from '../common/UserCard';

import {getUsers, loadUsers} from '../../store/actions/home.actions';
import Header from "../common/layout/Header";
import Footer from "../common/layout/Footer";
import Loading from "../common/Loading";
import Section from "../common/layout/Section";

class HomePage extends Component {
    static propTypes = {
        routes: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUsers();
    }

    render() {
        const {loadUsers, home, profile} = this.props;
        let lastUser = home.users[home.users.length - 1];
        return (
            <Container>
                <Header title='Fingerrr'/>

                <Content>
                    {
                        home.users.length ?
                            home.users.map(user => <UserCard key={user.uid} {...user} />)
                            : null
                    }

                    <Section style={{borderBottomColor: 'transparent', flex: 1}}>
                        {
                            home.loading ? <Loading/> :
                                <Button onPress={() => loadUsers(lastUser.uid, profile)} disabled={home.loading}
                                        bordered dark full>
                                    <Text>Load users</Text>
                                </Button>
                        }
                    </Section>
                </Content>

                <Footer/>
            </Container>
        );
    }
}

function mapStateToProps({home, profile}) {
    return {home, profile};
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers, loadUsers
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
