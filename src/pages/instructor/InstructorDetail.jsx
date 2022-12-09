// import node module librariesss
import React, { Fragment } from 'react';
import { MoreVertical } from 'react-feather';
import { Link, useParams } from "react-router-dom";
import {
    Card,
    ListGroup,
    Row,
    Col, Tab, Nav, Image,
    Container,
    Dropdown
} from 'react-bootstrap';

// import MDI icons
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';

// import custom components

// import profile layout wrapper
import ProfileCoverFull from './ProfileCoverFull';

import AboutTab from './AboutTab';
import { httpFetcher } from 'services/coursesService';
import useSWR from 'swr';
import { ShimmerPostDetails,  ShimmerThumbnail } from 'react-shimmer-effects';
import CoursesTab from './CoursesTab';
import EventsTap from './EventsTab';
// Import required data

const InstructorDetail = () => {
    const { instructorUsername } = useParams();
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const { data: instructorInfo, error } = useSWR(`/api/userProfile-detail-username/${instructorUsername}/`, httpFetcher);
    console.log(instructorInfo)
    if (error) {
        toast.error(error);
    }
    if (!instructorInfo && !error) {
        return (
            <Fragment>
                <Card className="p-lg-2 pt-2 pt-lg-0 rounded-0 border-0">
                    <Container>
                        <br />
                        <ShimmerThumbnail height={90} rounded />
                        <ShimmerPostDetails card cta variant="EDITOR" />
                        <br></br>
                    </Container>
                </Card>
            </Fragment>
        );


    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Link
            to="#"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </Link>
    ));


    return (
        <Fragment>
            {/* Full width header */}

            {/* Content */}
            <Tab.Container defaultActiveKey="about">
                <div className="bg-white shadow-sm">
                    <Container>
                        <Row className="align-items-center">
                            <Col xl={12} lg={12} md={12} sm={12}>

                                <ProfileCoverFull dashboardData={instructorInfo} />
                                {/* Nav tab */}

                                {/*  Nav tabs  */}
                                <Nav className="nav-lt-tab ms-0">
                                    {['About', 'Courses', 'Events'].map((item, index) => (
                                        <Nav.Item
                                            key={index}
                                            className={`${index === 0 ? 'ms-0 ' : ''}`}
                                        >
                                            <Nav.Link
                                                eventKey={item.toLowerCase()}
                                                className="mb-sm-3 mb-md-0"
                                            >
                                                {item}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* Content  */}
                <div className="py-6">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="about" className="pb-4 px-0">
                                        {/* About */}
                                        <AboutTab instructorInfo={instructorInfo} />

                                        {/* End of About */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="courses" className="pb-4 px-0">
                                        {/* Beginner Courses */}
                                        <CoursesTab instructorInfo={instructorInfo}  />
                                        
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="author" className="pb-4 px-0">
                                        {/* Author */}
                                        {/* <AuthorTab /> */}
                                        <EventsTap instructorInfo={instructorInfo}  />

                                        {/* End of Author */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Tab.Container>
        </Fragment>
    );
};

export default InstructorDetail;
