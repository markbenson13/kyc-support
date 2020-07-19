import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Drawer, Divider } from "@material-ui/core/";
import Avatar from "../assets/images/icons/User@2x.png";

const Sidebar = () => {
  return (
    <>
      <Drawer variant="permanent" className="sidebar-wrapper">
        <div className="avatar-wrapper">
          <img src={Avatar} alt="Avatar" />
        </div>
        <Divider />
        <div className="nav-menu">
          <NavLink to="/kyc" className="nav-item" activeClassName="is-active">
            <div className="icon kyc"></div>
            KYC
          </NavLink>
          <NavLink to="/amla" className="nav-item" activeClassName="is-active">
            <div className="icon amla"></div>
            Amla
          </NavLink>
          <NavLink
            to="/accounts"
            className="nav-item"
            activeClassName="is-active"
          >
            <div className="icon accounts"></div>
            Accounts
          </NavLink>
        </div>
      </Drawer>
    </>
  );
};

export default withRouter(Sidebar);
