import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/login" />)
      }
    </Route>
);

export default ProtectedRoute;
