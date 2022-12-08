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
import ProfileCoverFull from 'components/marketing/common/headers/ProfileCoverFull';
import InstructorData from 'data/InstructorData';

import AboutTab from './AboutTab';
import { httpFetcher } from 'services/coursesService';
import useSWR from 'swr';
import { ShimmerPostDetails,  ShimmerThumbnail } from 'react-shimmer-effects';
import CoursesTab from './CoursesTab';
// Import required data

const InstructorDetail = () => {
    const { instructorId } = useParams();
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const { data: instructorInfo, error } = useSWR(`/api/userProfile-detail/${instructorId}`, httpFetcher);
    const { data: instructorCourses, error: instructorCoursesError } = useSWR(`/api/qaCourse-list/`, httpFetcher);
    console.log(instructorInfo)
    if (error && instructorCoursesError) {
        toast.error(error);
    }
    if (!instructorInfo && !error && !instructorCoursesError) {
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
                                    {['About', 'Courses', 'Author'].map((item, index) => (
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
                                        <AboutTab aboutUs={instructorInfo} />

                                        {/* End of About */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="courses" className="pb-4 px-0">
                                        {/* Beginner Courses */}
                                        {/* <CoursesTab /> */}

                                        {/* End of Courses */}
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="author" className="pb-4 px-0">
                                        {/* Author */}
                                        {/* <AuthorTab /> */}

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
