// combine reducers
import {combineReducers} from 'redux';
import home from './home.reducer';
import routes from './routes.reducer';
import auth from './auth.reducer';

export default combineReducers({
    routes,
    home,
    auth
});
