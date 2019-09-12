import React from 'react';
import { API_BASE_URL } from '../config';
import { clearAuth } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function Header(props) {
  const { loggedIn, dispatch } = props;
  return (
    <header>
      {!loggedIn ? (
        <a href={`${API_BASE_URL}/auth/spotify`}>Login with Spotify</a>
      ) : (
        <Link to="/" onClick={() => logOut(dispatch)}>
          Logout
        </Link>
      )}
    </header>
  );
}

const logOut = dispatch => {
  dispatch(clearAuth());
  return localStorage.removeItem('authToken');
};

export default connect()(Header);
