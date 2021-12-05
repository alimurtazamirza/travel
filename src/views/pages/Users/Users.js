import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
// import FormikValidation from "../post/FormikValidation";
import DataTable from "../Tables/DataTable";
import { firestore } from "../../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const userCollectionRef = collection(firestore, "users");
  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      try {
        const userData = await getDocs(userCollectionRef);
        const list = userData.docs
          .filter((user) => {
            let temp = user.data();
            if (temp.admin == 0) {
              return true;
            } else {
              return false;
            }
          })
          .map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
              // image: require("../../../assets/img/profile/user-dummy.jpg"),
            };
          });
        if (mounted) {
          setUsers(list);
        }
        setSpinner(false);
      } catch (error) {
        console.log(error.message);
      }
      return () => (mounted = false);
    };
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Users"
        breadCrumbParent="Index"
        breadCrumbActive="All"
      />
      <Row>
        {/* <Col sm="12">
            <FormikValidation />
          </Col> */}
        <Col sm="12">
          {spinner ? (
            <div className="text-center">
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <DataTable data={users} />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Users;
