import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import storage from '../../helpers/storage';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      storage.isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);

export default ProtectedRoute;
