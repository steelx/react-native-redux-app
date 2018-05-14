import firebase from 'firebase';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const SET_TITLE = 'SET_TITLE';
export const GET_USERS_INIT = 'GET_USERS_INIT';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';


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

    ref.once('value')
        .then((snapshot) => {
            let snapshots = [];
            snapshot.forEach(function (childSnapshot) {
                let obj = JSON.stringify(childSnapshot), parsed = JSON.parse(obj);
                let item = Object.assign({}, {id: childSnapshot.key}, parsed);
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



