import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label
} from "reactstrap"
import { Formik, Field, Form } from "formik"
import PostApi from "../../../api/Posts"
import * as Yup from "yup"
const styles = {
  section: {
    left: "1.7em"
  }
};


const formSchema = Yup.object().shape({
  title: Yup.string().required("Required Field"),
  body: Yup.string().required('Required Field')
})

const submitForm = async (data) => {
  // console.log(data);
  const response = await PostApi.getPosts();
  if (!response.ok) {
    console.log('something went wronge');
    return;
  }
  let { status, message} = response.data;
  // if (success) {
  //   dispatch(apiUpdateUser(result));
  //   restoreUser(result);
  // }
};

class FormValidation extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle> Create Post</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              title: "",
              body: ""
            }}
            validationSchema={formSchema}
            onSubmit={submitForm}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup className="my-3">
                  <Label for="title">Title</Label>
                  <Field
                    name="title"
                    id="title"
                    className={`form-control ${errors.title &&
                      touched.title &&
                      "is-invalid"}`}
                  />
                  {errors.title && touched.title ? (
                    <div className="invalid-tooltip mt-25" style={styles.section}>{errors.title}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className="my-3">
                  <Label for="body">Body</Label>
                  <Field
                    component="textarea"
                    name="body"
                    id="body"
                    className={`form-control ${errors.body &&
                      touched.body &&
                      "is-invalid"}`}
                  />
                  {errors.body && touched.body ? (
                    <div className="invalid-tooltip mt-25" style={styles.section}>{errors.body}</div>
                  ) : null}
                </FormGroup>
                <Button.Ripple color="primary" type="submit">
                  Submit
                </Button.Ripple>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    )
  }
}
export default FormValidation
