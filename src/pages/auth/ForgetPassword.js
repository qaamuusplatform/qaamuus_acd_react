// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';

// import media files
import Logo from 'assets/images/brand/logo/logo.svg';
import logoCard from "assets/images/brand/logo/logoCard.svg";
export default function ForgetPassword() {

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <Row>
                <Col lg={3} md={3} sm={3} className="py-8 py-xl-0">
                  <Link to="/">
                    <Image width={90} src={logoCard} className="mb-4" alt="" />
                  </Link>
                </Col>
                <Col lg={9} md={9} sm={9} className="py-8 py-xl-0">

                  <h2 style={{"padding-top":"10px"}} className="mb-1 fw-bold">Forget Password</h2>
                  <span>
                    Account  ?{" "}
                    <Link to="/join/sign-up/" className="ms-1">
                      nagu soo
                    </Link>
                  </span>
                </Col>





              </Row>
              {/* Form */}
              <Form>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    {/*  email */}
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3 d-grid gap-2">
                    {/* Button */}
                    <Button variant="primary" type="submit">
                      Send Reset Link
                    </Button>
                  </Col>
                </Row>
                <span>
                  Return to <Link to="/authentication/sign-in">Sign in</Link>
                </span>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
