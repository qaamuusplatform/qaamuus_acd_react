import React, { useState, useContext } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import Joi from "joi";
import { CurrentUserContext } from "services/currentUserContext";

import { pay } from "services/paymentService";

function Waafi({ handleClose, event }) {
  const [input, setInput] = useState({
    number: "",
    userId: "",
    money: "",
    evtId: "",
  });
  const [error, setError] = useState("");

  const { currentUser } = useContext(CurrentUserContext);

  const handleOnChange = ({ target }) => {
    const { value, name } = target;

    setInput((prev) => ({ ...prev, [name]: value }));

    if (event && currentUser) {
      setInput((prev) => ({
        ...prev,
        userId: currentUser.id,
        money: 2,
        evtId: event.id,
      }));
    }
  };

  const schema = Joi.object({
    number: Joi.number().integer().required(),
  });

  const validate = () => {
    const { number } = input;

    if (
      !number.startsWith(61) &&
      !number.startsWith(63) &&
      !number.startsWith(90)
    ) {
      return setError("Number must be start with 6xxxxxx or 9xxxxxx");
    } else {
      setError("");
    }
    // if (number.length < 9) return setError("number length is not valid");
    const error = schema.validate({ number: input.number });
    return error;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { error } = validate();
      if (error) return setError(error.details[0].message);

      const { data } = await pay("/api/inrollEventToUser/waafi/", input);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      {/* Card number */}
      <Col md={12} sm={12} className="mb-3">
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <input
            type="text"
            placeholder="xxx-xxx-xxx"
            value={input.number}
            name={"number"}
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
    </Form>
  );
}

export default Waafi;
