import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import SubscribersGained from "./ui-elements/cards/statistics/SubscriberGained";
import RevenueGenerated from "./ui-elements/cards/statistics/RevenueGenerated";
import QuaterlySales from "./ui-elements/cards/statistics/QuaterlySales";
import OrdersReceived from "./ui-elements/cards/statistics/OrdersReceived";

import { firestore } from "../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";

const Home = () => {
  const userCollectionRef = collection(firestore, "users");
  const toursCollectionRef = collection(firestore, "tours");
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [drivers, setDriver] = useState([]);
  const [tours, setTours] = useState([]);
  const [spinner, setSpinner] = useState(true);
  let activeTemp = 0;
  let driversTemp = 0;

  useEffect(() => {
    let mounted = true;
    const getUsers = async () => {
      try {
        const userData = await getDocs(userCollectionRef);
        const toursData = await getDocs(toursCollectionRef);
        setTours(toursData.docs.length);
        const list = userData.docs.map((doc) => {
          let user = doc.data();

          if (user.admin == 2) {
            driversTemp++;
          }
          if (user.status == 1) {
            activeTemp++;
          }
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        if (mounted) {
          setUsers(list);
        }
        setActive(activeTemp);
        setDriver(driversTemp);
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
      <Row className="match-height">
        <Col lg="3" md="6" sm="6">
          <SubscribersGained numbers={users.length} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <RevenueGenerated numbers={tours} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <QuaterlySales numbers={drivers} />
        </Col>
        <Col lg="3" md="6" sm="6">
          <OrdersReceived numbers={active} />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
