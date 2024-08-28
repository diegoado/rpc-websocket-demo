import { OPEN_WEBSOCKET, CLOSE_WEBSOCKET } from './actions';
import createReducer from '../create-reducer';

const initialState = null;

const websocket = createReducer(initialState, {
    [OPEN_WEBSOCKET]: (_, action) => action.payload.ws,
    [CLOSE_WEBSOCKET]: () => null
});

export default websocket;
