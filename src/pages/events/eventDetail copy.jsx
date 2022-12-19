// import node module libraries

import React, { Fragment, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  Col,
  Row,
  Container,
  Card,
  Image,
  Form,
  Button,
  Modal,
  Nav,
  ListGroup,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
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
import ReviewsTab from "./EventReviewsTab";
import DescriptionTab from "./DescriptionTab";

import { getEvent } from "services/evantService";
import { CurrentUserContext } from "services/currentUserContext";

// import data files
// import { CourseIndex } from 'data/marketing/CourseIndexData';np
import { END_POINT } from "../../helper/constants";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import Timer from "./Timer";
import PaymentModel from "pages/payment/model";
import { useEffect } from "react";
import { ShimmerPostDetails } from "react-shimmer-effects";

const EventDetail = () => {
  // const [isOpen, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [YouTubeURL] = useState("JRzWRZahOVU");
  const [access, setAccess] = useState(true);
  const userAccessInfo = {};
  const { currentUser, userIsLoading } = useContext(CurrentUserContext);

  const { slug } = useParams();

  // if (userIsLoading) return <p>loading</p>;
  const { data: eventEnrolmentDetail, error } = useSWR(
    `api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`,
    getEvent
  );

  // console.log(eventEnrolmentDetail);
  // const { theEvent } = inrollmentDetail && inrollmentDetail;

  if (userIsLoading) {
    return (
      <Fragment>
        <div className=" pt-8 pb-8">
          <Container>
            <ShimmerPostDetails card cta variant="EDITOR" />
          </Container>
        </div>
      </Fragment>
    );
  } else {
    if (!eventEnrolmentDetail && !error) {
      return (
        <Fragment>
          <div className=" pt-8 pb-8">
            <Container>
              <ShimmerPostDetails card cta variant="EDITOR" />
            </Container>
          </div>
        </Fragment>
      );
    }
  }

  return userIsLoading ? null : (
    <Fragment>
      {eventEnrolmentDetail.theEvent && (
        <div className="py-lg-5 py-5">
          <Container>
            {/*  Video section  */}
            <Card className="mb-5 bg-dark">
              {/* <Card.Img variant="top" src={ProfileBackground} /> */}
              <Card.Body>
                <Timer date={eventEnrolmentDetail.theEvent.dateTimeStarting} />
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
                        <h1 className="fw-semi-bold mb-2">
                          {eventEnrolmentDetail.theEvent.title}
                        </h1>
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
                          <span>
                            {
                              eventEnrolmentDetail.theEvent.enrolledStudents
                                .length
                            }
                          </span>
                        </span>
                      </div>
                      {/* <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Image
                    src={`${END_POINT}` + eventEnrolmentDetail.theEvent.persenter.profileImage}
                    className="rounded-circle avatar-md"
                    alt=""
                  />
                  <div className="ms-2 lh-1">
                    <h4 className="mb-1">{eventEnrolmentDetail.theEvent.persenter.fullName}</h4>
                    <p className="fs-6 mb-0">{eventEnrolmentDetail.theEvent.persenter.email}</p>
                  </div>
                </div>
                <div>
                  <Link to="#" className="btn btn-outline-white btn-sm">
                    Follow
                  </Link>
                </div>
              </div> */}
                      <div
                        style={{
                          position: "relative",
                          paddingTop: "57.05229793977813%",
                        }}
                      >
                        <iframe
                          src={eventEnrolmentDetail.theEvent.prevVideo}
                          loading="lazy"
                          style={{
                            border: "none",
                            position: "absolute",
                            top: 0,
                            height: "100%",
                            width: "100%",
                          }}
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                          allowFullScreen="true"
                        />
                      </div>
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
                          <DescriptionTab
                            event={eventEnrolmentDetail.theEvent}
                          />
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
                            className={`ms-auto mt-3 mt-lg-0  ${
                              false ? "d-none" : ""
                            }`}
                          >
                            <Nav.Link
                              as={Link}
                              to="/auth/login"
                              bsPrefix="btn"
                              className="btn btn-primary"
                            >
                              Login to Enroll
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
                      ) : eventEnrolmentDetail.exists ? (
                        <Button
                          variant="warning"
                          onClick={handleShow}
                          className="mt-3"
                        >
                          Access Event
                        </Button>
                      ) : (
                        <Link to={`/checkout/event/${slug}`}>
                          <Button
                            variant="primary"
                            onClick={handleShow}
                            className="mt-3"
                          >
                            Enroll now
                          </Button>
                        </Link>
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
                          src={
                            END_POINT +
                            eventEnrolmentDetail.theEvent.persenter.profileImage
                          }
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
                        <h4 className="mb-0">
                          {eventEnrolmentDetail.theEvent.persenter.fullName}
                        </h4>
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
                    <p>{eventEnrolmentDetail.theEvent.persenter.aboutMe}</p>
                    <Link
                      to={`/instructor/${eventEnrolmentDetail.theEvent.persenter.id}`}
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
      )}
    </Fragment>
  );
};

export default EventDetail;
