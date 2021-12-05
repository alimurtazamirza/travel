import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
// import FormikValidation from "../post/FormikValidation";
import DataTable from "../../Tables/ToursTable";
import { firestore } from "../../../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const Lists = () => {
  const [tours, setTours] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const userCollectionRef = collection(firestore, "tours");

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      try {
        const userData = await getDocs(userCollectionRef);
        const list = userData.docs.map((doc) => {
          let remain =
            doc.data().remaining == "" || doc.data().remaining == undefined
              ? 0
              : doc.data().remaining;
          return {
            ...doc.data(),
            id: doc.id,
            remaining: remain,
          };
        });
        if (mounted) {
          setTours(list);
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
        breadCrumbTitle="Tours"
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
            <DataTable data={tours} />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Lists;
