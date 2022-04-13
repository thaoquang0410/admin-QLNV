import React from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../helpers/storage';
import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function RedirectLogin({ children, path, exact }) {
    const isAuthenticate = getToken();
    return (
    <Route exact={exact} path={path}>
        {isAuthenticate ?  <Redirect to="/" /> : children}
    </Route>
    );
}

RedirectLogin.propTypes = {
    children: PropTypes.any.isRequired,
};

export default RedirectLogin;
