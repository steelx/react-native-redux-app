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

export const getUsers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_INIT });

    let usersRef = firebase.database().ref('users').orderByKey().limitToFirst(2);

    try {
        const usersSnap = await usersRef.once('value');
        let users = await getSnapshots(usersSnap.val());
        dispatch({ type: GET_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({
            type: GET_USERS_ERROR,
            payload: error.code
        });
    }
};


export const loadUsers = (lastUserUid) => async (dispatch) => {
    dispatch({ type: NEXT_USERS_INIT });

    let ref = firebase.database().ref('users').orderByKey()
        .startAt(lastUserUid).limitToFirst(10);

    try {
        const usersSnap = await ref.once('value');
        let users = await getSnapshots(usersSnap.val());
        dispatch({ type: NEXT_USERS_SUCCESS, payload: users.slice(1) });

    } catch (error) {
        dispatch({
            type: NEXT_USERS_ERROR,
            payload: error.code
        });
    }
};

async function getSnapshots(snaps) {
    let snapshots = [];

    for (let key in snaps) {
        // const user = JSON.stringify(childSnapshot);
        const parsed = snaps[key];
        const locationsRef = firebase.database().ref('locations/' + parsed.uid);

        let locationSnap = await locationsRef.once('value');
        let parsedLocation = locationSnap.toJSON();
        const location = parsedLocation && parsedLocation.latitude !== undefined && parsedLocation.longitude !== undefined ?
            {latitude: parsedLocation.latitude, longitude: parsedLocation.longitude} : {};
        let updatedUser = Object.assign({}, {
            thumbnail: parsed.thumbnail || parsed.photoUrl || KITTEN_SMALL,
            photo: parsed.photo || KITTEN_BIG,
            displayName: parsed.displayName,
            location,
            uid: parsed.uid,
            lastSeen: parsed.metadata.lastSignInTime
        });

        snapshots.push(updatedUser);
    }

    return snapshots;
}

export const clearUsers = () => (dispatch) => {
    dispatch({ type: USERS_INITIAL_STATE });
};


