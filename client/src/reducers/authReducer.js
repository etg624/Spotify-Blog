import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_ERROR,
  REFRESH_ACCESS_TOKEN_SUCCESS
} from '../actions/auth';

const initialState = {
  currentUser: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, currentUser: action.user, loading: false };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.error };
    case REFRESH_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, accessToken: action.accessToken }
      };
    default:
      return state;
  }
}
