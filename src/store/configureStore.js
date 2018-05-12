// configureStore
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

function logger({ getState }) {
    return next => action => {
        console.log("< ####################### >");
        console.log("< will dispatch action >");
        console.log(action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);
        console.log("< ======================= >");
        console.log("< state after dispatch >");
        console.log(getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    }
}

const enhancer = compose(applyMiddleware(
    logger,
    ReduxThunk
));
const store = createStore(reducers, enhancer);
export default store;
