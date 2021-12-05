import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { ProtectedRoute } from "./ProtectedRoute";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));
const register = lazy(() =>
  import("./views/pages/authentication/login/Register")
);
const Users = lazy(() => import("./views/pages/Users/Users"));
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const userEdit = lazy(() => import("./views/pages/user/edit/Edit"));
const userView = lazy(() => import("./views/pages/user/view/View"));
const tours = lazy(() => import("./views/pages/tours/list/List"));
const toursEdit = lazy(() => import("./views/pages/tours/edit/ToursEdit"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
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
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

// const currentUser =  useAuth();
const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <AppRoute path="/pages/register" component={register} fullLayout />
          <ProtectedRoute exact path="/users" component={Users} />
          <ProtectedRoute path="/users/edit" component={userEdit} />
          <ProtectedRoute path="/users/view" component={userView} />
          <ProtectedRoute exact path="/users/tours" component={tours} />
          <ProtectedRoute path="/users/tours/edit" component={toursEdit} />
          <AppRoute path="/pages/login" component={login} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
