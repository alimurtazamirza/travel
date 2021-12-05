import React, { useEffect, useState } from "react";
import { Navbar } from "reactstrap";
import classnames from "classnames";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarUser from "./NavbarUser";
import userImg from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { useAuth, firestore } from "../../../firebase-config";
import { getDocs, collection, query, where } from "firebase/firestore";

const ThemeNavbar = (props) => {
  const user = useAuth();
  const [admin, setAdmin] = useState(null);
  // useEffect(async () => {
  //   const userCollectionRef = collection(firestore, "users");
  //   const q = query(userCollectionRef, where("uid", "==", user.uid));
  //   const querySnapshot = await getDocs(q);
  //   const adminUser =
  //     querySnapshot.docs[0] !== undefined ? querySnapshot.docs[0].data() : null;
  //   setAdmin(adminUser);
  // }, []);
  // console.log(admin);

  const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"];
  const navbarTypes = ["floating", "static", "sticky", "hidden"];

  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar
        className={classnames(
          "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
          {
            "navbar-light":
              props.navbarColor === "default" ||
              !colorsArr.includes(props.navbarColor),
            "navbar-dark": colorsArr.includes(props.navbarColor),
            "bg-primary":
              props.navbarColor === "primary" && props.navbarType !== "static",
            "bg-danger":
              props.navbarColor === "danger" && props.navbarType !== "static",
            "bg-success":
              props.navbarColor === "success" && props.navbarType !== "static",
            "bg-info":
              props.navbarColor === "info" && props.navbarType !== "static",
            "bg-warning":
              props.navbarColor === "warning" && props.navbarType !== "static",
            "bg-dark":
              props.navbarColor === "dark" && props.navbarType !== "static",
            "d-none": props.navbarType === "hidden" && !props.horizontal,
            "floating-nav":
              (props.navbarType === "floating" && !props.horizontal) ||
              (!navbarTypes.includes(props.navbarType) && !props.horizontal),
            "navbar-static-top":
              props.navbarType === "static" && !props.horizontal,
            "fixed-top": props.navbarType === "sticky" || props.horizontal,
            scrolling: props.horizontal && props.scrolling,
          }
        )}
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper"></div>
              {props.horizontal ? (
                <div className="logo d-flex align-items-center">
                  <div className="brand-logo mr-50"></div>
                  <h2 className="text-primary brand-text mb-0">Admin</h2>
                </div>
              ) : null}
              <NavbarUser
                handleAppOverlay={props.handleAppOverlay}
                changeCurrentLang={props.changeCurrentLang}
                userName={"Admin"}
                userImg={userImg}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default ThemeNavbar;
