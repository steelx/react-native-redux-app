import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { PERMISSION_DENIED } from './auth.actions';

export const SET_PROFILE_LOCATION_INIT = "SET_PROFILE_LOCATION_INIT";
export const SET_PROFILE_LOCATION_ERROR = "SET_PROFILE_LOCATION_ERROR";
export const SET_PROFILE_LOCATION_SUCCESS = "SET_PROFILE_LOCATION_SUCCESS";

export const OFF_PROFILE_LOCATION = "OFF_PROFILE_LOCATION";
export const GET_PROFILE_LOCATION_INIT = "GET_PROFILE_LOCATION_INIT";
export const GET_PROFILE_LOCATION_ERROR = "GET_PROFILE_LOCATION_ERROR";
export const GET_PROFILE_LOCATION_SUCCESS = "GET_PROFILE_LOCATION_SUCCESS";

export const setProfileLocation = ({ location, uid }) => (dispatch) => {
    dispatch({ type: SET_PROFILE_LOCATION_INIT });

    firebase.database().ref('users/' + uid)
        .update({ location })
        .then(() => {
            dispatch({ type: SET_PROFILE_LOCATION_SUCCESS, payload: { location } });
        })
        .catch((error) => {
            dispatch({
                type: SET_PROFILE_LOCATION_ERROR,
                payload: error.code
            });
        });
};


export const getProfileLocation = ({ uid }) => (dispatch, getState) => {
    dispatch({ type: GET_PROFILE_LOCATION_INIT });
    let usersDb = firebase.database().ref('users/' + uid);
    console.log("usersDb", usersDb);
    usersDb.on('value', (snapshot) => {
        console.log("snapshot", snapshot.val());
        // let location = (snapshot.val() && snapshot.val().location) || '00, 00';
        dispatch({ type: GET_PROFILE_LOCATION_SUCCESS, payload: snapshot.val() });
    });

    // usersDb.once('value')
    //     .then((snapshot) => {
    //         console.log("snapshot", snapshot.val());
    //         let location = (snapshot.val() && snapshot.val().location) || '00, 00';
    //         dispatch({ type: GET_PROFILE_LOCATION_SUCCESS, payload: location });
    //     })
    //     .catch((error) => {
    //         dispatch({
    //             type: GET_PROFILE_LOCATION_ERROR,
    //             payload: error.code
    //         });

    //         if (error.code === PERMISSION_DENIED) {
    //             //logout user
    //             dispatch({ type: PERMISSION_DENIED }); // auth reducer
    //         }
    //     });
};


export const offProfileLocation = ({ uid }) => (dispatch, getState) => {
    dispatch({ type: OFF_PROFILE_LOCATION });

    firebase.database().ref('users/' + uid).off();
};

