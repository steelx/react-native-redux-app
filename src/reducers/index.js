// combine reducers
import {combineReducers} from 'redux';
import home from './home.reducer';
import routes from './routes.reducer';

export default combineReducers({
    routes,    
    home
});
