import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { Actions } from 'react-native-router-flux';
import config from '../../../firebase.config';

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
export const PERMISSION_DENIED = 'PERMISSION_DENIED';
export const FB_LOGIN_FAIL = 'FB_LOGIN_FAIL';
export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';
export const FB_LOGIN_INIT = 'FB_LOGIN_INIT';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const signInUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: SIGN_IN_REQUEST });
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch({ type: SIGN_IN_SUCCESS, payload: user });
            Actions.home();
        })
        .catch((error) => { dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) }); });
};

export const signUpUser = ({ firstname = "", lastname = "", email, password }) => (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST });

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {

            const currentUser = firebase.auth().currentUser;
            currentUser.updateProfile({
                displayName: `${firstname} ${lastname}`
            });
        })
        .catch((error) => { dispatch({ type: SIGN_UP_FAILURE, payload: authFailMessage(error.code) }); });
};

export const clearState = () => (dispatch) => {
    dispatch({ type: SET_INITIAL_STATE });
};

export const signOutUser = () => (dispatch) => {
    dispatch({ type: SET_INITIAL_STATE });
    firebase.auth().signOut();
};


export const facebookLogin = () => async (dispatch) => {
    dispatch({ type: FB_LOGIN_INIT });
    doFacebookLogin(dispatch);
};

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await new Facebook.logInWithReadPermissionsAsync(config.fb_app_id, {
        permissions: ['public_profile', 'email', 'user_gender', 'user_location', 'user_birthday']
    });

    if (type === 'cancel') {
        return dispatch({ type: FB_LOGIN_FAIL, payload: 'USER_CANCELED' });
    }

    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credentials = firebase.auth.FacebookAuthProvider.credential(token);
        
        firebase.auth().signInAndRetrieveDataWithCredential(credentials)
            .catch(error => {
                dispatch({ type: FB_LOGIN_FAIL, payload: 'FB_AUTH_FAILED' });
            });

        // catch success at App.js cdm DO NOT UNCOMMENT BELOW
        // dispatch({type: FB_LOGIN_SUCCESS});
    }
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
