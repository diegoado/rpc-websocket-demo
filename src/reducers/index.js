import { combineReducers } from 'redux-immutable';
import websocket from './websocket';

const createRootReducer = () => combineReducers({ websocket });

export default createRootReducer;
