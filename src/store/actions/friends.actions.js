import firebase from "firebase";
import {Actions} from "react-native-router-flux";

export const GET_FRIENDS_INIT = "GET_FRIENDS_INIT";
export const GET_FRIENDS_SUCCESS = "GET_FRIENDS_SUCCESS";
export const GET_FRIENDS_ERROR = "GET_FRIENDS_ERROR";
export const GET_FRIENDS_OFF = "GET_FRIENDS_OFF";

export const SEND_MESSAGE_DONE = "SEND_MESSAGE_DONE";
export const SEND_MESSAGE_ERROR = "SEND_MESSAGE_ERROR";

export const GET_MESSAGES_INIT = "GET_MESSAGES_INIT";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_ERROR = "GET_MESSAGES_ERROR";



/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const getFriends = (uid) => async (dispatch) => {
    dispatch({type: GET_FRIENDS_INIT});

    const friendsRef = firebase.database().ref(`friends/${uid}/friends`);
    friendsRef.off();

    try {
        const friendsSnap = await friendsRef.limitToLast(10).once('value');
        const friendsUidArray = Object.keys(friendsSnap.val());

        const friends = await Promise.all(friendsUidArray.map(async (uid) => {
            return await findUserByUid(uid);
        }));

        dispatch( { type: GET_FRIENDS_SUCCESS, payload: friends });
    } catch (e) {
        console.log("getFriends ERROR ===> ", e);
        dispatch({type: GET_FRIENDS_ERROR, payload: e.code});
    }
};

async function findUserByUid(uid) {
    const userRef = firebase.database().ref(`users/${uid}`);
    const user = await userRef.once('value');
    return user.val();
}

export const getFriendsReceived = (uid) => async (dispatch) => {
    dispatch({type: GET_FRIENDS_INIT});

    const friendsReceivedRef = firebase.database().ref(`friends/${uid}/received`);
    friendsReceivedRef.off();

    try {
        const friendsReceived = await friendsReceivedRef.limitToLast(10).once('value');
        dispatch( { type: GET_FRIENDS_SUCCESS, payload: Object.keys(friendsReceived.val()) });
    } catch (e) {
        console.log("getFriendsReceived ERROR ===> ", e);
        dispatch({type: GET_FRIENDS_ERROR, payload: e.code});
    }
};

export const getFriendsOff = (uid) => (dispatch) => {
    const friendsRef = firebase.database().ref(`friends/${uid}/friends`);
    const friendsReceivedRef = firebase.database().ref(`friends/${uid}/received`);
    friendsRef.off();
    friendsReceivedRef.off();
    dispatch({type: GET_FRIENDS_OFF});
};



/**
 |--------------------------------------------------
 | Messages
 |--------------------------------------------------
 */
export const sendMessage = (message, from, to) => async (dispatch) => {
    /**
     * Message template
     * {
            _id: 1, // message id
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2, // uid of who sent message
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        }
     */

    let messagesRef = firebase.database().ref('messages');
    const usersWithMessagesfromRef = firebase.database().ref(`usersWithMessages/${from}`);
    const usersWithMessagesToRef = firebase.database().ref(`usersWithMessages/${to}`);
    messagesRef.off();
    usersWithMessagesfromRef.off();
    usersWithMessagesToRef.off();
    // Create a new ref
    try {
        console.log("sendMessage createdAt: ", message.createdAt);
        const key = messagesRef.push().key;
        await messagesRef.child(key).set({...message, timestamp: new Date(message.createdAt).getTime()});
        usersWithMessagesfromRef.update({[key]: true});
        usersWithMessagesToRef.update({[key]: true});
        dispatch( { type: SEND_MESSAGE_DONE});
    } catch (e) {
        console.log("sendMessage ERROR: ", e);
        dispatch( { type: SEND_MESSAGE_ERROR});
    }
};

export const getUserMessages = (uid) => async (dispatch) => {
    dispatch({type: GET_MESSAGES_INIT});

    try {
        const messagesKeys = await userWithMessagesKeys(uid);
        const messages = await Promise.all(messagesKeys.map(async key => {
            const messageRef = firebase.database().ref(`messages/${key}`);
            const messageSnap = await messageRef.once('value');
            const message = messageSnap.val();
            message.createdAt = new Date(message.timestamp);
            return {[key]: message}
        }));
        dispatch({type: GET_MESSAGES_SUCCESS, payload: Object.assign({}, ...messages)});
    } catch (e) {
        dispatch({type: GET_MESSAGES_ERROR, payload: e.code});
    }
};

export const userWithMessagesKeys = async (uid) => {
    const userMessagesRef = firebase.database().ref(`usersWithMessages/${uid}`);
    const userMessagesSnap = await userMessagesRef.once('value');
    return Object.keys(userMessagesSnap.val());
};

async function userWithMessagesON() {
    const userMessagesRef = firebase.database().ref(`usersWithMessages/${uid}`);
    const userMessages = [];

    await userMessagesRef.on('child_added', async (snapshot) => {

    });

    return userMessages;
}