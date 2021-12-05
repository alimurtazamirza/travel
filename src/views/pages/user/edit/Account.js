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
import { auth, firestore, storage } from "../../../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState(0);
  const [email, setEmail] = useState("");
  const [lieseanse, setLieseanse] = useState("");
  const [cnic, setCnic] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageUploadName, setImageUploadName] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [response, setResponse] = useState({ error: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const userCollectionRef = collection(firestore, "users");
  const storageRef = ref(storage, `images/${imageUploadName}`);
  // const inputFile = useRef(null);
  console.log("upload image name " + imageUploadName);
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
      const userDoc = doc(firestore, "users", id);
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

  const createUser = async (e) => {
    e.preventDefault();
    try {
      if (id === null || id === "") {
        if (password != conpassword) {
          setResponse({
            error: true,
            msg: "password and confirm password does not match",
          });
          return;
        }
        setLoading(true);
        setResponse({ error: false, msg: "" });
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const uploadImageReef = await uploadBytes(storageRef, imageFile);
        const downloadUrl = await getDownloadURL(storageRef);
        const userCredentails = {
          admin: 0,
          uid: user.user.uid,
          cnic: cnic,
          dob: dob,
          email: email,
          image: downloadUrl,
          name: name,
          imagename: imageUploadName,
          lieseanse: lieseanse,
          mobile: mobile,
          status: status,
          created_at: new Date().toLocaleString().replace(",", ""),
        };

        const addDocResponse = await addDoc(userCollectionRef, userCredentails);
        setResponse({
          ...response,
          error: true,
          msg: "User created successfully",
        });
      } else {
        setLoading(true);
        setResponse({ ...response, error: false, msg: "" });
        let newFields = {
          cnic: cnic,
          dob: dob,
          name: name,
          lieseanse: lieseanse,
          mobile: mobile,
          status: status,
        };
        if (imageUploadName != "") {
          console.log("inside");
          const uploadImageReef = await uploadBytes(storageRef, imageFile);
          const downloadUrl = await getDownloadURL(storageRef);
          newFields = {
            ...newFields,
            image: downloadUrl,
            imagename: imageUploadName,
          };
          setImage(downloadUrl);
        }
        const userDoc = doc(firestore, "users", id);
        const userData = await updateDoc(userDoc, newFields);
        setResponse({
          ...response,
          error: true,
          msg: "User updated successfully",
        });
      }
    } catch (error) {
      setResponse({ ...response, error: true, msg: error.message });
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setDob("");
    setStatus("");
    setEmail("");
    setLieseanse("");
    setImageUploadName("");
    setCnic("");
    setMobile("");
    setImage("");
    setPassword("");
    setConpassword("");
    setResponse("");
  };

  useEffect(() => {
    if (!(id === null || id === "")) {
      setSpinner(true);
      const getUser = async () => {
        const userDoc = doc(firestore, "users", id);
        const userData = await getDoc(userDoc);
        const list = userData.data();
        setName(list.name ?? "");
        setDob(list.dob ?? "");
        setImage(list.image ?? "");
        setStatus(list.status ?? "");
        setEmail(list.email ?? "");
        setImageUploadName(list.imagename ?? "");
        setLieseanse(list.lieseanse ?? "");
        setCnic(list.cnic ?? "");
        setMobile(list.mobile ?? "");
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
                      height="84"
                      width="84"
                    />
                  </Media>
                  <Media className="mt-2" body>
                    <Media
                      className="font-medium-1 text-bold-600"
                      tag="p"
                      heading
                    >
                      {name}
                    </Media>
                    <div className="d-flex flex-wrap">
                      {/* <Button.Ripple
                        className="mr-1"
                        color="primary"
                        outline
                        onClick={HandleImageChange}
                      >
                        Change
                      </Button.Ripple> */}
                      <Button.Ripple
                        color="danger"
                        outline
                        onClick={HandleImageDelete}
                      >
                        Remove Avatar
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
            <Form onSubmit={createUser}>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      required
                      disabled={id === null || id === "" ? false : true}
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Profile Image</Label>
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
                    <Label for="username">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      required
                      placeholder=""
                      disabled={!(id === null || id === "") ? true : false}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Confirm Password</Label>
                    <Input
                      type="password"
                      id="conpassword"
                      placeholder=""
                      disabled={!(id === null || id === "") ? true : false}
                      required
                      value={conpassword}
                      onChange={(e) => setConpassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="username">Birth Date</Label>
                    <Input
                      type="date"
                      id="date"
                      required
                      placeholder=""
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      type="select"
                      name="status"
                      required
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      required
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="name">Lieseanse</Label>
                    <Input
                      type="text"
                      id="lieseanse"
                      required
                      placeholder=""
                      value={lieseanse}
                      onChange={(e) => setLieseanse(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="email">Cnic</Label>
                    <Input
                      type="text"
                      required
                      id="cnic"
                      placeholder=""
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <Label for="company">Mobile</Label>
                    <Input
                      type="number"
                      id="company"
                      required
                      placeholder=""
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
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
