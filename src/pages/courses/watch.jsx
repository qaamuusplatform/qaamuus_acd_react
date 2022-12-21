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
import NavbarDefault from 'routes/NavbarDefault';
import GKYouTube from 'components/marketing/common/video/GKYouTube';
import GKAccordionDefault from 'components/accordions/GKAccordionDefault';
import useSWR from 'swr';
import { useContext } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import { httpFetcher } from 'services/coursesService';
import { useEffect } from 'react';
import { youTubeIdFromLink } from 'helper/utils';
import CourseContent from 'components/accordions/CourseContent';
import { toast } from 'react-toastify';

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
            <div className="mt-0 course-container">
                <Container fluid>
                    {
                        courseInfo?.isEnrolled ?

                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    {/*  Tab content  */}
                                    <div className="content">
                                        <div className="mt-3">
                                            {/*  Video */}

                                            <div className="embed-responsive position-relative w-100 d-block overflow-hidden p-0" >
                                                <div style={{ position: 'relative', paddingTop: '56.25%' }}><iframe src="https://iframe.mediadelivery.net/embed/36078/18b11231-8237-4040-b71a-c5da3e495df4?autoplay=false" loading="lazy" style={{ border: 'none', position: 'absolute', top: 0, height: '100%', width: '100%' }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true" /></div>

                                            </div>

                                            <div className="mt-4 mb-4">
                                                <div>
                                                    <h2 className=" mb-0 fw-bold text-truncate-line-2 text-capitalize">
                                                        {currentVideo.lesson ?? courseInfo?.theCourse?.title}    </h2>
                                                    <h5 className="mb-2 fw-normal text-truncate-line-2 ">
                                                        {courseInfo?.theCourse?.simDesc}

                                                    </h5>
                                                    <hr></hr>
                                                    <h5 className="mb-2 fw-normal text-truncate-line-2 ">
                                                        {courseInfo?.theCourse?.fullDesc}

                                                    </h5>
                                                </div>
                                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores cumque quaerat doloremque alias. Quae nesciunt hic provident dignissimos natus repellat dolor quia eaque in id perspiciatis corporis, voluptas recusandae ad!</p>
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
                    <Card className="course-sidebar " id="courseAccordion">
                        <SimpleBar style={{ maxHeight: '93vh' }}>
                            <Card>
                                <Card.Header>
                                    <h4 className="mb-0">Course Content</h4>
                                </Card.Header>
                                {/* Course Index Accordion */}
                                <CourseContent lessons={courseInfo?.theCourse?.theComponents ?? []} onClickLesson={setCurrentVideo} currentLesson={currentVideo} />
                            </Card>
                        </SimpleBar>
                    </Card> : null}
        </Fragment>
    );
};

export default WatchCourse;
