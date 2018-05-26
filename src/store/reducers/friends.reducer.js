import {
    GET_FRIENDS_ERROR,
    GET_FRIENDS_INIT,
    GET_FRIENDS_SUCCESS, GET_MESSAGES_ERROR,
    GET_MESSAGES_INIT,
    GET_MESSAGES_SUCCESS
} from "../actions/friends.actions";

const INIT_STATE = {
    friends : [
        //uid, uid,
    ],
    friendsReceived : [
        //uid, uid
    ],
    messages: {},
    loading: false,
    error: false
};

export default function friendsReducer(state = INIT_STATE, action) {

    switch (action.type) {
        case GET_FRIENDS_INIT:
            return {...state, loading: true};

        case GET_FRIENDS_SUCCESS:
            return {...INIT_STATE, ...state,
                friends: Array.from(new Set([...state.friends, ...action.payload]))
            };

        case GET_FRIENDS_ERROR:
            return {...INIT_STATE, ...state, error: action.payload};

        case GET_MESSAGES_INIT:
            return {...state, loading: true};

        case GET_MESSAGES_SUCCESS:
            return {...INIT_STATE, ...state, loading: false,
                messages: action.payload
            };

        case GET_MESSAGES_ERROR:
            return {...INIT_STATE, ...state, error: action.payload};

        default:
            return state;
    }
}