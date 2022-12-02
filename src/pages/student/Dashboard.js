// import node module libraries
import { Fragment, useEffect, useContext } from 'react';
import { Col, Row, Nav, Tab, Card, Container } from 'react-bootstrap';

// import custom components
// import CourseCard from 'components/marketing/pages/courses/CourseCard';
import ProfileCover from './ProfileCover';

// import media files
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';
import { CurrentUserContext } from 'services/currentUserContext';
import { getUserEnrolmentsData } from 'services/userInrolledData';
import { useState } from 'react';
import AllCoursesData from 'data/AllCoursesData';
import Slider from 'react-slick';
import CourseCard from 'components/cards/CourseCard';

// import data files
const StudentDashboard = () => {
    const { theUser, setTheUser } = useContext(CurrentUserContext);
    const [userEnrolmentsData, setUserEnrolmentsData] = useState([]);

    const qInit = async () => {
        const { data } = await getUserEnrolmentsData('theUser');
        // console.log(data);
        setUserEnrolmentsData(data);
    }
    const dashboardData = {
        avatar: Avatar3,
        name: 'Stella Flores',
        username: '@stellaflores',
        linkname: 'Account Setting',
        link: '/student/edit-profile/',
        verified: false,
        outlinebutton: false,
        level: 'Beginner'
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#f5f4f8';
        qInit();
    }, []);
    const courseSliderSettings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Fragment>
            <div className="pt-5 pb-5">
                <Container>
                    {/* User info */}
                    <ProfileCover dashboardData={theUser} isDashboard={true} />

                    {/* Content */}
                    <Row className="mt-0 mt-md-4">
                        <Col lg={12} md={12} sm={12}>
                            <Row className="mb-6">
                                <Col md={12}>
                                    <Tab.Container defaultActiveKey="courses">
                                        <Card className="bg-transparent shadow-none ">
                                            <Card.Header className="border-0 p-0 bg-transparent">
                                                <Nav className="nav-lb-tab">
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="courses"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Courses
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            eventKey="events"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Events
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item className="ms-0">
                                                        <Nav.Link
                                                            eventKey="bookmarked"
                                                            className="mb-sm-3 mb-md-0"
                                                        >
                                                            Bookmarked
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Card.Header>
                                            <Card.Body className="p-0">
                                                <Tab.Content>

                                                    <Tab.Pane eventKey="courses" className="pb-4 p-4 ps-0 pe-0" >
                                                        {/* learning courses started */}
                                                        <Row>
															{AllCoursesData.filter(function (datasource) {
																return datasource;
															}).slice(0, 8)
																.map((item, index) => (
																	<Col lg={3} md={6} sm={12} key={index}>
																		<CourseCard item={item} showprogressbar />
																	</Col>
																))}
														</Row>
                                                        {/* end of learning courses */}
                                                    </Tab.Pane>
                                                    <Tab.Pane
                                                        eventKey="events"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* learning courses started */}

                                                        {/* end of learning courses */}
                                                    </Tab.Pane>
                                                    <Tab.Pane
                                                        eventKey="bookmarked"
                                                        className="pb-4 p-4 ps-0 pe-0"
                                                    >
                                                        {/* bookmarked started */}

                                                        {/* end of bookmarked */}
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Container>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};
export default StudentDashboard;
