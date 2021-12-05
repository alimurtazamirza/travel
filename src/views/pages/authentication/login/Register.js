import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../../firebase-config";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check } from "react-feather";
import { history } from "../../../../history";
import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { collection, doc, updateDoc, addDoc } from "@firebase/firestore";

function RegisterFirebase() {
  const userCollectionRef = collection(firestore, "/users");
  const [response, setResponse] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    cnic: "",
    lieseanse: "",
    confirmPass: "",
    terms: true,
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    if (state.password != state.confirmPass) {
      setResponse({
        ...response,
        error: true,
        msg: "password and confirm password does not match",
      });
      return;
    }
    setLoading(true);
    setResponse({ ...response, error: false, msg: "" });
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      let userData = user.user;
      let accessToken = userData.accessToken;
      const userCredentails = {
        admin: 0,
        uid: userData.uid,
        cnic: state.cnic,
        dob: state.dob,
        email: state.email,
        image: "",
        name: state.name,
        lieseanse: state.lieseanse,
        status: 1,
        created_at: new Date().toLocaleString().replace(",", ""),
      };
      // console.log(userData.uid);
      // console.log(userData.accessToken);
      // const res = create(userCredentails);
      await addDoc(userCollectionRef, userCredentails);
      setResponse({
        ...response,
        error: true,
        msg: "User created successfully",
      });
    } catch (error) {
      setResponse({ ...response, error: true, msg: error.message });
    }
    setLoading(false);
    // console.log(state);
  };
  const getAll = () => {
    return userCollectionRef;
  };

  const create = async (data) => {
    return await addDoc(userCollectionRef, data);
  };

  const update = async (id, value) => {
    const userDoc = doc(firestore, "users", id);
    return await updateDoc(userDoc, value);
  };

  const deleteFuc = (id) => {
    return userCollectionRef.doc(id).delete();
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
                  <h4>Register</h4>
                  <p>please register your account.</p>
                  <Form autoComplete="false" onSubmit={handleRegister}>
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        placeholder="Name"
                        required
                        value={state.name}
                        onChange={(e) =>
                          setState({ ...state, name: e.target.value })
                        }
                      />
                      <Label>Name</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="email"
                        placeholder="Email"
                        required
                        value={state.email}
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                      />
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        placeholder="Cnic"
                        required
                        value={state.cnic}
                        onChange={(e) =>
                          setState({ ...state, cnic: e.target.value })
                        }
                      />
                      <Label>Cnic</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        placeholder="Lieseanse"
                        required
                        value={state.lieseanse}
                        onChange={(e) =>
                          setState({ ...state, lieseanse: e.target.value })
                        }
                      />
                      <Label>Lieseanse</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="date"
                        placeholder="Date of Birth"
                        required
                        value={state.dob}
                        onChange={(e) =>
                          setState({ ...state, dob: e.target.value })
                        }
                      />
                      <Label>Date of Birth</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="password"
                        placeholder="Password"
                        required
                        value={state.password}
                        onChange={(e) =>
                          setState({ ...state, password: e.target.value })
                        }
                      />
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        required={false}
                        value={state.confirmPass}
                        onChange={(e) =>
                          setState({ ...state, confirmPass: e.target.value })
                        }
                      />
                      <Label>Confirm Password</Label>
                    </FormGroup>
                    <FormGroup>
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label=" I accept the terms & conditions."
                        value={state.terms}
                        required={true}
                        onChange={(e) => {
                          if (e.target.checked) {
                            console.log();
                            setState({ ...state, terms: true });
                          } else {
                            setState({ ...state, terms: false });
                          }
                        }}
                        defaultChecked={state.terms}
                      />
                    </FormGroup>
                    <p className="px-2 auth-title text-warning">
                      {response.error ? response.msg : ""}
                    </p>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple
                        onClick={() => history.push("/pages/login")}
                        color="primary"
                        outline
                      >
                        Login
                      </Button.Ripple>
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? <Spinner color="white" size="sm" /> : ""}
                        <span className="ml-50">Register</span>
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
}

export default RegisterFirebase;
