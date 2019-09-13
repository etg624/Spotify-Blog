import { SET_AUTH_TOKEN, CLEAR_AUTH, AUTH_SUCCESS } from '../actions/auth';

const initialState = {
  userAuthInfo: null,
  authToken: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.authToken };
    case AUTH_SUCCESS:
      return { ...state, userAuthInfo: action.userAuthInfo };
    case CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
}
