import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getItemFromLocalStorage } from '../helpers/local-storage';

import { fetchUser } from '../actions/auth';
class Landing extends Component {
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const { user } = parsed;

    const {
      dispatch,
      auth: { currentUser }
    } = this.props;

    return user ? dispatch(fetchUser(user)) : console.log(currentUser);
  }

  render() {
    if (this.props.auth.currentUser) {
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
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Landing);
