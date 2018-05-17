import { SET_TITLE, GET_USERS_INIT, GET_USERS_SUCCESS, GET_USERS_ERROR, USERS_INITIAL_STATE, NEXT_USERS_INIT, NEXT_USERS_SUCCESS, NEXT_USERS_ERROR } from "../actions/home.actions";

// Reducer
const INITIAL_STATE = {
    title: 'Home',
    welcome: 'welcome to home',
    loading: false,
    users: []
};
export default function homeReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.value };

        case GET_USERS_INIT:
            return { ...state, loading: true };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: [...action.payload],
                loading: false
            };
        case GET_USERS_ERROR:
            return { ...state, loading: false };

        case NEXT_USERS_INIT:
            return { ...state, loading: true };
        case NEXT_USERS_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...action.payload],
                loading: false
            };
        case NEXT_USERS_ERROR:
            return { ...state, loading: false };

        case USERS_INITIAL_STATE:
            return { ...state, ...INITIAL_STATE };

        default:
            return state
    }
}