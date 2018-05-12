import {
    SET_PROFILE_LOCATION_INIT,
    SET_PROFILE_LOCATION_SUCCESS,
    SET_PROFILE_LOCATION_ERROR,
    GET_PROFILE_LOCATION_INIT,
    GET_PROFILE_LOCATION_SUCCESS,
    GET_PROFILE_LOCATION_ERROR
} from "../actions/profile.actions";
// Reducer
const INITIAL_STATE = {
    location: '',
    loading: false
};
export default function profileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROFILE_LOCATION_INIT:
            return { ...state, ...INITIAL_STATE, loading: true };

        case SET_PROFILE_LOCATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, location: action.payload };

        case SET_PROFILE_LOCATION_ERROR:
            return { ...state, ...INITIAL_STATE, error: action.payload };

        case GET_PROFILE_LOCATION_INIT:
            return { ...state, ...INITIAL_STATE, loading: true };

        case GET_PROFILE_LOCATION_SUCCESS:
            return { ...state, ...INITIAL_STATE, location: action.payload };

        case GET_PROFILE_LOCATION_ERROR:
            return { ...state, ...INITIAL_STATE, error: action.payload };

        default:
            return state
    }
}