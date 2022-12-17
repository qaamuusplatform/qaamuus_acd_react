// import node module libraries
import { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "appStyle.css";
import http from "services/httpService";
import {
  Col,
  Alert,
  Row,
  Card,
  Form,
  Button,
  Spinner,
  InputGroup,
  Image,
  Modal,
} from "react-bootstrap";

import ProfileBackground from "assets/images/background/profile-bg.jpg";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yub from "yup";
import { getAllUsernamesAnsEmails } from "services/authService";
export default function SignUp() {
  const history = useHistory();
  const existUsernames = [
    "asdasdas",
    "dasdasdas",
    "maxamedj",
    "maxamed",
    "axamed",
  ];

  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
    setFormIsLoading(false);
  };
  const handleShow = () => setModalShow(true);

  const [emailVerified, setEmailVerified] = useState(false);

  const onSubmit = () => {
    setFormIsLoading(true);
    // http.get(`api/sendActivationEmailCode/${registringUserForm.values.email}/`).then((resp) => {
    //     setActivationCode(resp.data.sendedCode)
    //   })

    http
      .post(
        "/api/userProfile-create/",
        JSON.stringify(registringUserForm.values),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((userProfileResp) => {
        console.log(userProfileResp.data);
        setFormIsLoading(false);
        registringUserForm.resetForm();
        toast.success(
          "Waad ku guulaysatay iska diiwaangalinta academiyadda qaamuus"
        );
        history.replace("/auth/login/");
      });
    // if(emailVerified){

    // }else{
    //   setModalShow(true)
    // }
  };
  const registringUserForm = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      comfirmPassword: "",
      fullName: "",
      activationCode: "",
    },
    validationSchema: yub.object().shape({
      email: yub
        .string()
        .email("Soo Gali Email Gira")
        .required("Soo Gali Email"),
      password: yub.string().min(4).required(),
      username: yub
        .string()
        .min(4)
        .required()
        .test(
          "uniqueUsername",
          "usernamekan horay ayuu u jiray",
          function (_theUsername) {
            if (existUsernames.includes(_theUsername)) {
              return false;
            } else {
              return true;
            }
          }
        ),
      fullName: yub.string().min(5).required("Magaca Oo Saddexan"),
      comfirmPassword: yub
        .string()
        .oneOf([yub.ref("password"), null], "Labada Password  isma lahan"),
    }),
    onSubmit,
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function emailVerifieSubmit(e) {
    // setUserRegistred(false);
    e.preventDefault();
  }

  return (
    <Fragment>
      <Modal show={modalShow} onHide={handleClose} centered>
        <Form onSubmit={emailVerifieSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Hubinta Emailka</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col lg={12} md={12} sm={12} className="mb-3">
              <h4 className="mb-0">Email Address</h4>
              <p>
                Fariin ayaa laguugu diray emailkan{" "}
                <span className="text-success">
                  {registringUserForm.values.email}
                </span>
              </p>
              <Form.Group>
                <Form.Label htmlFor="email">Codeka Hubinta</Form.Label>
                <Form.Control
                  placeholder="21 12 12"
                  type="number"
                  id="activateCode"
                  value={registringUserForm.values.activationCode}
                  onChange={registringUserForm.handleChange}
                  onBlur={registringUserForm.handleBlur}
                  // isInvalid={sendedCodeActive == true ? true : false}
                  // isValid={sendedCodeActive == true ? false : true}
                  required
                />
              </Form.Group>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Active Now
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <br />
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={10} md={12} className="py-8 py-xl-0">
          <Card>
            <Card.Img variant="top" src={ProfileBackground} />
            <Card.Body className="p-6">
              {/* Form */}
              <Form
                onSubmit={registringUserForm.handleSubmit}
                controlId="validationFormik01"
              >
                <Row>
                  <Col lg={8} md={8} className="mb-3">
                    {/* User Name */}
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="fullName"
                      value={registringUserForm.values.fullName}
                      onChange={registringUserForm.handleChange}
                      onBlur={registringUserForm.handleBlur}
                      size="sm"
                      name="fullName"
                      placeholder="Full Name"
                    />
                  </Col>
                  <Col lg={4} md={4} className="mb-3">
                    {/* User Name */}
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        id="username"
                        size="sm"
                        value={registringUserForm.values.username}
                        onChange={registringUserForm.handleChange}
                        onBlur={registringUserForm.handleBlur}
                        isInvalid={
                          registringUserForm.errors.username &&
                          registringUserForm.touched.username
                            ? true
                            : false
                        }
                        isValid={
                          registringUserForm.errors.username &&
                          registringUserForm.touched.username
                            ? false
                            : true
                        }
                        name="username"
                        placeholder="Username auth"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {registringUserForm.errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                    {/* <Form.Label id="usernameIsValid" >Email </Form.Label> */}
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* email */}
                    <Form.Label>Email </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        name="email"
                        value={registringUserForm.values.email}
                        onChange={registringUserForm.handleChange}
                        onBlur={registringUserForm.handleBlur}
                        id="email"
                        isInvalid={
                          registringUserForm.errors.email &&
                          registringUserForm.touched.email
                            ? true
                            : false
                        }
                        size="sm"
                        placeholder="Email address here"
                      />
                      <Form.Control.Feedback type="invalid">
                        {registringUserForm.errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  {/* <Col lg={3} md={3} className="mb-3">
                    <Form.Label style={{ "color": "white" }} className="sm-none" >Email </Form.Label>
                    <br></br>
                    <Button variant="warning" style={{ "color": "white" }} onClick={handleShow} type="button" size="sm"> HUBI EMAILKA </Button>
                  </Col> */}
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      value={registringUserForm.values.password}
                      onChange={registringUserForm.handleChange}
                      onBlur={registringUserForm.handleBlur}
                      isInvalid={
                        registringUserForm.errors.password &&
                        registringUserForm.touched.password
                          ? true
                          : false
                      }
                      id="password"
                      name="password"
                      size="sm"
                      placeholder="**************"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {registringUserForm.errors.password}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Comfirm password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      value={registringUserForm.values.comfirmPassword}
                      onChange={registringUserForm.handleChange}
                      onBlur={registringUserForm.handleBlur}
                      isInvalid={
                        registringUserForm.errors.comfirmPassword &&
                        registringUserForm.touched.comfirmPassword
                          ? true
                          : false
                      }
                      name="comfirmPassword"
                      id="password"
                      size="sm"
                      placeholder="**************"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {registringUserForm.errors.comfirmPassword}
                    </Form.Control.Feedback>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Checkbox */}
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input
                        type="checkbox"
                        onClick={togglePassword}
                      />
                      <Form.Check.Label>SHOW PASSWORD</Form.Check.Label>
                    </Form.Check>
                  </Col>
                </Row>
                {formIsLoading ? (
                  <Button variant="primary" size="md" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &nbsp; Loading...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit" size="md">
                    {" "}
                    Diiwaangali{" "}
                  </Button>
                )}
              </Form>
              <hr className="my-4" />
              <div className="mt-4 text-center">
                {/* Facebook */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-facebook"
                >
                  <i className="fab fa-facebook"></i>
                </Link>{" "}
                {/* Twitter */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>{" "}
                {/* LinkedIn */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>{" "}
                {/* GitHub */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-github"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
