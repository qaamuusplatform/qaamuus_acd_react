// import node module libraries
import React, { Fragment } from "react";
import {
  Col,
  Row,
  Container,
  Card,
  Image,
  Nav,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

// import MDI icons
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";

// import custom components
import GKYouTube from "components/marketing/common/video/GKYouTube";
import Ratings from "components/marketing/common/ratings/Ratings";
import GKAccordionProgress from "components/marketing/common/accordions/GKAccordionProgress";
import LevelIcon from "components/marketing/common/miscellaneous/LevelIcon";

// import sub components tabs


// import data files
// import { CourseIndex } from "data/marketing/CourseIndexData";

// import media files.
import { getCoursesDetail } from "services/coursesService";
import { useState } from "react";
import { useEffect } from "react";
import { END_POINT } from "helper/constants";
import DescriptionTab from "./DescriptionTab";
import ReviewsTab from "./ReviewsTab";
import TranscriptTab from "./TranscriptTab";
import FAQTab from "./FAQTab";
import { youTubeIdFromLink } from "helper/utils";


const CourseDetail1 = () => {
  const [courseError, setCourseError] = useState(null);
  const [courseInfo, setCoursesInfo] = useState({});
  const {id} = useParams();
  useEffect(() => {
    const load = async () => {
      try {
        const { data, status, statusText } = await getCoursesDetail(id);
        if (status) {
          console.log(data)
          setCoursesInfo(data);
        } else {
          setCourseError(statusText);
        }
      } catch (error) {
        console.log(error);
        setCourseError(error);
      }
    };
    load();
  }, []);

  console.log(courseInfo) 

  return (
    <Fragment>
      <div className="py-lg-5 py-5">
        <Container>
          {/*  Video section  */}
          <Row>
            <Col lg={12} md={12} sm={12} className="mb-5">
              <div
                className="rounded-3 position-relative w-100 d-block overflow-hidden p-0"
                style={{ height: "600px" }}
              >
                <GKYouTube videoId={courseInfo.prevVideo ? youTubeIdFromLink(courseInfo.prevVideo):''} />
              </div>
            </Col>
          </Row>
          {/*  Content  */}
          <Row>
            <Col xl={8} lg={12} md={12} sm={12} className="mb-4 mb-xl-0">
              {/*  Card  */}
              <Tab.Container defaultActiveKey="description">
                <Card className="mb-5">
                  {/*  Card body  */}
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="fw-semi-bold mb-2">
                        {courseInfo.title}
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
                        <span> {courseInfo.level}</span>
                      </span>
                      <span className="ms-4 d-none d-md-block">
                        <Icon path={mdiAccountMultipleOutline} size={0.7} />{" "}
                        <span>Enrolled</span>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <Image
                          src={`${END_POINT}${courseInfo.instructor?.profileImage}`}
                          className="rounded-circle avatar-md"
                          alt=""
                        />
                        <div className="ms-2 lh-1">
                          <h4 className="mb-1"> {courseInfo.instructor?.fullName}</h4>
                          <p className="fs-6 mb-0">{courseInfo.instructor?.email}</p>
                        </div>
                      </div>
                      <div>
                        <Link to="#" className="btn btn-outline-white btn-sm">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                  {/*  Nav tabs  */}
                  <Nav className="nav-lt-tab">
                    {["Description", "Reviews", "Transcript", "FAQ"].map(
                      (item, index) => (
                        <Nav.Item key={index}>
                          <Nav.Link
                            href={`#${item.toLowerCase()}`}
                            eventKey={item.toLowerCase()}
                            className="mb-sm-3 mb-md-0"
                          >
                            {item}
                          </Nav.Link>
                        </Nav.Item>
                      )
                    )}
                  </Nav>
                </Card>
                {/*  Card  */}
                <Card className="rounded-3">
                  {/*  Card body  */}
                  <Card.Body className="p-0">
                    <Tab.Content>
                      <Tab.Pane eventKey="description" className="pb-4 p-4">
                        {/* Description Tab */}
                        <DescriptionTab description={courseInfo.fullDesc} learn={courseInfo.youLearn} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="reviews" className="pb-4 p-4">
                        {/* Reviews Tab */}
                        <ReviewsTab />
                      </Tab.Pane>
                      <Tab.Pane eventKey="transcript" className="pb-4 p-4">
                        {/* Transcript Tab */}
                        <TranscriptTab />
                      </Tab.Pane>
                      <Tab.Pane eventKey="faq" className="pb-4 p-4">
                        {/* FAQ Tab */}
                        <FAQTab />
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
            <Col xl={4} lg={12} md={12} sm={12}>
              <Card>
                {/* <GKAccordionProgress accordionItems={[]} /> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default CourseDetail1;
