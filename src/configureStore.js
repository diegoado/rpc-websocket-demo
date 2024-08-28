import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import Immutable from 'immutable';
import createRootReducer from './reducers';

const configureStore = ({ firstState } = Immutable.Map()) => {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = compose(...enhancers);

    return createStore(createRootReducer(), firstState, composedEnhancers);
};

export default configureStore;
