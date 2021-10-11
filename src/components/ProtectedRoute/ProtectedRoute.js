import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = useSelector((state) => state.userData.loggedIn);

  return (
    <Route>
      {() => (loggedIn ? <Component {...props} /> : <Redirect to="/signin" />)}
    </Route>
  );
};

export default ProtectedRoute;
