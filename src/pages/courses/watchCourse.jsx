// import node module libraries
import React, { Fragment, useState } from 'react';
import { Col, Row, Container, Card, Dropdown, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { MoreVertical } from 'react-feather';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiLinkedin, mdiContentCopy } from '@mdi/js';

// import data
import useSWR from 'swr';
import { useContext } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import { httpFetcher } from 'services/coursesService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import GKAccordionProgress from 'components/accordions/GKAccordionProgress';
import { CourseIndex } from 'data/CourseIndexData';
import Parse from 'html-react-parser'
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
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

const ActionMenu = ({ url }) => {

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                <MoreVertical size="15px" className="text-secondary" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                <Dropdown.Header>SHARE</Dropdown.Header>
                <Dropdown.Item eventKey="1">
                    <Icon path={mdiFacebook} size={0.8} className="text-secondary" />{' '}
                    Facebook
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                    <Icon path={mdiTwitter} size={0.8} className="text-secondary" />{' '}
                    Twitter
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                    <Icon path={mdiLinkedin} size={0.8} className="text-secondary" />{' '}
                    Linked In
                </Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={() => {

                    toast.success('Link Coppied')
                }}>
                    <Icon path={mdiContentCopy} size={0.8} className="text-secondary" />
                    Copy Link
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const WatchCourse = ({ match }) => {
    const [currentVideo, setCurrentVideo] = useState({});
    const { currentUser, userIsLoading } = useContext(CurrentUserContext);
    const { slug } = useParams();
    const { data: courseInfo, error } = useSWR(
        `/api/checkThisUserInrolledCourse-slug/${currentUser?.id}/${slug}/`,
        httpFetcher
    );


    useEffect(() => {

        if (courseInfo) {
            // setCurrentVideo(courseInfo?.theCourse?.theComponents[0]?.lessonLink);
        }
    }, [courseInfo])


    return (
        <Fragment>
            {/* <NavbarDefault login /> */}
            <div className="mt-2 course-container">
                <Container fluid>
                    {
                        courseInfo?.isEnrolled ?

                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    {/*  Tab content  */}
                                    <div className="content ">
                                        <div className="rounded-2 overflow-hidden">
                                            {/*  Video */}

                                            <div className="embed-responsive position-relative w-100 d-block overflow-hidden p-0" >
                                                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                                                    <iframe src={currentVideo.link} loading="lazy" style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true" />
                                                </div>

                                            </div>

                                            <div className="mt-4 mb-4">
                                                <div>
                                                    <h2 className=" mb-0 fw-bold text-truncate-line-2 text-capitalize">
                                                        {currentVideo.lesson ?? courseInfo?.theCourse?.title}    </h2>
                                                    <h5 className="mb-0 fw-normal">
                                                        {courseInfo?.theCourse?.simDesc}

                                                    </h5>
                                                    <hr></hr>
                                                    <h5 className="mb-2 fw-normal ">
                                                        {Parse(courseInfo?.theCourse?.fullDesc)}

                                                    </h5>
                                                </div>
                                                {/* <div className="d-flex justify-content-between">
                                                    <Dropdown className="video-info-icon me-2">
                                                        <Dropdown.Toggle
                                                            bsPrefix=" "
                                                            as="a"
                                                            href="#"
                                                            variant="secondary"
                                                            id="dropdown-basic"
                                                        >
                                                            <i className="fe fe-help-circle text-secondary"></i>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu
                                                            className="p-3"
                                                            style={{ width: '300px' }}
                                                        >
                                                            <span>
                                                                {courseInfo?.theCourse?.simDesc}
                                                            </span>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    <ActionMenu url={match.url} />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            :
                            null
                    }
                </Container>
            </div>
            {/*  Card */}
            {
                courseInfo?.isEnrolled ?

                    <Card className="course-sidebar h-100 rounded-0" id="courseAccordion">
                        <Card.Header className='fw-bold bg-dark text-white rounded-0'>CASHIRADA COURSKA</Card.Header>

                        <GKAccordionProgress lessons={courseInfo?.theCourse?.theComponents ?? []} onClickLesson={setCurrentVideo} currentLesson={currentVideo} />
                    </Card> : null}
        </Fragment>
    );
};

export default WatchCourse;
