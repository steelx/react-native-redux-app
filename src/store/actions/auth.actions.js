import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const signInUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST });

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch({ type: SIGN_IN_SUCCESS, payload: user });
            Actions.home();
        })
        .catch((error) => { dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); });
};

export const signUpUser = ({ username, firstname, lastname, email, password }) => (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            firebase.database().ref('users').child(user.uid)
                .set({ firstname, lastname, username })
                .then(() => {
                    dispatch({ type: SIGN_UP_SUCCESS, payload: user });
                    Actions.home();
                });
        })
        .catch((error) => { dispatch({ type: SIGN_UP_FAILURE, payload: authFailMessage(error.code) }); });
};

export const clearState = () => (
    { type: SET_INITIAL_STATE }
);

export const signOutUser = () => (dispatch) => {
    dispatch({ type: SET_INITIAL_STATE });

    firebase.auth().signOut();
};


export const authFailMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Email is invalid.';
        case 'auth/user-disabled':
            return 'User is disabled.';
        case 'auth/user-not-found':
            return 'User not found.';
        case 'auth/wrong-password':
            return 'Password is invalid.';
        case 'auth/email-already-in-use':
            return 'Email address is already in use.';
        case 'auth/weak-password':
            return 'Password is not strong enough.';
        default:
            return 'Authentication failed.';
    }
};
