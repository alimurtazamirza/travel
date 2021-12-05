import React from "react";
import { Card, CardBody, Badge, Input, Button } from "reactstrap";
import DataTableComponent from "react-data-table-component";
import { Trash2, Search, Edit, Eye } from "react-feather";
import { history } from "../../../history";
import { firestore } from "../../../firebase-config";
import "../../../app.css";
import { doc, deleteDoc } from "@firebase/firestore";

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple
          color="primary"
          onClick={() => history.push("/users/tours/edit")}
        >
          Add New
        </Button.Ripple>
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={(e) => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};
const deleteUser = async (id) => {
  try {
    const userDoc = doc(firestore, "tours", id);
    const result = await deleteDoc(userDoc);
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};

class ToursTable extends React.Component {
  state = {
    columns: [
      {
        name: "Display Image",
        selector: "title",
        sortable: true,
        minWidth: "200px",
        cell: (row) => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className=""
                height="60"
                width="70"
                src={
                  row.image == "" || row.image == null
                    ? require("../../../assets/img/profile/background.jpg")
                        .default
                    : row.image
                }
                alt={row.name}
              />
            </div>
            {/* <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0"
              >
                {row.name}
              </span>
              <small title={row.email}>{row.email}</small>
            </div> */}
          </div>
        ),
      },
      {
        name: "Departure Date",
        selector: "departure",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.departure}</p>
        ),
      },
      {
        name: "Title",
        selector: "title",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.title}</p>
        ),
      },
      {
        name: "Seats",
        selector: "seats",
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.seats}</p>,
      },
      {
        name: "Remaining Seats",
        selector: "remaining",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{row.seats - row.remaining}</p>
        ),
      },
      {
        name: "Date Created",
        selector: "date",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.created_at}</p>
        ),
      },
      {
        name: "Actions",
        selector: "actions",
        sortable: true,
        cell: (row) => (
          <div>
            <span className="mr-50 pointer-change">
              <Edit
                size={16}
                onClick={() => history.push("/users/tours/edit?id=" + row.id)}
              />
            </span>
            <span>
              <Trash2
                className="mr-50 pointer-change"
                size={16}
                onClick={() => deleteUser(row.id)}
              />
            </span>
            {/* <span>
              <Eye
                className="pointer-change"
                size={16}
                onClick={() => history.push("/users/tours/view?id=" + row.id)}
              />
            </span> */}
          </div>
        ),
      },
    ],
    data: this.props.data,
    filteredData: [],
    value: "",
  };

  handleFilter = (e) => {
    let value = e.target.value;
    let data = this.state.data;
    let filteredData = this.state.filteredData;
    this.setState({ value });

    if (value.length) {
      filteredData = data.filter((item) => {
        let startsWithCondition =
          item.title
            ?.toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.created_at
            ?.toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.departure
            ?.toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.remaining
            ?.toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.seats?.toString().toLowerCase().startsWith(value.toLowerCase());
        let includesCondition =
          item.title?.toString().toLowerCase().includes(value.toLowerCase()) ||
          item.created_at
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.departure
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.remaining
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.seats?.toString().toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      this.setState({ filteredData });
    }
  };

  render() {
    let { dataOne, columns, value, filteredData } = this.state;
    let data = this.props.data;
    return (
      <Card>
        {/* <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader> */}
        <CardBody className="rdt_Wrapper">
          <DataTableComponent
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            pagination
            subHeader
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
        </CardBody>
      </Card>
    );
  }
}

export default ToursTable;
