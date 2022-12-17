import React, { useState } from "react";

import sms from "assets/images/png/sms.gif";
import {
  Col,
  Row,
  Container,
  Card,
  Image,
  Form,
  Button,
  Modal,
  Tab,
  Nav,
} from "react-bootstrap";

function VerifyModel({ show, handleClose }) {
  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex ">
          <img src={sms} alt="" />
          <p>hello</p>
        </div>

        {/* <span>
          <strong>Note:</strong> that you can later remove your card at the
          account setting page.
        </span> */}
      </Modal.Body>
    </Modal>
  );
}

export default VerifyModel;
