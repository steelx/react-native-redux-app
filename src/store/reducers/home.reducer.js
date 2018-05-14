import { SET_TITLE, GET_USERS_INIT, GET_USERS_SUCCESS, GET_USERS_ERROR } from "../actions/home.actions";

// Reducer
const initialState = {
    title: 'Home',
    welcome: 'welcome to home',
    loading: false,
    users: []
};
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TITLE:
            return { ...state, title: action.value };

        case GET_USERS_INIT:
            return { ...state, loading: true };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...action.payload],
                loading: false
            };
        case GET_USERS_ERROR:
            return { ...state, loading: false };

        default:
            return state
    }
}