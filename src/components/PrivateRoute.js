import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEntries } from '../actions/entry-actions';
import { getUser } from '../actions/user-actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const savedToken = localStorage.getItem('sleepToken');

  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (savedToken) {
        await dispatch(getEntries(savedToken));
      }
      setIsTokenValid(true); // Proceed to render the route
    };

    checkAuth();
  }, [dispatch, savedToken]);

  if (!isTokenValid) {
    return <div>Loading...</div>; // or a spinner component
  }

  return (
    <Route
      {...rest}
      render={props =>
        isTokenValid ? <Component {...props} /> : <Redirect to="/unauthorized" />
      }
    />
  );
};

export default PrivateRoute;
