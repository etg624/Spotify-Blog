import { REFRESH_AUTH_TOKEN_SUCCESS } from '../actions/auth';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_ERROR
} from '../actions/user/fetchUser';

const initialState = {
  currentUser: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.user, loading: false };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
