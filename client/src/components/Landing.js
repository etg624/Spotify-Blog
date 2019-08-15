import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { fetchUser } from '../actions/auth';
class Landing extends Component {
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const { user } = parsed;

    this.props.dispatch(fetchUser(user));
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
