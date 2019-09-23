import { clearAuth } from '../actions/auth';

export const logout = dispatch => {
  localStorage.removeItem('authToken');
  return dispatch(clearAuth());
};
