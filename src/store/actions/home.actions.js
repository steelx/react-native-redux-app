import firebase from 'firebase';
import { KITTEN_SMALL, KITTEN_BIG } from '../../utils/constants';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SET_TITLE = 'SET_TITLE';
export const GET_USERS_INIT = 'GET_USERS_INIT';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';
export const USERS_INITIAL_STATE = 'USERS_INITIAL_STATE';


/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export function setTitle(title) {
    return {
        type: SET_TITLE,
        value: title
    }
}

export const getUsers = () => (dispatch) => {
    dispatch({ type: GET_USERS_INIT });

    let ref = firebase.database().ref('users');

    // TODO: query next 10 so on
    ref.once('value')
        .then((snapshot) => {
            let snapshots = [];
            snapshot.forEach(function (childSnapshot) {
                let obj = JSON.stringify(childSnapshot), parsed = JSON.parse(obj);
                let item = Object.assign({}, {
                    thumbnail: parsed.thumbnail || KITTEN_SMALL,
                    photo: parsed.photo || KITTEN_BIG,
                    displayName: parsed.displayName,
                    location: parsed.location || '11, 11',
                    uid: parsed.uid,
                    lastSeen: parsed.metadata.lastSignInTime
                });
                snapshots.push(item);
            });
            dispatch({ type: GET_USERS_SUCCESS, payload: snapshots });
        })
        .catch((error) => {
            dispatch({
                type: GET_USERS_ERROR,
                payload: error.code
            });
        });
};


export const clearUsers = () => (dispatch) => {
    dispatch({ type: USERS_INITIAL_STATE });
};


