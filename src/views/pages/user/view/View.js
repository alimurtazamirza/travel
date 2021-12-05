import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Spinner,
  Badge,
  Button,
} from "reactstrap";
import { Edit, Trash, Users } from "react-feather";
import { Link } from "react-router-dom";
import { firestore } from "../../../../firebase-config";
import userImg from "../../../../assets/img/profile/user-dummy.jpg";
import "../../../../assets/scss/pages/users.scss";
import { history } from "../../../../history";
import { doc, getDoc, deleteDoc } from "@firebase/firestore";

const UserView = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    if (id === null || id === "") {
      history.push("/users");
    }

    let mounted = true;
    const getUser = async () => {
      try {
        const userDoc = doc(firestore, "users", id);
        const userData = await getDoc(userDoc);
        const list = userData.data();

        if (mounted) {
          setUsers(list);
        }
        setSpinner(false);
      } catch (error) {
        console.log(error.message);
      }
      return () => (mounted = false);
    };
    getUser();
  }, []);

  const deleteUser = async () => {
    try {
      const userDoc = doc(firestore, "users", id);
      const result = await deleteDoc(userDoc);
      history.push("/users");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      {spinner ? (
        <div className="text-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        <Media
                          className="rounded mr-2"
                          object
                          src={
                            users.image == "" || users.image == null
                              ? userImg
                              : users.image
                          }
                          alt="Generic placeholder image"
                          height="112"
                          width="112"
                        />
                      </Media>
                      <Media body>
                        <Row>
                          <Col sm="9" md="6" lg="5">
                            <div className="users-page-view-table">
                              {/* <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Username
                                </div>
                                <div>aliMurtaza22</div>
                              </div> */}
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Name
                                </div>
                                <div>{users.name}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Email
                                </div>
                                <div className="text-truncate">
                                  <span>{users.email}</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="12" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Status
                                </div>
                                <div>
                                  <Badge
                                    color={
                                      users.status === 0
                                        ? "light-danger"
                                        : "light-success"
                                    }
                                    pill
                                  >
                                    {users.status == 1 ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Role
                                </div>
                                <div>{users.role}</div>
                              </div>
                              {/* <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Company
                                </div>
                                <div>
                                  <span>North Star Aviation Pvt Ltd</span>
                                </div>
                              </div> */}
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                  <Col className="mt-1 pl-0" sm="12">
                    <Link to={"/users/edit?id=" + id}>
                      <Button.Ripple className="mr-1" color="primary" outline>
                        <Edit size={15} />
                        <span className="align-middle ml-50">Edit</span>
                      </Button.Ripple>
                    </Link>
                    <Button.Ripple color="danger" outline onClick={deleteUser}>
                      <Trash size={15} />
                      <span className="align-middle ml-50">Delete</span>
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Birth Date
                    </div>
                    <div> {users.dob}</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Mobile
                    </div>
                    <div>{users.mobile}</div>
                  </div>
                  {/* <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Website
                    </div>
                    <div className="text-truncate">
                      <span>https://rowboat.com/insititious/Crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Languages
                    </div>
                    <div className="text-truncate">
                      <span>English, French</span>
                    </div>
                  </div> */}
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Lieseanse
                    </div>
                    <div className="text-truncate">
                      <span>{users.lieseanse}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Created At
                    </div>
                    <div className="text-truncate">
                      <span>{users.created_at}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">Cnic</div>
                    <div className="text-truncate">
                      <span>{users.cnic}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};
export default UserView;
