import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { storeJWT, refreshAuthToken } from '../actions/auth';

import { fetchUser } from '../actions/user/fetchUser';
class Landing extends Component {
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const { authToken } = parsed;
    const { dispatch } = this.props;
    const storedAuthToken = localStorage.getItem('authToken');

    if (!storedAuthToken && authToken) {
      storeJWT(authToken, dispatch);

      return dispatch(fetchUser(authToken));
    }
    if (storedAuthToken) {
      const { spotifyId } = jwtDecode(storedAuthToken).user;
      dispatch(refreshAuthToken(spotifyId));
      storeJWT(storedAuthToken, dispatch);
      return dispatch(fetchUser(storedAuthToken));
    } else return <Redirect to="/" />;
  }

  render() {
    if (this.props.auth.userAuthInfo) {
      return <Redirect to="/playlist/3kdsNze39JEaO6UQT6LZBf" />;
    }
    return <div>Welcome</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
