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
  Tab,
  Nav,
} from "react-bootstrap";
import styled from "styled-components";
import Waafi from "./Waafi";
import Dahab from "./Dahab";
import Paypal from "./Paypal";

function PaymentModel({ show, handleClose, event }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={12} sm={12} className="mb-3">
            <Tab.Container defaultActiveKey="waafi">
              <Card className="bg-transparent shadow-none ">
                <Card.Header className="border-0 p-0 bg-transparent">
                  <Nav className="nav-lb-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="waafi" className="mb-sm-3 mb-md-0">
                        Waafi
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="ms-0">
                      <Nav.Link eventKey="dahab" className="mb-sm-3 mb-md-0">
                        eDahab
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ms-0">
                      <Nav.Link eventKey="paypal" className="mb-sm-3 mb-md-0">
                        Paypal
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body className="p-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="waafi" className="pb-4 p-4 ps-0 pe-0">
                      <Row>
                        <Waafi handleClose={handleClose} event={event} />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="dahab" className="pb-4 p-4 ps-0 pe-0">
                      <Row>
                        <Dahab handleClose={handleClose} event={event} />
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="paypal" className="pb-4 p-4 ps-0 pe-0">
                      <Row>
                        <Paypal handleClose={handleClose} event={event} />
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>

        {/* <span>
          <strong>Note:</strong> that you can later remove your card at the
          account setting page.
        </span> */}
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModel;
