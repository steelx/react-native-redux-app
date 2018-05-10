// configureStore
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

function logger({ getState }) {
    return next => action => {
        console.log('will dispatch', action);

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action);

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue;
    }
}

export default function configureStore() {
    const enhancer = compose(applyMiddleware(
        logger,
        ReduxThunk
    ));
    const store = createStore(reducers, enhancer);
    return store;
}
