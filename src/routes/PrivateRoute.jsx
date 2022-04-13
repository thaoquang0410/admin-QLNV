import React from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../helpers/storage';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function PrivateRoute({ children, path, exact }) {
  const isAuthenticate = getToken();
  return (
    <Route exact={exact} path={path}>
      {isAuthenticate ? children : <Redirect to="/login" />}
    </Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PrivateRoute;
