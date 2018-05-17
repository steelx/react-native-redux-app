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
export const NEXT_USERS_INIT = 'NEXT_USERS_INIT';
export const NEXT_USERS_SUCCESS = 'NEXT_USERS_SUCCESS';
export const NEXT_USERS_ERROR = 'NEXT_USERS_ERROR';
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

    let ref = firebase.database().ref('users').orderByKey().limitToFirst(2);

    ref.once('value')
        .then((snaps) => {
            let snapshots = getSnapshots(snaps);
            dispatch({ type: GET_USERS_SUCCESS, payload: snapshots });
        })
        .catch((error) => {
            dispatch({
                type: GET_USERS_ERROR,
                payload: error.code
            });
        });
};


export const loadUsers = (lastUserUid) => (dispatch) => {
    dispatch({ type: NEXT_USERS_INIT });

    let ref = firebase.database().ref('users').orderByKey()
        .startAt(lastUserUid).limitToFirst(10);

    ref.once('value')
        .then((snaps) => {
            let snapshots = getSnapshots(snaps);
            dispatch({ type: NEXT_USERS_SUCCESS, payload: snapshots.slice(1) });
        })
        .catch((error) => {
            dispatch({
                type: NEXT_USERS_ERROR,
                payload: error.code
            });
        });
};

function getSnapshots(snaps) {
    let snapshots = [];
    snaps.forEach(function (childSnapshot) {

        let obj = JSON.stringify(childSnapshot), parsed = JSON.parse(obj);
        let foundLocation = parsed.location !== undefined && parsed.location.coords !== undefined ? 
            { latitude: parsed.location.coords.latitude, longitude: parsed.location.coords.longitude } : {};

        let item = Object.assign({}, {
            thumbnail: parsed.thumbnail || KITTEN_SMALL,
            photo: parsed.photo || KITTEN_BIG,
            displayName: parsed.displayName,
            location: foundLocation,
            uid: parsed.uid,
            lastSeen: parsed.metadata.lastSignInTime
        });
        snapshots.push(item);
    });
    return snapshots;
}

export const clearUsers = () => (dispatch) => {
    dispatch({ type: USERS_INITIAL_STATE });
};


