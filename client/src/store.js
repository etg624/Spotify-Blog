import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import playlistReducer from './reducers/playlistReducer';
import playerReducer from './reducers/playerReducer';

import playbackReducer from './reducers/playbackReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    auth: authReducer,
    user: userReducer,
    playlists: playlistReducer,
    playback: playbackReducer,
    player: playerReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
