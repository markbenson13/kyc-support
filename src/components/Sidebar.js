import React from "react";
import { withRouter } from "react-router-dom";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import Avatar from "../assets/images/icons/User@2x.png";

const Sidebar = (props) => {
  const { history } = props;

  const itemsList = [
    {
      text: "KYC",
      onClick: () => history.push("/kyc"),
    },
    {
      text: "Amla",
      onClick: () => history.push("/amla"),
    },
    {
      text: "Accounts",
      onClick: () => history.push("/accounts"),
    },
  ];

  return (
    <>
      <Drawer variant="permanent" className="sidebar-wrapper">
        <div class="avatar-wrapper">
          <img src={Avatar} alt="Avatar" />
        </div>
        <Divider />
        <List className="nav-menu">
          {itemsList.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem
                button
                key={text}
                className="nav-item"
                onClick={onClick}
              >
                <ListItemIcon
                  className={`icon ${text.toLowerCase()}`}
                ></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default withRouter(Sidebar);
