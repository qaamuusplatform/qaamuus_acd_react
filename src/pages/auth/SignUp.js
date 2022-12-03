// import node module libraries
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import http from "services/httpService"
import {
  Col,
  Alert,
  Row,
  Card,
  Form,
  Button,
  Spinner,InputGroup,
  Image,
} from "react-bootstrap";

import ProfileBackground from 'assets/images/background/profile-bg.jpg';
import axios from "axios";
// import media files
import Logo from "assets/images/brand/logo/logo-icon.svg";
import { boolean } from "yup";
export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [userRegistred, setUserRegistred] = useState(false);
  const [userNameIsExist, setUserNameIsExist] = useState(false);
  const [usernameValid, setUsernameValid] = useState('Usernamka ugu yaraan 6');
  let emailExist = true;
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleChange = async ({ target }) => {
    const { value, name } = target;
    if (value.length > 6) {
      setUserNameIsExist(await (await http.get("/api/checkingUserExist/" + value + '/')).data.isExist)
      if(userNameIsExist){
        setUsernameValid('Usernamkan wa la qabsaday');
      }
     
    } else {
      console.log(userNameIsExist);
      setUsernameValid('Usernamka ugu yaraan 6');
      setUserNameIsExist(true);
    }

  };

  async function userJoinHandleSubmit(e) {
    setFormIsLoading(true);
    setUserRegistred(false);
    e.preventDefault();
    const userData = new FormData(e.target);
    if (userData.get("password") == userData.get("comfirmPassword")) {
      if (userNameIsExist) {

        setFormError("");
      } else {
        var object = {};
        userData.forEach(function (value, key) {
          object[key] = value;
        });
        var json = JSON.stringify(object);


        await http.post("/api/userProfile-create/", json, { headers: { 'Content-Type': 'application/json' } })
          .then((userProfileResp) => {
            console.log(userProfileResp.data);
            setFormIsLoading(false);
            setUserRegistred(true);
            setFormError("");
            Redirect("/user/dashboard");
          });
      }
      // await http
      //   .get(
      //     "/api/checkUserExistEmailAndUsername/" +
      //     userData.get("username") +
      //     "/" +
      //     userData.get("email") +
      //     "/"
      //   )
      //   .then(async (userResp) => {
      //     console.log(userResp);
      //     if (userResp.data.isExist == true) {
      //       setFormError("email or username already exists");
      //       setFormIsLoading(false);
      //     } else {
      //       setFormError("");
      //       setFormIsLoading(false);
      //       try {
      //         await http
      //           .post("/api/userProfile-create/", userData)
      //           .then((userProfileResp) => {
      //             setFormIsLoading(false);
      //             setUserRegistred(true);
      //             Redirect("/student/dashboard");
      //           });
      //       } catch (error) {
      //         console.log(error);
      //         setFormIsLoading(false);
      //       }
      //     }
      //   });
    } else {
      setFormError("password and comfirm password not matched");
      setFormIsLoading(false);
    }
  }
  return (
    <Fragment>
      <br />
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Img variant="top" src={ProfileBackground} />
            <Card.Body className="p-6">
              <div>
                {/* <Link to="/">
                            <Image src={Logo} className="mb-4" alt="" />
                        </Link> */}
                {/* <h1 className="mb-1 fw-bold">Sign up</h1> */}

                {formError == "" ? (
                  ""
                ) : (
                  <Alert variant="danger">{formError}</Alert>
                )}
                {userRegistred ? (
                  <Alert variant="success">
                    User was succesfully registred
                  </Alert>
                ) : (
                  ""
                )}
              </div>

              {/* Form */}
              <Form onSubmit={userJoinHandleSubmit} controlId="validationFormik01">
                <Row>

                  <Col lg={8} md={8} className="mb-3">
                    {/* User Name */}
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="fullName"
                      size="sm"
                      name="fullName"
                      placeholder="Full Name"
                      required
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
                        onChange={handleChange}
                        name="username"
                        isInvalid={userNameIsExist == true ? true : false}
                        isValid={userNameIsExist == true ? false : true}
                        placeholder="Username auth"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {usernameValid}
                      </Form.Control.Feedback>
                    </InputGroup>
                    {/* <Form.Label id="usernameIsValid" >Email </Form.Label> */}
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* email */}
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      id="email"
                      size="sm"
                      placeholder="Email address here"
                      required
                    />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      name="password"
                      size="sm"
                      placeholder="**************"
                      required
                    />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Comfirm password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      name="comfirmPassword"
                      id="password"
                      size="sm"
                      placeholder="**************"
                      required
                    />
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
                  <Button variant="primary" size="sm" disabled>
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
                  <Button variant="primary" type="submit" size="sm">
                    Diiwaangali
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
