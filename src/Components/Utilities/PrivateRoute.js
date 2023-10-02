import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Routes>
        <Route {...rest} render={props => (
            localStorage.getItem('CurrentUser')!=null ?
                <Component {...props} />
            : <Navigate to="/login" />
        )} />
        </Routes>
    );
};

export default PrivateRoute;