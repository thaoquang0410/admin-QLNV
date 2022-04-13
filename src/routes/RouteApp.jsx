import React from 'react';

import { Route } from 'react-router-dom';

import RouteNav from '../layout/navbar';

const AppRoute = ({ component: Component, rest }) => {
    return (
        <Route
            {...rest}
            render={(routeProps) => (
                <RouteNav>
                    <Component {...routeProps} />
                </RouteNav>
            )}
        />
    );
};

export default AppRoute;