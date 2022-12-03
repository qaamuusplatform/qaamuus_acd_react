import React from "react";

function Input(props) {
  return (
    <div>
      <Row>
        <Col lg={12} md={12} className="mb-3">
          {/* Username or email */}
          <Form.Label>Username or email </Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Email address here"
            required
          />
        </Col>
        <Col lg={12} md={12} className="mb-3">
          {/* Password */}
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="**************"
            required
          />
        </Col>
        <Col lg={12} md={12} className="mb-3">
          {/* Checkbox */}
          <div className="d-md-flex justify-content-between align-items-center">
            <Form.Group className="mb-3 mb-md-0" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Link to="/authentication/forget-password">
              Forgot your password?
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Input;

// <Col lg={12} md={12} className="mb-0 d-grid gap-2">
// {/* Button */}
// <Button variant="primary" type="submit">
//   Sign in
// </Button>
// </Col>
