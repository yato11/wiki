import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const ProtectedLink = ({ path, Component, isLogged, ...res }) => {
  return (
    <Route
      path={path}
      render={() => (isLogged ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedLink;
ProtectedLink.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
