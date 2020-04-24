import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user_token: local_token , ...rest }) => (
  <Route
    {...rest}
    render={props =>
      local_token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      )
    }
  />
);

export default PrivateRoute;