import React, { Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {sendMessage, userWithMessagesKeys} from "../../store/actions/friends.actions";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Hello',
                    createdAt: new Date(),
                    user: {
                        _id: this.props.uid,
                        name: this.props.displayName,
                        avatar: this.props.thumbnail,
                    },
                },
            ],
            loading: false
        };
    }
    getMessageFormated(message, otherUser) {
        const {_id, text, timestamp, user} = message;

        if (user._id === otherUser.uid) {
            user['name'] = otherUser.displayName;
            user['avatar'] = otherUser.thumbnail;
        }
        return {_id, text, user, createdAt: new Date(timestamp)};
    }
    async componentWillMount() {
        this.setState({loading: true});
        try {
            const {uid, displayName, thumbnail} = this.props;
            const allMessages = this.props.friends.messages;
            const keys = await userWithMessagesKeys(uid);
            const messages = keys.map((key) => {
                return this.getMessageFormated(allMessages[key], {uid, displayName, thumbnail});
            });
            this.setState({
                messages,
                loading: false
            });
        } catch (e) {
            this.setState({loading: false});
        }
    }
    onSend(messages = []) {
        const from = this.props.auth.user.uid, to = this.props.uid;
        const lastMessage = messages.slice(-1).pop();
        this.props.sendMessage(lastMessage, from, to);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        const loading = [
            {
                _id: 1,
                text: 'Loading...',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: this.props.displayName,
                    avatar: this.props.thumbnail,
                },
            },
        ];
        return (
            <GiftedChat
                messages={this.state.loading ? loading : this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.props.auth.user.uid,
                }}
            />
        )
    }
}


function mapStateToProps({friends, auth}) {
    return {friends, auth};
}

// Maps `dispatch` to `props`:
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendMessage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);