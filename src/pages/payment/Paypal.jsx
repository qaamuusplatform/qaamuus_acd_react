import React from "react";

import { Col, Row, Image, Form, Button } from "react-bootstrap";
import FormSelect from "components/elements/custom/FormSelect";

import VisaCard from "assets/images/creditcard/visa.svg";
import Mastercard from "assets/images/creditcard/mastercard.svg";
import AmericanExpress from "assets/images/creditcard/americanexpress.svg";
import InputMask from "react-input-mask";

const CardNumberInput = (props) => (
  <InputMask
    mask="9999-9999-9999-9999"
    placeholder="xxxx-xxxx-xxxx-xxxx"
    value={props.value}
    onChange={props.onChange}
    className="form-control bg-white px-4 py-2.1"
  >
    {(inputProps) => <input {...inputProps} type="tel" disableUnderline />}
  </InputMask>
);

const months = [
  { value: "Jan", label: "Jan" },
  { value: "Feb", label: "Feb" },
  { value: "Mar", label: "Mar" },
  { value: "Apr", label: "Apr" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "Jul", label: "Jul" },
  { value: "Aug", label: "Aug" },
  { value: "Sep", label: "Sep" },
  { value: "Oct", label: "Oct" },
  { value: "Nov", label: "Nov" },
  { value: "Dec", label: "Dec" },
];

// Year select control values
const year = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];

function Paypal({ handleClose, show }) {
  return (
    <Form className="mb-4">
      <Row>
        <Col md={12} sm={12} className="mb-3">
          <h5 className="mb-3">Credit / Debit card</h5>
          {/* Radio button */}
          <div className="d-inline-flex">
            <Form.Check type="radio" id="inline-radio-1">
              <Form.Check.Input
                type="radio"
                name="paymentRadioOne"
                defaultChecked
              />
              <Form.Check.Label>
                <Image src={AmericanExpress} alt="" className="me-3" />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check type="radio" id="inline-radio-2">
              <Form.Check.Input type="radio" name="paymentRadioOne" />
              <Form.Check.Label>
                <Image src={Mastercard} alt="" className="me-3" />
              </Form.Check.Label>
            </Form.Check>

            <Form.Check type="radio" id="inline-radio-3">
              <Form.Check.Input type="radio" name="paymentRadioOne" />
              <Form.Check.Label>
                <Image src={VisaCard} alt="" className="me-3" />
              </Form.Check.Label>
            </Form.Check>
          </div>
        </Col>
        {/* Name on card */}
        <Col md={4} sm={12} className="mb-3">
          <Form.Group controlId="formNameOnCard">
            <Form.Label>Name on card</Form.Label>
            <Form.Control type="text" placeholder="Name" required />
          </Form.Group>
        </Col>
        {/* Month */}
        <Col md={4} sm={12} className="mb-3">
          <Form.Group controlId="formMonth">
            <Form.Label>Month</Form.Label>
            <FormSelect options={months} required />
          </Form.Group>
        </Col>
        {/* Year */}
        <Col md={4} sm={12} className="mb-3">
          <Form.Group controlId="formYear">
            <Form.Label>Year</Form.Label>
            <FormSelect options={year} required />
          </Form.Group>
        </Col>
        {/* Card number */}
        <Col md={8} sm={12} className="mb-3">
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
          </Form.Group>
          <CardNumberInput />
        </Col>
        {/* CVV */}
        <Col md={4} sm={12} className="mb-3">
          <div className="mb-3">
            <Form.Group controlId="formCVVCode">
              <Form.Label>
                CVV Code{" "}
                <i
                  className="fas fa-question-circle ms-1"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="A 3 - digit number, typically printed on the back of a card."
                ></i>{" "}
              </Form.Label>
            </Form.Group>
            <InputMask
              type="password"
              mask="999"
              maskChar={null}
              className="form-control"
              placeholder="xxx"
            />
          </div>
        </Col>
        {/* Button */}
        <Col md={6} sm={12}>
          <Button variant="primary" type="submit">
            Add New Card
          </Button>{" "}
          <Button variant="outline-primary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Paypal;
