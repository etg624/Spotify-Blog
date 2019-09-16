import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import { clearAuth } from '../actions/auth';
import '../styles/Header.css';

function Header({ loggedIn, dispatch }) {
  return (
    <header className="main-header">
      {!loggedIn ? (
        <a className="header-link" href={`${API_BASE_URL}/auth/spotify`}>
          Login with Spotify
        </a>
      ) : (
        <>
          <Link to="/" className="header-link" onClick={() => logOut(dispatch)}>
            Logout
          </Link>
          <Link to={loggedIn ? '/profile' : '/'} className="header-link">
            {loggedIn ? 'Profile' : null}
          </Link>
        </>
      )}
    </header>
  );
}

const logOut = dispatch => {
  dispatch(clearAuth());
  return localStorage.removeItem('authToken');
};

export default connect()(Header);
