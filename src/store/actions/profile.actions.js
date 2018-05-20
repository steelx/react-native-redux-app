import firebase from 'firebase';
import {KITTEN_BIG, KITTEN_SMALL} from "../../utils/constants";
import uuid from "uuid";
import {Location, Permissions} from 'expo';

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

export const setProfileLocation = ({uid}, callback) => async (dispatch) => {
    dispatch({type: SET_PROFILE_LOCATION_INIT});

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let errorMessage = null;
    if (status !== 'granted') {
        errorMessage = 'Permission to access location was denied';
        dispatch({type: SET_PROFILE_LOCATION_ERROR, payload: errorMessage});
        return;
    }
    let tempOptions = {enableHighAccuracy: false, maximumAge: 0};
    let location = await Location.getCurrentPositionAsync(tempOptions);
    dispatch({type: SET_PROFILE_LOCATION_SUCCESS, payload: {location: location.coords}});
    if (callback) {
        console.log("location.coords: ", location.coords);
        callback();
    }
    // update location on server in background
    firebase.database().ref('locations/' + uid)
        .update(location.coords)
        .catch((error) => {
            dispatch({type: SET_PROFILE_LOCATION_ERROR, payload: error.code});
        });
    return location;
};

export const uploadImageAsync = (uri, uid, firebase) => async (dispatch) => {
    dispatch({type: SET_PROFILE_IMAGE_INIT});

    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child(`users/${uid}/${uuid.v4()}`);

        const snapshot = await ref.put(blob);
        dispatch({type: SET_PROFILE_IMAGE_SUCCESS});
    } catch (e) {
        dispatch({type: SET_PROFILE_IMAGE_ERROR, payload: SET_PROFILE_IMAGE_ERROR});
    }
};


export const getProfile = ({uid}) => (dispatch) => {
    dispatch({type: GET_PROFILE_INIT});
    let usersRef = firebase.database().ref('users/' + uid);
    let locationsRef = firebase.database().ref('locations/' + uid);

    usersRef.on('value', async (snapshot) => {
        const user = snapshot.val();
        const {displayName, email, metadata, photo, thumbnail, uid} = user;

        try {
            const locationSnap = await locationsRef.once('value');
            let parsedLocation = locationSnap.toJSON();
            let location = parsedLocation && parsedLocation.latitude !== undefined && parsedLocation.longitude !== undefined ?
                {latitude: parsedLocation.latitude, longitude: parsedLocation.longitude} : {};

            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: {
                    displayName, email, location, metadata, uid,
                    photo: photo || KITTEN_BIG,
                    thumbnail: thumbnail || user.photoUrl || KITTEN_SMALL
                }
            });

        } catch (error) {
            dispatch({ type: GET_PROFILE_ERROR , payload: error.code !== undefined ? error.code : error });
        }
    });
};


export const offGetProfile = ({uid}) => (dispatch) => {
    dispatch({type: OFF_GET_PROFILE});
    firebase.database().ref('users/' + uid).off();
};

export const clearProfile = () => (dispatch) => {
    dispatch({type: PROFILE_INITIAL_STATE});
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