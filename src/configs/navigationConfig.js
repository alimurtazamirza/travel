import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    id: "users",
    title: "User",
    type: "collapse",
    icon: <Icon.User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/users",
      },
      // {
      //   id: "view",
      //   title: "View",
      //   type: "item",
      //   icon: <Icon.Circle size={12} />,
      //   permissions: ["admin", "editor"],
      //   navLink: "/users/view",
      // },
      {
        id: "new",
        title: "Add",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/users/edit",
      },
    ],
  },
  {
    id: "tours",
    title: "Tours",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/users/tours",
  },
  // {
  //   id: "drivers",
  //   title: "Drivers",
  //   type: "item",
  //   icon: <Icon.Shield size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/drivers",
  // },
];

export default navigationConfig;
