import { OPEN_WEBSOCKET, CLOSE_WEBSOCKET } from './actions';

export const openWebsocket = (websocket) => ({
  type: OPEN_WEBSOCKET,
  payload: { ws: websocket }
});

export const closeWebsocket = () => ({
    type: CLOSE_WEBSOCKET
});