import React from 'react';
import { API_BASE_URL } from '../config';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearAuth } from '../actions/auth';
function Header(props) {
  const { loggedIn, dispatch } = props;
  const logOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    dispatch(clearAuth());
  };

  return loggedIn ? (
    <Link to="/" onClick={() => logOut()}>
      Log Out
    </Link>
  ) : (
    <div>
      <a href={`${API_BASE_URL}/auth/spotify`}>Login with Spotify</a>
    </div>
  );
}

const mapStateToProps = state => {
  const { userInfo } = state.auth;
  if (userInfo) {
    return { loggedIn: state.auth.userInfo.spotifyId !== null };
  }
  return { loggedIn: false };
};

export default connect(mapStateToProps)(Header);
