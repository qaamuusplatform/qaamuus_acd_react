import React, { useState } from "react";
import wafipng from "assets/images/png/wafi.png";
import somtelpng from "assets/images/png/somtel.png";

import {
  Col,
  Row,
  Container,
  Card,
  Image,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import styled from "styled-components";
import Waafi from "./Waafi";
import Dahab from "./Dahab";
import Paypal from "./Paypal";

function PaymentModel({ show, handleClose }) {
  const [dahab, setDahab] = useState(false);
  const [waafi, setWaafi] = useState(true);
  const [pay, setPay] = useState(false);

  const handleDahab = () => {
    setDahab(true);
    setPay(false);
    setWaafi(false);
  };
  const handleWaafi = () => {
    setWaafi(true);
    setDahab(false);
    setPay(false);
  };
  const handlePay = () => {
    setPay(true);
    setDahab(false);
    setWaafi(false);
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row md={6} className={`mb-4`}>
          <Col>
            <Button
              variant={`${waafi ? "primary" : "outline-primary"} w-100 `}
              onClick={handleWaafi}
            >
              Waafi
            </Button>
          </Col>
          <Col>
            <Button
              variant={`${dahab ? "primary" : "outline-primary"} w-100 `}
              onClick={handleDahab}
            >
              Somtel
            </Button>
          </Col>
          <Col>
            <Button
              variant={`${pay ? "primary" : "outline-primary"} w-100 `}
              onClick={handlePay}
            >
              Paypal
            </Button>
          </Col>
        </Row>

        {waafi && <Waafi handleClose={handleClose} />}
        {dahab && <Dahab handleClose={handleClose} />}
        {pay && <Paypal handleClose={handleClose} />}

        <span>
          <strong>Note:</strong> that you can later remove your card at the
          account setting page.
        </span>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModel;

// const CardStyle = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 50%;
//   margin-bottom: 3rem;

//   img {
//     width: 40%;
//   }

//   div {
//     border: 1px solid #a8a3b9;
//     border-radius: 0.4rem;
//     width: 30%;
//     height: 2rem;
//     text-align: center;
//     padding: 0.3rem;
//     cursor: pointer;

//     &:hover {
//       background-color: #21acc3;
//       color: #fff;
//     }

//     &.active {
//       background-color: #21acc3;
//       color: #fff;
//     }
//   }
// `;
