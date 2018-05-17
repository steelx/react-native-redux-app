import {KITTEN_SMALL, KITTEN_BIG} from '../../utils/constants';
import {
    SET_PROFILE_LOCATION_INIT, SET_PROFILE_LOCATION_SUCCESS, SET_PROFILE_LOCATION_ERROR,
    GET_PROFILE_INIT, GET_PROFILE_SUCCESS, GET_PROFILE_ERROR, PROFILE_INITIAL_STATE,
    SET_PROFILE_IMAGE_INIT, SET_PROFILE_IMAGE_SUCCESS, SET_PROFILE_IMAGE_ERROR
} from "../actions/profile.actions";
// Reducer
const INITIAL_STATE = {
    location: {},
    thumbnail: KITTEN_SMALL,
    photo: KITTEN_BIG,
    loading: false,
    metadata: {},
    uid: null,
    email: null,
    displayName: null
};
export default function profileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROFILE_LOCATION_INIT:
            return { ...state, loading: true };

        case SET_PROFILE_LOCATION_SUCCESS:
            return { ...state, loading: false, location: action.payload.location };

        case SET_PROFILE_LOCATION_ERROR:
            return { ...state, loading: false, error: action.payload };

        case SET_PROFILE_IMAGE_INIT:
            return { ...state, loading: true };
        case SET_PROFILE_IMAGE_SUCCESS:
            return { ...state, loading: true };
        case SET_PROFILE_IMAGE_ERROR:
            return { ...state, loading: false, error: action.payload };

        case GET_PROFILE_INIT:
            return { ...state, loading: true };

        case GET_PROFILE_SUCCESS:
            return { ...state, loading: false, ...action.payload };

        case GET_PROFILE_ERROR:
            return { ...state, loading: false, error: action.payload };

        case PROFILE_INITIAL_STATE:
            return {...state, ...INITIAL_STATE};

        default:
            return state
    }
}