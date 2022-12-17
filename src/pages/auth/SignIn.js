// import node module libraries
import React, { useState } from "react";
import { login, getLoggedInUser } from "services/authService";
import { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Image,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import Logo from "assets/images/brand/logo/logo-icon.svg";
import http from "services/httpService";
import { toast } from "react-toastify";

// import media files
// import Logo from "assets/images/brand/logo/logo-icon.svg";

export default function SignIn() {
  const history = useHistory();
  const [form, setForm] = useState({ username: "", password: "" });
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormIsLoading(true);
    setFormError(false);
    try {
      await http
        .post(
          "api/jwtAuthToken-login/",
          JSON.stringify({ username: form.username, password: form.password }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((userLoggedResp) => {
          if (userLoggedResp.data.status == 200) {
            localStorage.setItem("access", userLoggedResp.data.access);
            toast.success("si guul leh ayaad u soo gashay");
            setFormIsLoading(false);
            history.replace("/user/dashboard/");
          }
        });
    } catch (error) {
      console.log("redsd");
      console.log(error);
      toast.error(error.response.data.detail);
      setFormError(true);
      setFormIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                {/* <Link to="/">
                <Image src={Logo} className="mb-4" alt="" />
              </Link> */}
                <h1 className="mb-1 fw-bold">Sign in</h1>
                <span>
                  Account kuu ma furna ?{" "}
                  <Link to="/join/sign-up/" className="ms-1">
                    nagu soo biir
                  </Link>
                </span>
              </div>
              {/* Form */}
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Username or email */}
                    <Form.Label>Username or email </Form.Label>
                    <Form.Control
                      type="text"
                      id="email"
                      name="username"
                      onChange={handleChange}
                      isInvalid={formError ? true : false}
                      value={form.username}
                      placeholder="Email ama usernamekaga"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Password </Form.Label>
                    <InputGroup className="mb-3">
                      {/* Password */}
                      <Form.Control
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        value={form.password}
                        name="password"
                        isInvalid={formError ? true : false}
                        onChange={handleChange}
                        placeholder="*****"
                        required
                      />
                      <InputGroup.Text>
                        <i
                          onClick={togglePassword}
                          className={
                            passwordShown ? "fas fa-eye-slash" : "fas fa-eye"
                          }
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Checkbox */}
                    <div className="d-md-flex justify-content-between align-items-center">
                      <Form.Group
                        className="mb-3 mb-md-0"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Remember me" />
                      </Form.Group>
                      <Link to="/authentication/forget-password">
                        Forgot your password?
                      </Link>
                    </div>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                    {/* Button */}
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
                        Sing In{" "}
                      </Button>
                    )}
                  </Col>
                </Row>
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
