import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Title, Content, Footer, FooterTab,
    Button, Left, Right, Body, Icon, Text
} from 'native-base';

import NavHeader from './components/common/NavHeader';
import FooterBottom from './components/common/FooterBottom';

import { setTitle } from './store/actions/home.actions';

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
                <NavHeader title={this.props.title} onLeftPress={() => Actions.signin()} />
                <Content>
                    <Text>
                        This is Content Section @Home {this.props.home.title}
                    </Text>
                    <Button onPress={() => this.props.setTitle('new home title')}>
                        <Text>update title</Text>
                    </Button>
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
        setTitle
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
