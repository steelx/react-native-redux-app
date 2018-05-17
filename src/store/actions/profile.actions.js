import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { PERMISSION_DENIED } from './auth.actions';
import {KITTEN_BIG, KITTEN_SMALL} from "../../utils/constants";
import uuid from "uuid";

export const SET_PROFILE_LOCATION_INIT = "SET_PROFILE_LOCATION_INIT";
export const SET_PROFILE_LOCATION_ERROR = "SET_PROFILE_LOCATION_ERROR";
export const SET_PROFILE_LOCATION_SUCCESS = "SET_PROFILE_LOCATION_SUCCESS";

export const SET_PROFILE_IMAGE_INIT = "SET_PROFILE_IMAGE_INIT";
export const SET_PROFILE_IMAGE_ERROR = "SET_PROFILE_IMAGE_ERROR";
export const SET_PROFILE_IMAGE_SUCCESS = "SET_PROFILE_IMAGE_SUCCESS";

export const OFF_GET_PROFILE = "OFF_GET_PROFILE";
export const GET_PROFILE_INIT = "GET_PROFILE_INIT";
export const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";

export const PROFILE_INITIAL_STATE = "PROFILE_INITIAL_STATE";

export const setProfileLocation = ({ location, uid }) => (dispatch) => {
    dispatch({ type: SET_PROFILE_LOCATION_INIT });

    firebase.database().ref('locations/' + uid)
        .update({ location })
        .then(() => {
            dispatch({ type: SET_PROFILE_LOCATION_SUCCESS, payload: { location } });
        })
        .catch((error) => {
            dispatch({ type: SET_PROFILE_LOCATION_ERROR, payload: error.code });
        });
};

export const uploadImageAsync = (uri, uid, firebase) => async (dispatch) => {
    dispatch({ type: SET_PROFILE_IMAGE_INIT });

    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child(`users/${uid}/${uuid.v4()}`);

        const snapshot = await ref.put(blob);
        dispatch({ type: SET_PROFILE_IMAGE_SUCCESS });
    } catch (e) {
        dispatch({ type: SET_PROFILE_IMAGE_ERROR, payload: SET_PROFILE_IMAGE_ERROR });
    }
};



export const getProfile = ({ uid }) => (dispatch) => {
    dispatch({ type: GET_PROFILE_INIT });
    let usersDb = firebase.database().ref('users/' + uid);

    usersDb.on('value', (snapshot) => {
        const user = snapshot.val();
        const {displayName, email, metadata, photo, thumbnail, uid} = user;
        let foundLocation = user.location !== undefined && user.location.coords !== undefined ? {
            latitude: user.location.coords.latitude, longitude: user.location.coords.longitude } : {};

        dispatch({ type: GET_PROFILE_SUCCESS, payload: {
            displayName, email, location: foundLocation, metadata, photo: photo || KITTEN_BIG, thumbnail: thumbnail || KITTEN_SMALL, uid} });
    });
};


export const offGetProfile = ({ uid }) => (dispatch) => {
    dispatch({ type: OFF_GET_PROFILE });
    firebase.database().ref('users/' + uid).off();
};

export const clearProfile = () => (dispatch) => {
    dispatch({ type: PROFILE_INITIAL_STATE });
};


export function getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    //getRegionForCoordinates([{latitude: 18.5451645,longitude: 73.909505}])
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY
    };
}