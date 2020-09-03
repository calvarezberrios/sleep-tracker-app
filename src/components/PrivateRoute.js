import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...props}) => {
    const savedToken = localStorage.getItem("sleepToken");
    const { user } = useSelector(state => state.usersReducer);

    return (
        <Route {...props} render = {props => {
            if(savedToken || (user && user.token)) {
                return <Component {...props} />;
            } 
            return <Redirect to = "/unauthorized" />;
            
        }} />
    );
};

export default PrivateRoute;