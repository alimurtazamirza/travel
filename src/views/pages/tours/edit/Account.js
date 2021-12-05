import React, { useState, useEffect, useRef } from "react";
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Spinner,
  Table,
} from "reactstrap";
import userImg from "../../../../assets/img/profile/user-dummy.jpg";
import { auth, firestore, storage, useAuth } from "../../../../firebase-config";
import "../../../../app.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";

const UserAccountTab = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [departure, setDeparture] = useState(0);
  const [remaining, setRemaining] = useState("");
  const [seats, setSeats] = useState("");
  const [description, setDescription] = useState("");
  const [shortdes, setShortdes] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageUploadName, setImageUploadName] = useState("");
  const [response, setResponse] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const tourCollectionRef = collection(firestore, "tours");
  const storageRef = ref(storage, `tours/${imageUploadName}`);
  const currentUser = useAuth();
  // const inputFile = useRef(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      let imageFile = e.target.files[0];
      let imageFileName = imageFile.name;
      let filename = imageFileName.split(".").slice(0, -1).join(".");
      let random = Date.now().toString(36);
      let imageFileExtension = imageFileName.split(".").pop();
      setImageFile(imageFile);
      setImageUploadName(filename + random + "." + imageFileExtension);
      console.log(
        imageFileName +
          "  / " +
          filename +
          " / " +
          random +
          " / " +
          imageFileExtension
      );
    }
  };

  const handleUpload = async () => {
    try {
      const uploadImageReef = await uploadBytes(storageRef, imageFile);
      const downloadUrl = await getDownloadURL(storageRef);
      return { error: "0", url: downloadUrl };
    } catch (error) {
      // console.log("error is : " + error.message);
      return { error: "1", msg: error.message };
    }
  };
  const HandleImageChange = async () => {};
  const HandleImageDelete = async () => {
    try {
      // setSpinner(true);
      const deleteImageReef = await deleteObject(storageRef);
      const userDoc = doc(firestore, "tours", id);
      const newFields = {
        image: "",
        imagename: "",
      };
      await updateDoc(userDoc, newFields);
      setImage("");
      // setSpinner(false);
    } catch (error) {
      console.log("error is : " + error.message);
      // setSpinner(false);
    }
  };

  const createTour = async (e) => {
    e.preventDefault();
    try {
      if (id === null || id === "") {
        setLoading(true);
        setResponse({ error: false, msg: "" });
        let userCredentails = {
          title: title,
          uid: currentUser.uid,
          city: city,
          remaining: remaining,
          departure: departure,
          seats: seats,
          description: description,
          shortdes: shortdes,
          created_at: new Date().toLocaleString(),
        };
        if (imageFile != "") {
          const uploadImageReef = await uploadBytes(storageRef, imageFile);
          const downloadUrl = await getDownloadURL(storageRef);
          userCredentails = {
            ...userCredentails,
            image: downloadUrl,
            imagename: imageUploadName,
          };
        }

        const addDocResponse = await addDoc(tourCollectionRef, userCredentails);
        setResponse({
          ...response,
          error: true,
          msg: "Trip created successfully",
        });
      } else {
        setLoading(true);
        setResponse({ ...response, error: false, msg: "" });
        let newFields = {
          title: title,
          uid: currentUser.uid,
          city: city,
          departure: departure,
          seats: seats,
          description: description,
          shortdes: shortdes,
        };
        if (imageUploadName != "") {
          console.log(imageUploadName);
          const uploadImageReef = await uploadBytes(storageRef, imageFile);
          const downloadUrl = await getDownloadURL(storageRef);
          newFields = {
            ...newFields,
            image: downloadUrl,
            imagename: imageUploadName,
          };
          setImage(downloadUrl);
        }
        const userDoc = doc(firestore, "tours", id);
        const userData = await updateDoc(userDoc, newFields);
        setResponse({
          ...response,
          error: true,
          msg: "Trip updated successfully",
        });
      }
    } catch (error) {
      setResponse({ ...response, error: true, msg: error.message });
    }
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setCity("");
    setDeparture("");
    setSeats("");
    setImageUploadName("");
    setDescription("");
    setShortdes("");
    setImage("");
    setResponse("");
  };

  useEffect(() => {
    if (!(id === null || id === "")) {
      setSpinner(true);
      const getUser = async () => {
        const userDoc = doc(firestore, "tours", id);
        const userData = await getDoc(userDoc);
        const list = userData.data();
        setTitle(list.title ?? "");
        setCity(list.city ?? "");
        setImage(list.image ?? "");
        setImageUploadName(list.imagename ?? "");
        setDeparture(list.departure ?? "");
        setRemaining(list.remaining ?? "");
        setSeats(list.seats ?? "");
        setDescription(list.description ?? "");
        setShortdes(list.shortdes ?? "");
        setSpinner(false);
      };

      getUser();
    }
  }, []);

  return (
    <div>
      {spinner ? (
        <div className="text-center">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <Row>
          <Col sm="12">
            <Media className="mb-2">
              {!(id === null || id === "") ? (
                <div>
                  <Media className="mr-2 my-25" left href="#">
                    <Media
                      className="users-avatar-shadow rounded"
                      object
                      src={image == "" || image == null ? userImg : image}
                      alt="user profile image"
                      height="350"
                      width="600"
                    />
                  </Media>
                  <Media className="mt-2" body>
                    <Media
                      className="font-medium-1 text-bold-600"
                      tag="p"
                      heading
                    >
                      {title}
                    </Media>
                    <div className="d-flex flex-wrap">
                      <Button.Ripple
                        color="danger"
                        outline
                        onClick={HandleImageDelete}
                      >
                        Remove Display picture
                      </Button.Ripple>
                    </div>
                  </Media>
                </div>
              ) : (
                ""
              )}
            </Media>
          </Col>
          <Col sm="12">
            <Form onSubmit={createTour}>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      required
                      disabled={false}
                      placeholder=""
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Display Image</Label>
                    <Input
                      type="file"
                      id="file"
                      placeholder=""
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">city</Label>
                    <Input
                      type="text"
                      id="city"
                      required
                      placeholder=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Departure Date</Label>
                    <Input
                      type="date"
                      id="departure"
                      placeholder=""
                      required
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Remaning Seats</Label>
                    <Input
                      type="text"
                      id="remaining"
                      required
                      disabled={true}
                      placeholder=""
                      value={remaining}
                      onChange={(e) => setRemaining(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="status">Total Seats</Label>
                    <Input
                      type="text"
                      required
                      id="seats"
                      value={seats}
                      placeholder=""
                      onChange={(e) => setSeats(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="name">Description</Label>
                    <Input
                      type="textarea"
                      id="description"
                      className="textarea-height"
                      required
                      placeholder=""
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="name">Short Descripton</Label>
                    <Input
                      type="textarea"
                      className="textarea-height"
                      id="shortdes"
                      required
                      placeholder=""
                      value={shortdes}
                      onChange={(e) => setShortdes(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <p className="px-2 auth-title text-warning">
                    {response.error ? response.msg : ""}
                  </p>
                </Col>
                <Col
                  className="d-flex justify-content-end flex-wrap mt-2"
                  sm="12"
                >
                  <Button.Ripple
                    className="mr-1"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? <Spinner color="white" size="sm" /> : ""}
                    <span className="ml-50">Save Changes</span>
                  </Button.Ripple>
                  <Button.Ripple color="flat-warning" onClick={resetForm}>
                    Reset
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default UserAccountTab;
