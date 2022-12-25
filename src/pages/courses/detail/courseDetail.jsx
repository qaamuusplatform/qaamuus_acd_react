// import node module libraries
import React, { Fragment, useState } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  Card,
  Tab,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

// import popup youtube video
import ModalVideo from "react-modal-video";

// tippy tooltip
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";

// import custom components
import GKAccordionDefault from "components/accordions/GKAccordionDefault";
import Ratings from "components/elements/common/ratings/Ratings";

// import sub components tabs
import ReviewsTab from "./ReviewsTab";
import DescriptionTab from "./DescriptionTab";
import TranscriptTab from "./TranscriptTab";
import FAQTab from "./FAQTab";

// import media files
import CheckedMark from "assets/images/svg/checked-mark.svg";
import CourseJavascript from "assets/images/course/course-javascript.jpg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import data files
import { httpFetcher } from "services/coursesService";
import { toast } from "react-toastify";
import useSWR from "swr";
import { youTubeIdFromLink } from "helper/utils";
import { END_POINT } from "helper/constants";
import { CurrentUserContext } from "services/currentUserContext";
import { useContext } from "react";
import { ShimmerPostDetails } from "react-shimmer-effects";
import Icon from "@mdi/react";
import { mdiAccount, mdiYoutube, mdiVideo3d, mdiVideoImage } from "@mdi/js";
import http from "services/httpService";

const CourseDetail = ({ match, location }) => {
  const [isOpen, setOpen] = useState(false);
  const { currentUser, userIsLoading } = useContext(CurrentUserContext);
  const { slug } = useParams();
  const { data: courseEnrolmentDetail, error } = useSWR(
    `/api/checkThisUserInrolledCourse-slug/${currentUser.id}/${slug}/`,
    httpFetcher
  );
  if (error) {
    toast.error(error);
  }
  const enrollFreeCourse = async () => {
    console.log(courseEnrolmentDetail);
    try {
      await http
        .post(
          `/api/inrollCourseToUser/free/`,
          JSON.stringify({ "number": "0", "userId": `${currentUser.id}`, "courseId": `${courseEnrolmentDetail.theCourse.pk}`, "money": "0", "months": "1", "referralCode": "0", "cupponCode": "0" }),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((courseEnrollmentResp) => {

          console.log(courseEnrollmentResp.data);
          toast.success(courseEnrollmentResp.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // history.replace("/auth/login/");
        });
    } catch (error) {
      console.log('errr', error)
      toast.error("laguma guulaysan lacag bixinta fadlan ku celi markale");
    }
  };
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
    if (!courseEnrolmentDetail && !error) {
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
      {/* Page header */}
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} lg={7} md={12} sm={12}>
              <div>
                <h1 className="text-white display-4 fw-semi-bold">
                  {courseEnrolmentDetail.theCourse.title}
                </h1>
                <p className="text-white mb-6 lead">
                  {courseEnrolmentDetail.theCourse.simDesc}
                </p>
                <div className="d-flex align-items-center">
                  <Tippy content="Add to Bookmarks" animation={"scale"}>
                    <Link
                      to="#"
                      className="bookmark text-white text-decoration-none"
                    >
                      <i className="fe fe-bookmark text-white-50 me-2"></i>
                      {courseEnrolmentDetail.theCourse.category.categoryName}
                    </Link>
                  </Tippy>
                  <span className="text-white ms-3">
                    <i className="fe fe-user text-white-50"></i>{" "}
                    {/* {courseEnrolmentDetail.theCourse.inrolledUsers.length} Enrolled{" "} */}
                  </span>
                  {/* <span className="ms-4">
                    <span className="text-warning">
                      <Ratings rating={4.5} />
                      <span className="text-white ms-1">(140)</span>
                    </span>
                  </span> */}
                  <span className="text-white ms-4 d-none d-md-block">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="8"
                        width="2"
                        height="6"
                        rx="1"
                        fill="#DBD8E9"
                      ></rect>
                      <rect
                        x="7"
                        y="5"
                        width="2"
                        height="9"
                        rx="1"
                        fill="#DBD8E9"
                      ></rect>
                      <rect
                        x="11"
                        y="2"
                        width="2"
                        height="12"
                        rx="1"
                        fill="#DBD8E9"
                      ></rect>
                    </svg>{" "}
                    <span className="align-middle">
                      {courseEnrolmentDetail.theCourse.level}
                    </span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <div className="pb-10">
        <Container>
          <Row>
            <Col lg={8} md={12} sm={12} className="mt-n8 mb-4 mb-lg-0">
              <Tab.Container defaultActiveKey="faahfaahin">
                <Card>
                  <Nav className="nav-lb-tab">
                    {[
                      "Faahfaahin",
                      "Contents",
                      // "Reviews",
                      // "Transcript",
                      // "FAQ",
                    ].map((item, index) => (
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
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="contents" className="pb-4 pt-3 px-4">
                        {/* Course Index Accordion */}
                        <GKAccordionDefault
                          accordionItems={
                            courseEnrolmentDetail.theCourse.theComponents
                          }
                          itemClass="px-0"
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="faahfaahin" className="pb-4 p-4">
                        {/* Description */}
                        <DescriptionTab
                          description={courseEnrolmentDetail.theCourse.fullDesc}
                          learn={courseEnrolmentDetail.theCourse.youLearn}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                        {/* Reviews */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
              <br></br>
              <Card>
                <Card.Body className="pb-4 p-4">
                  <ReviewsTab
                    reviews={courseEnrolmentDetail.theCourse.theReviews}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} sm={12} className="mt-lg-n22 order-1 order-md-2">
              {/* Card */}
              <Card className="mb-3 mb-4">
                <div className="p-1">
                  <div
                    className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover"
                    style={{
                      background: `url(${END_POINT}${courseEnrolmentDetail.theCourse.prevImage})`,
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
                  videoId={
                    courseEnrolmentDetail.theCourse.prevVideo
                      ? youTubeIdFromLink(
                          courseEnrolmentDetail.theCourse.prevVideo
                        )
                      : ""
                  }
                  onClose={() => setOpen(false)}
                />
                {/* end of video popup */}

                {/* Card body */}
                <Card.Body>
                  {/* Price single page */}
                  {courseEnrolmentDetail.theCourse.regularPrice == 0 ||
                  courseEnrolmentDetail.theCourse.itsFree ? (
                    <div className="mb-1">
                      <span className="text-dark fw-bold h3 me-2">
                      $0 - <del className="fs-4 text-muted"> ${courseEnrolmentDetail.theCourse.regularPrice} </del>
                      </span>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <span className="text-dark fw-bold h2 me-2">
                        ${courseEnrolmentDetail.theCourse.discountPrice}
                      </span>
                      {courseEnrolmentDetail.theCourse.showDiscountPrice ? (
                        <del className="fs-4 text-muted">
                          ${courseEnrolmentDetail.theCourse.regularPrice}
                        </del>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}

                  <div>
                    <ListGroup.Item>
                      <i className="fe fe-play-circle align-middle me-2 text-primary"></i>
                      {courseEnrolmentDetail.theCourse.houres}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-award me-2 align-middle text-success"></i>
                      {courseEnrolmentDetail.theCourse.hasCertificate
                        ? "Certified"
                        : "No Certified"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-calendar align-middle me-2 text-info"></i>
                      {courseEnrolmentDetail.theCourse.lessonCounts} Cashir
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="fe fe-video align-middle me-2 text-secondary"></i>
                      Daawo Markasta
                    </ListGroup.Item>
                    {/* <ListGroup.Item className="bg-transparent">
                          <i className="fe fe-clock align-middle me-2 text-warning"></i>
                          Lifetime access
                        </ListGroup.Item> */}
                    <br></br>
                  </div>
                  {Object.keys(currentUser).length === 0 ? (
                    <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
                      <span
                        className={`ms-auto mt-3 mt-lg-0  ${
                          false ? "d-none" : ""
                        }`}
                      >
                        <Nav.Link
                          as={Link}
                          to={{
                            pathname: "/auth/login",
                            state: { from: location },
                          }}
                          className="btn btn-primary"
                        >
                          Login to Enroll
                        </Nav.Link>
                      </span>
                    </Nav>
                  ) : courseEnrolmentDetail.isEnrolled ? (
                    <div className="d-grid">
                      <Link
                        to={`/courses/${courseEnrolmentDetail.theCourse.slug}/watch`}
                        className={`btn btn-primary`}
                      >
                        <Icon path={mdiYoutube} size={1} className="mb-0" color="white" /> &nbsp;
                        DAAWO KOORSADA
                      </Link>
                    </div>
                  ) : courseEnrolmentDetail.theCourse.saledPrice == 0 ||
                    courseEnrolmentDetail.theCourse.itsFree ? (
                    <div className="d-grid">
                      <Button
                        variant="success"
                        onClick={enrollFreeCourse}
                        className="mt-3"
                      >
                        IS-DIWAANGALI <strong>FREE</strong>
                      </Button>
                    </div>
                  ) : (
                    <div className="d-grid">
                      <Link
                        to={`/checkout/course/${courseEnrolmentDetail.theCourse.slug}`}
                        className={`btn btn-warning text-grey`}
                      >
                        ISKA-DIWAANGALI
                      </Link>
                    </div>
                  )}
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
                        src={`${END_POINT}${courseEnrolmentDetail.theCourse.instructor.profileImage}`}
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
                        {courseEnrolmentDetail.theCourse.instructor.fullName}
                      </h4>
                      <p className="mb-1 fs-6">
                        {courseEnrolmentDetail.theCourse.instructor.userTitle}
                      </p>
                      <span className="fs-6">
                        <span className="text-warning">4.5</span>
                        <span className="mdi mdi-star text-warning me-2"></span>
                        Instructor Rating
                      </span>
                    </div>
                  </div>
                  {/* <Row className="border-top mt-3 border-bottom mb-3 g-0">
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
                  </Row> */}
                  <p>{courseEnrolmentDetail.theCourse.instructor.simAboutMe}</p>
                  <Link
                    to={`/instructor/${courseEnrolmentDetail.theCourse.instructor.id}/`}
                    className="btn btn-outline-white btn-sm"
                  >
                    View Details
                  </Link>
                </Card.Body>
              </Card>
              <br></br>
              {/* <Card className="mb-4">
     
                <Card.Header>
                  <h4 className="mb-0">What’s included</h4>
                </Card.Header>
           
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
              </Card> */}
            </Col>
          </Row>
          {/* Card */}
          <div className="pt-12 pb-3">
            <Row className="d-md-flex align-items-center mb-4">
              <Col lg={12} md={12} sm={12}>
                <h2 className="mb-0">Related Courses</h2>
              </Col>
            </Row>
            <Row>
              {/* {AllCoursesData.filter(function (datasource) {
								return datasource.category === 'javascript';
							})
								.slice(0, 4)
								.map((item, index) => (
									<Col lg={3} md={6} sm={12} key={index}>
										<CourseCard item={item} free />
									</Col>
								))} */}
            </Row>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseDetail;
