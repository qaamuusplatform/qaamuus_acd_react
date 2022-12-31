// import node module libraries

import React, { Fragment, useState, useContext, useEffect } from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
    Dropdown,
    Form,
    ListGroup,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Image,
    Button,
  } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { httpFetcher } from "services/coursesService";
import { CurrentUserContext } from "services/currentUserContext";
import useSWR from "swr";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import InverseLogo from "assets/images/brand/logo/logo.svg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import { useMediaQuery } from "react-responsive";





const EventWatchVr = () => {
    const { currentUser, setCurrentUser, userIsLoading } =
      useContext(CurrentUserContext);
      const { slug } = useParams();
      const { data: enrolledEventDetail, error } = useSWR(`/api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`, httpFetcher);
     
      useEffect(() => {
          
      }, [enrolledEventDetail,currentUser]);
    const isDesktop = useMediaQuery({
      query: "(min-width: 1224px)",
    });
    const isLaptop = useMediaQuery({
      query: "(min-width: 1024px)",
    });
    
  
    const [expandedMenu, setExpandedMenu] = useState(false);
  
    const QuickMenu = () => {
      return (
        <Fragment>
          <Dropdown
            as={Nav.Item}
            className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
          >
            <Dropdown.Toggle
              as={Nav.Link}
              bsPrefix="dt"
              className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
              id="dropdownNotification"
            >
              <i className="fe fe-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              show={isDesktop ? true : false}
              className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
              aria-labelledby="dropdownNotification"
              align="end"
            >
              <div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
                <span className="h4 mb-0">Ogaysiisyada</span>
                <Link to="# " className="text-muted">
                  <span className="align-middle">
                    <i className="fe fe-settings me-1"></i>
                  </span>
                </Link>
              </div>
              <SimpleBar style={{ maxHeight: "300px" }}>
                <ListGroup variant="flush">
                  {currentUser.theNotifications
                    ?.filter((theNotific) => theNotific.seen === false)
                    .map(function (theNotific, index) {
                      return (
                        <ListGroup.Item
                          className={index === 0 ? "bg-light" : ""}
                          key={index}
                        >
                          <Row>
                            <Col>
                              <Link className="text-body" to="#">
                                <div className="d-flex">
                                  <Image
                                    src={theNotific.fromUser.profileImage}
                                    alt=""
                                    className="avatar-md rounded-circle"
                                  />
                                  <div className="ms-3">
                                    <h5 className="fw-bold mb-1">
                                      {theNotific.title}
                                    </h5>
                                    <p className="mb-3">{theNotific.text}</p>
                                    <span className="fs-6 text-muted">
                                      <span>
                                        <span className="fe fe-thumbs-up text-success me-1"></span>
                                        {moment(theNotific.dateTime).format(
                                          "MMMM Do YYYY"
                                        )}
                                      </span>
                                      <span className="ms-1">
                                        {moment(theNotific.dateTime).format(
                                          "h:mm:ss a"
                                        )}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col className="col-auto text-center me-2">
                              <OverlayTrigger
                                key="top"
                                placement="top"
                                overlay={
                                  <Tooltip id="tooltip-top">
                                    Mark as unread
                                  </Tooltip>
                                }
                              >
                                <Link to="#">
                                  <DotBadge bg="secondary"></DotBadge>
                                </Link>
                              </OverlayTrigger>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </SimpleBar>
              <div className="border-top px-3 pt-3 pb-3">
                <Link
                  to="/user/notifications/"
                  className="text-link fw-semi-bold"
                >
                  See all Notifications
                </Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle
              as={Nav.Link}
              bsPrefix="dt"
              className="rounded-circle border-bottom-0"
              id="dropdownUser"
            >
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <Image
                  alt="avatar"
                  src={
                    currentUser.profileImage
                      ? currentUser.profileImage
                      : `https://ui-avatars.com/api/?name=${currentUser.fullName}&background=19a9c4&color=fff`
                  }
                  className="rounded-circle"
                />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu
              show={isDesktop ? true : false}
              className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
              aria-labelledby="dropdownUser"
              align="end"
            >
              <Dropdown.Item className="mt-3">
                <div className="d-flex">
                  <div className="avatar avatar-md avatar-indicators avatar-online">
                    <Image
                      alt="avatar"
                      src={
                        currentUser.profileImage
                          ? currentUser.profileImage
                          : `https://ui-avatars.com/api/?name=${currentUser.fullName}&background=19a9c4&color=fff`
                      }
                      className="rounded-circle"
                    />
                  </div>
                  <div className="ms-3 lh-1">
                    <h5 className="mb-1">{currentUser.fullName}</h5>
                    <p className="mb-0 text-muted">{currentUser.email}</p>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/user/dashboard/" eventKey="2">
                <i className="fe fe-user me-2"></i> Dashboard
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <i className="fe fe-star me-2"></i> Subscription
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/user/edit-profile/">
                <i className="fe fe-settings me-2"></i> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              {/* localStorage.removeItem("access") */}
              <Dropdown.Item className="mb-3">
                <i className="fe fe-power me-2"></i> Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Fragment>
      );
    };
  
    return (
      <div>
        <Navbar
          bg="dark"
          expand="lg"
          onToggle={(collapsed) => setExpandedMenu(collapsed)}
        >
          <Fragment className="px-0">
            {/* brand logo */}
            <Navbar.Brand as={Link} to="#">
              <Image src={InverseLogo} width={175} alt="" />
            </Navbar.Brand>
            {/* search box */}
            {/* <div className="ms-lg-3 d-none d-md-none d-lg-block">
              <Form className="d-flex align-items-center">
                              <span className="position-absolute ps-3 search-icon">
                                  <i className="fe fe-search text-muted"></i>
                              </span>
                              <Form.Control
                                  type="search"
                                  placeholder="Search Entire Dashboard"
                                  className="form-control form-control-sm ps-6 border-white"
                              />
                          </Form>
            </div> */}
            {/* Right side quick / shortcut menu  */}
            {/* <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <span className={`d-flex`}>
                <QuickMenu />
              </span>
            </Nav> */}
            <Navbar.Toggle aria-controls="navbarScroll">
              <span className="icon-bar top-bar mt-0"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </Navbar.Toggle>
          </Fragment>
        </Navbar>
  
        {/* body container */}
        <Fragment className="my-6 bg-dark">
            dasdas
        </Fragment>
      </div>
    );
  };
  export default EventWatchVr;
  