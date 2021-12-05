import React, { Suspense, lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ContextLayout } from "./utility/context/Layout";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { useAuth } from "./firebase-config";

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => {
  const currentUser = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser && props.location != "/pages/login") {
          return (
            <ContextLayout.Consumer>
              {(context) => {
                let LayoutTag =
                  fullLayout === true
                    ? context.fullLayout
                    : context.state.activeLayout === "horizontal"
                    ? context.horizontalLayout
                    : context.VerticalLayout;
                return (
                  <LayoutTag {...props} permission={props.user}>
                    <Suspense fallback={<Spinner />}>
                      <Component {...props} />
                    </Suspense>
                  </LayoutTag>
                );
              }}
            </ContextLayout.Consumer>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/pages/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

// const currentUser =  useAuth();
export const ProtectedRoute = connect(mapStateToProps)(RouteConfig);
