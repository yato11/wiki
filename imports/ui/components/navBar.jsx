import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import DraggableDialog from "./DraggableDialog";
import "jquery";
import "bootstrap/dist/js/bootstrap";

export const NavBar = () => {
  const [openDialLogout, setOpenDialLogout] = React.useState(false);
  const [user, setUser] = React.useState({ lastName: "", firsName: "" });
  let history = useHistory();

  React.useEffect(() => {
    const _user = Meteor.users.findOne(Meteor.userId());
    setUser(_user);
  }, []);
  handleLogout = () => {
    Meteor.logout();
    window.location = "/login";
    setOpenDialLogout(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark pl-5 sticky-top">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand">WIKI</a>
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button
              style={{}}
              className="btn btn-dark"
              onClick={() => {
                history.push(`/pageForm/new`);
              }}
            >
              <AddBoxRoundedIcon style={{ fontSize: 25 }} /> New Page
            </button>
          </li>
        </ul>

        <ul className="navbar-nav ml-md-auto">
          <li className="nav-item active ml-5">
            <a className="nav-link">
              <span className="sr-only">{/* sdsd */}</span>
            </a>
          </li>
          <li className="nav-item dropdown">
            <button
              style={{ width: 80, height: 40 }}
              className="btn btn-danger"
              onClick={() => {
                setOpenDialLogout(true);
              }}
            >
              Logout
              {/* {`${user.firstName} ${user.lastName}`} */}
            </button>
          </li>
        </ul>
      </div>
      <DraggableDialog
        onAggree={handleLogout}
        onClose={(isOpen) => {
          setOpenDialLogout(isOpen);
        }}
        title="Logout"
        message="Are you sure logout?"
        open={openDialLogout}
      />
    </nav>
  );
};
