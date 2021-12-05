import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Spinner,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import { Mail, Lock } from "react-feather";
import { history } from "../../../../history";
import { firestore, logOut, useAuth } from "../../../../firebase-config";
import { getDocs, query, where, collection } from "@firebase/firestore";

import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";

const Login = () => {
  const currentUser = useAuth();
  const [response, setResponse] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const userCollectionRef = collection(firestore, "users");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse({ ...response, error: false, msg: "" });
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      const userId = user.user.uid;
      const q = query(userCollectionRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);
      const adminUser =
        querySnapshot.docs[0] !== undefined
          ? querySnapshot.docs[0].data()
          : undefined;
      if (adminUser !== undefined && adminUser.admin) {
        history.push("/");
      } else {
        setResponse({ ...response, error: true, msg: "You are not a Admin" });
        logOut();
      }
    } catch (error) {
      setResponse({ ...response, error: true, msg: error.message });
    }
    setLoading(false);
  };

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h4>Login</h4>
                  <p>Welcome back, please login to your account.</p>
                  <Form autoComplete="false" onSubmit={handleLogin}>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={(e) =>
                          setState({ ...state, password: e.target.value })
                        }
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <p className="px-2 auth-title text-warning">
                      {response.error ? response.msg : ""}
                    </p>
                    {/* <FormGroup className="d-flex justify-content-between align-items-center">
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Remember me"
                      />
                      <div className="float-right">Forgot Password?</div>
                    </FormGroup> */}
                    <div className="d-flex justify-content-between">
                      <Button.Ripple
                        color="primary"
                        type="button"
                        outline
                        onClick={() => history.push("/pages/register")}
                      >
                        Register
                      </Button.Ripple>
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        disabled={loading}
                        // onClick={() => history.push("/")}
                      >
                        {loading ? <Spinner color="white" size="sm" /> : ""}
                        <span className="ml-50">Login</span>
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
