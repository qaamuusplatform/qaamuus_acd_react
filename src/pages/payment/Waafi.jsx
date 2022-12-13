import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import Joi from "joi";

function Waafi({ handleClose }) {
  const [input, setInput] = useState({ phone: "" });
  const [error, setError] = useState("");

  const handleOnChange = ({ target }) => {
    const { value, name } = target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const schema = Joi.object({
    phone: Joi.number().integer().required(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { phone } = input;
    console.log(phone);

    if (
      !phone.startsWith(61) &&
      !phone.startsWith(63) &&
      !phone.startsWith(90)
    ) {
      setError("Number must be start with 6xxxxxx or 9xxxxxx");
    } else {
      setError("");
    }

    const { error } = schema.validate(input);

    if (error) return setError(error.details[0].message);
  };
  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Row>
        {/* Card number */}
        <Col md={8} sm={12} className="mb-3">
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <input
              type="text"
              placeholder="xxx-xxx-xxx"
              value={input.phone}
              name={"phone"}
              onChange={(e) => handleOnChange(e)}
              className="form-control bg-white px-4 py-2.1"
            />

            <span className="text-danger">{error}</span>
          </Form.Group>
        </Col>
        {/* CVV */}

        {/* Button */}
        <Col md={6} sm={12}>
          <Button variant="primary w-50" type="submit">
            Pay
          </Button>{" "}
          <Button variant="outline-primary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Waafi;
