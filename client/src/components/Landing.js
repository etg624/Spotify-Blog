import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { storeJWT } from '../actions/auth';

import { fetchUser } from '../actions/userActions/fetchUser';
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
    return storedAuthToken ? (
      dispatch(fetchUser(storedAuthToken))
    ) : (
      <Redirect to="/login" />
    );
  }

  render() {
    if (this.props.user.currentUser) {
      return <Redirect to={`/profile`} />;
    }
    return (
      <div>
        <a href={`${API_BASE_URL}/auth/spotify`}>Login with Spotify</a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
