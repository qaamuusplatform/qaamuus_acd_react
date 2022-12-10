// import node module libraries

import React, { Fragment, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  Col,
  Row,
  Container,
  Card,
  Image, Form, Button, Modal,
  Nav,
  ListGroup,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";



// import custom components
// import LevelIcon from 'components/marketing/common/miscellaneous/LevelIcon';

import CheckedMark from "assets/images/svg/checked-mark.svg";
import CourseJavascript from "assets/images/course/course-javascript.jpg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import sub components tabs
import Ratings from "components/elements/common/ratings/Ratings";
import LevelIcon from "pages/student/miscellaneous/LevelIcon";
import FAQTab from "./FAQTab";
import TranscriptTab from "./TranscriptTab";
import ReviewsTab from "./ReviewsTab";
import DescriptionTab from "./DescriptionTab";

import VisaCard from 'assets/images/creditcard/visa.svg';
import Mastercard from 'assets/images/creditcard/mastercard.svg';
import Discover from 'assets/images/creditcard/discover.svg';
import AmericanExpress from 'assets/images/creditcard/americanexpress.svg';
import PaypalExpress from 'assets/images/creditcard/paypal.svg';

import { getEvent } from "services/evantService";
import { CurrentUserContext } from "services/currentUserContext";

// import data files
// import { CourseIndex } from 'data/marketing/CourseIndexData';np
import { END_POINT } from "../../helper/constants";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import Timer from "./Timer";
import FormSelect from "components/elements/custom/FormSelect";

const EventDetail = () => {
  const [isOpen, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [YouTubeURL] = useState("JRzWRZahOVU");

  const { currentUser } = useContext(CurrentUserContext);

  const { slug } = useParams();
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
    { value: 'Jan', label: 'Jan' },
    { value: 'Feb', label: 'Feb' },
    { value: 'Mar', label: 'Mar' },
    { value: 'Apr', label: 'Apr' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'Jun' },
    { value: 'Jul', label: 'Jul' },
    { value: 'Aug', label: 'Aug' },
    { value: 'Sep', label: 'Sep' },
    { value: 'Oct', label: 'Oct' },
    { value: 'Nov', label: 'Nov' },
    { value: 'Dec', label: 'Dec' }
  ];

  // Year select control values
  const year = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' }
  ];


  const { data: event, error } = useSWR(
    `api/qaEvent-detail-slug/${slug}/`,
    getEvent
  );

  if (error) toast.error(error);

  return (
    <Fragment>
      {event && (
        <div className="py-lg-5 py-5">
          <Container>
            {/*  Video section  */}
            <Card className="mb-5 bg-dark">
              {/* <Card.Img variant="top" src={ProfileBackground} /> */}
              <Card.Body>
                <Timer date={event.dateTimeStarting} />
              </Card.Body>
            </Card>
            {/* <Row>
            {/*  Content  */}
            <br></br>
            <Row>
              <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
                {/*  Card  */}
                <Tab.Container defaultActiveKey="description">
                  <Card className="mb-5">
                    {/*  Card body  */}
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <h1 className="fw-semi-bold mb-2">{event.title}</h1>
                        <OverlayTrigger
                          key="top"
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-top">Add to Bookmarks</Tooltip>
                          }
                        >
                          <Link to="#">
                            <i className="fe fe-bookmark fs-3 text-inherit"></i>
                          </Link>
                        </OverlayTrigger>
                      </div>
                      <div className="d-flex mb-5">
                        <span>
                          <span className="text-warning">
                            <Ratings rating={4.5} />
                          </span>
                          <span className="fw-medium">(140)</span>
                        </span>

                        <span className="ms-4 d-none d-md-block">
                          <LevelIcon level="Intermediate" />
                          <span>Intermediate</span>
                        </span>
                        <span className="ms-4 d-none d-md-block">
                          <Icon path={mdiAccountMultipleOutline} size={0.7} />{" "}
                          <span>{event.enrolledStudents.length}</span>
                        </span>
                      </div>
                      {/* <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <Image
                            src={`${END_POINT}` + event.persenter.profileImage}
                            className="rounded-circle avatar-md"
                            alt=""
                          />
                          <div className="ms-2 lh-1">
                            <h4 className="mb-1">{event.persenter.fullName}</h4>
                            <p className="fs-6 mb-0">{event.persenter.email}</p>
                          </div>
                        </div>
                        <div>
                          <Link to="#" className="btn btn-outline-white btn-sm">
                            Follow
                          </Link>
                        </div>
                      </div> */}
                    </Card.Body>
                    {/*  Nav tabs  */}
                    <Nav className="nav-lt-tab">
                      {["Description", "Reviews"].map((item, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link
                            href={`#${item.toLowerCase()}`}
                            eventKey={item.toLowerCase()}
                            className="mb-sm-3 mb-md-0"
                          >
                            {item}
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Card>
                  {/*  Card  */}
                  <Card className="rounded-3">
                    {/*  Card body  */}
                    <Card.Body className="p-0">
                      <Tab.Content>
                        <Tab.Pane eventKey="description" className="pb-4 p-4">
                          {/* Description Tab */}
                          <DescriptionTab event={event} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                          {/* Reviews Tab */}
                          <ReviewsTab />
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </Col>
              <Col lg={4} md={12} sm={12} className="mt-lg-n22">
                {/* Card */}
                <Card className="mb-3 mb-4">

                  {/* end of video popup */}

                  {/* Card body */}
                  <Card.Body>
                    {/* Price single page */}
                    <div className="mb-3">
                      
                    <span className="text-dark fw-bold h3 me-2">&nbsp;</span>
                      <span className="text-dark fw-bold h3 me-2">$600</span>
                      <del className="fs-4 text-muted">$750</del>
                    </div>
                    <Card.Body className="p-0">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <i className="fe fe-play-circle align-middle me-2 text-primary"></i>
                        12 hours video
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fe fe-award me-2 align-middle text-success"></i>
                        Certificate
                      </ListGroup.Item>
                      {/* <ListGroup.Item>
                        <i className="fe fe-calendar align-middle me-2 text-info"></i>
                        12 Article
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fe fe-video align-middle me-2 text-secondary"></i>
                        Watch Offline
                      </ListGroup.Item> */}
                      <ListGroup.Item className="bg-transparent">
                        <i className="fe fe-clock align-middle me-2 text-warning"></i>
                        Lifetime access
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                    <div className="d-grid">
                      {Object.keys(currentUser).length === 0 ? (
                        <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                          <span
                            className={`ms-auto mt-3 mt-lg-0  ${false ? "d-none" : ""}`}
                          >
                            <Nav.Link
                              as={Link}
                              to="/auth/login"
                              bsPrefix="btn"
                              className="btn btn-outline-primary"
                            >
                              Log In
                            </Nav.Link>
                            &nbsp; &nbsp;
                            <Nav.Link
                              as={Link}
                              to="/join/sign-up"
                              bsPrefix="btn"
                              className="btn btn-primary shadow-sm"
                            >
                              Sign Up
                            </Nav.Link>
                          </span>

                          {/* <span
                          className={`${
                            login
                              ? isDesktop || isLaptop
                                ? "d-flex"
                                : "d-none"
                              : "d-none"
                          }`}
                        >
                          <QuickMenu />
                        </span> */}
                        </Nav>

                      ) : (
                        <Button variant="primary" onClick={handleShow} className="mt-3">
                          Enroll now
                        </Button>

                      )}
                    </div>
                  </Card.Body>
                </Card>
                {/* Card */}
              
                {/* Card */}
                <Card>
                  {/* Card body */}
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="position-relative">
                        <Image
                          src={Avatar1}
                          alt=""
                          className="rounded-circle avatar-xl"
                        />
                        <Link
                          to="#"
                          className="position-absolute mt-2 ms-n3"
                          data-bs-toggle="tooltip"
                          data-placement="top"
                          title="Verifed"
                        >
                          <Image
                            src={CheckedMark}
                            alt=""
                            height="30"
                            width="30"
                          />
                        </Link>
                      </div>
                      <div className="ms-4">
                        <h4 className="mb-0">Jenny Wilson</h4>
                        <p className="mb-1 fs-6">
                          Front-end Developer, Designer
                        </p>
                        <span className="fs-6">
                          <span className="text-warning">4.5</span>
                          <span className="mdi mdi-star text-warning me-2"></span>
                          Instructor Rating
                        </span>
                      </div>
                    </div>
                    <Row className="border-top mt-3 border-bottom mb-3 g-0">
                      <Col>
                        <div className="pe-1 ps-2 py-3">
                          <h5 className="mb-0">11,604</h5>
                          <span>Students</span>
                        </div>
                      </Col>
                      <Col className="border-start">
                        <div className="pe-1 ps-3 py-3">
                          <h5 className="mb-0">32</h5>
                          <span>Courses</span>
                        </div>
                      </Col>
                      <Col className="border-start">
                        <div className="pe-1 ps-3 py-3">
                          <h5 className="mb-0">12,230</h5>
                          <span>Reviews</span>
                        </div>
                      </Col>
                    </Row>
                    <p>
                      I am an Innovation designer focussing on UX/UI based in
                      Berlin. As a creative resident at Figma explored the city
                      of the future and how new technologies.
                    </p>
                    <Link
                      to="/marketing/instructor/instructor-edit-profile/"
                      className="btn btn-outline-white btn-sm"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
      }
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      <Image
                        src={AmericanExpress}
                        alt=""
                        width={100}
                        className="me-5"
                      />
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
                      CVV Code{' '}
                      <i
                        className="fas fa-question-circle ms-1"
                        data-bs-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="A 3 - digit number, typically printed on the back of a card."
                      ></i>{' '}
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
                </Button>{' '}
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
          <span>
            <strong>Note:</strong> that you can later remove your card at
            the account setting page.
          </span>
        </Modal.Body>
      </Modal>
    </Fragment >
  );
};

export default EventDetail;
