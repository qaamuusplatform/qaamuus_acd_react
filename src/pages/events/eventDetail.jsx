// import node module libraries

import React, { Fragment, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  Col,
  Row,
  Container,
  Card,
  Image,
  Nav,
  ListGroup,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
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
import { CourseIndex } from "../../data/CourseIndexData";
import ProfileBackground from "assets/images/background/profile-bg.jpg";
import GKAccordionProgress from "components/cards/GKAccordionProgress";
import ModalVideo from "react-modal-video";
import { getEvent } from "services/evantService";
import { CurrentUserContext } from "services/currentUserContext";

// import data files
// import { CourseIndex } from 'data/marketing/CourseIndexData';np
import { END_POINT } from "./../../helper/constants";
import useSWR from "swr";
import { toast } from "react-hot-toast";
import Timer from "./Timer";

const EventDetail = () => {
  const [isOpen, setOpen] = useState(false);
  const [YouTubeURL] = useState("JRzWRZahOVU");

  const { currentUser } = useContext(CurrentUserContext);

  const { slug } = useParams();

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

            <Card.Img variant="top" src={ProfileBackground} />
            {/* <Row>

						<Col lg={12} md={12} sm={12} className="mb-5">
							<div
								className="rounded-3 position-relative w-100 d-block overflow-hidden p-0"
								style={{ height: '600px' }}
							>
								<GKYouTube videoId="PkZNo7MFNFg" />
							</div>
						</Col>
					</Row> */}
            {/*  Content  */}
            <br></br>
            <br></br>
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
                      <Timer date={event.dateTimeStarting} />
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
                  <div className="p-1">
                    <div
                      className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
                      style={{
                        background: `url(${CourseJavascript})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                      }}
                    >
                      <Link
                        to="#"
                        className="popup-youtube icon-shape rounded-circle btn-play icon-xl text-decoration-none"
                        onClick={() => setOpen(true)}
                      >
                        <i className="fe fe-play"></i>
                      </Link>
                    </div>
                  </div>
                  {/* video popup */}
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId={YouTubeURL}
                    onClose={() => setOpen(false)}
                  />
                  {/* end of video popup */}

                  {/* Card body */}
                  <Card.Body>
                    {/* Price single page */}
                    <div className="mb-3">
                      <span className="text-dark fw-bold h2 me-2">$600</span>
                      <del className="fs-4 text-muted">$750</del>
                    </div>
                    <div className="d-grid">
                      {currentUser ? (
                        <Link
                          to="/marketing/pages/pricing/"
                          className="btn btn-primary"
                        >
                          Enroll now
                        </Link>
                      ) : (
                        <Link
                          to="/auth/login"
                          className="btn btn-outline-primary"
                        >
                          Login to Enroll
                        </Link>
                      )}
                    </div>
                  </Card.Body>
                </Card>
                {/* Card */}
                <Card className="mb-4">
                  {/* Card header */}
                  <Card.Header>
                    <h4 className="mb-0">What’s included</h4>
                  </Card.Header>
                  {/* Card Body */}
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
                      <ListGroup.Item>
                        <i className="fe fe-calendar align-middle me-2 text-info"></i>
                        12 Article
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="fe fe-video align-middle me-2 text-secondary"></i>
                        Watch Offline
                      </ListGroup.Item>
                      <ListGroup.Item className="bg-transparent">
                        <i className="fe fe-clock align-middle me-2 text-warning"></i>
                        Lifetime access
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
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
      )}
    </Fragment>
  );
};

export default EventDetail;
