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


const rad = function(x) {
    return x * Math.PI / 180;
};

const getDistance = function(p1, p2) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.latitude - p1.latitude);
    let dLong = rad(p2.longitude - p1.longitude);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d; // returns the distance in meter
};

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/

export const getUsers = () => async (dispatch, getState) => {
    const currentProfile = getState().profile;
    dispatch({ type: GET_USERS_INIT });
    let usersRef = firebase.database().ref('users').orderByKey().limitToFirst(2);

    try {
        const usersSnap = await usersRef.once('value');
        let users = await getSnapshots(usersSnap.val(), currentProfile);
        dispatch({ type: GET_USERS_SUCCESS, payload: users });
    } catch (error) {
        dispatch({
            type: GET_USERS_ERROR,
            payload: error.code
        });
    }
};


export const loadUsers = (lastUserUid) => async (dispatch, getState) => {
    const currentProfile = getState().profile;
    dispatch({ type: NEXT_USERS_INIT });
    let ref = firebase.database().ref('users').orderByKey()
        .startAt(lastUserUid).limitToFirst(10);

    try {
        const usersSnap = await ref.once('value');
        let users = await getSnapshots(usersSnap.val(), currentProfile);
        dispatch({ type: NEXT_USERS_SUCCESS, payload: users.slice(1) });

    } catch (error) {
        dispatch({
            type: NEXT_USERS_ERROR,
            payload: error.code
        });
    }
};

async function getSnapshots(snaps, currentProfile) {
    let snapshots = [];

    for (let key in snaps) {
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

        const distance = getDistance(currentProfile.location, location);
        if (distance / 1000 <= 50) {
            // less than 50 KM
            snapshots.push(updatedUser);
        }

    }

    return snapshots;
}

export const clearUsers = () => (dispatch) => {
    dispatch({ type: USERS_INITIAL_STATE });
};
