import { SET_TITLE } from "../actions/home.actions";

// Reducer
const initialState = {
    title: 'Home',
    welcome: 'welcome to home'
};
export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
        return { ...state, title: action.value };
    default:
        return state
  }
}