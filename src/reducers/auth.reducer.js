import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SET_INITIAL_STATE } from "../actions/auth.actions";

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  error: '',
  loading: false,
  user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_UP_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SIGN_IN_REQUEST:
      return { ...state, ...INITIAL_STATE, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case SET_INITIAL_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default reducer;