import React, { Component } from 'react';
import { ListView } from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import { Container, Content, Button, Icon, List, ListItem, Text } from 'native-base';
import Footer from "../common/layout/Footer";
import Header from "../common/layout/Header";
import {getFriends, getFriendsOff, getUserMessages} from "../../store/actions/friends.actions";
import {Actions} from "react-native-router-flux";


class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }
    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.friends];
        newData.splice(rowId, 1);
        // this.setState({ friends: newData });
    }


    componentWillMount() {
        this.props.getUserMessages(this.props.auth.user.uid);
        this.props.getFriends(this.props.auth.user.uid);
    }
    componentWillUnmount() {
        this.props.getFriendsOff(this.props.auth.user.uid);
    }

    render() {
        // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Header title={this.props.friends.loading ? "Please wait..." : "Messages"} />
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.props.friends.friends)}
                        renderRow={user =>
                            <ListItem>
                                <Button onPress={() => Actions.chat({...user})} style={{paddingHorizontal: 20}} transparent success>
                                    <Text>{user.displayName}</Text>
                                </Button>
                            </ListItem>
                        }
                        renderLeftHiddenRow={data =>
                            <Button full onPress={() => alert(data)}>
                                <Icon active name="information-circle" />
                            </Button>
                        }
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                </Content>
                <Footer />
            </Container>
        );
    }
}


function mapStateToProps({friends, auth}) {
    return {friends, auth};
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFriends, getFriendsOff, getUserMessages
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);