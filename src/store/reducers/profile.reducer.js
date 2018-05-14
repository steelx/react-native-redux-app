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
    location: '00, 00',
    thumbnail: 'https://placekitten.com/g/100/100',
    photo: 'https://placekitten.com/g/640/640',
    loading: false
};
export default function profileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROFILE_LOCATION_INIT:
            return { ...state, loading: true };

        case SET_PROFILE_LOCATION_SUCCESS:
            return { ...state, loading: false, location: action.payload.location };

        case SET_PROFILE_LOCATION_ERROR:
            return { ...state, loading: false, error: action.payload };

        case GET_PROFILE_LOCATION_INIT:
            return { ...state, loading: true };

        case GET_PROFILE_LOCATION_SUCCESS:
            return { ...state, loading: false, ...action.payload };

        case GET_PROFILE_LOCATION_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state
    }
}