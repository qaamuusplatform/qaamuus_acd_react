// import node module libraries
import { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

// simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// import custom components
import DotBadge from "components/elements/bootstrap/DotBadge";

// import media files
import Logo from "assets/images/brand/logo/logo.svg";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";

// import data files
import NavbarDefaultRoutes from "routes/NavbarDefault";
import NotificationList from "data/Notification";
import NavDropdownMain from "layouts/navbars/NavDropdownMain";
import baseUrl from "services/baseUrl";
import { CurrentUserContext } from "services/currentUserContext";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { END_POINT } from "helper/constants";

const NavbarDefault = ({ headerstyle, isLoading, login }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

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
                {currentUser.theNotifications?.filter((theNotific) => theNotific.seen === false).map(function (theNotific, index) {
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
                                <h5 className="fw-bold mb-1">{theNotific.title}</h5>
                                <p className="mb-3">{theNotific.text}</p>
                                <span className="fs-6 text-muted">
                                  <span>
                                    <span className="fe fe-thumbs-up text-success me-1"></span>
                                    {moment(theNotific.dateTime).format("MMMM Do YYYY")}
                                  </span>
                                  <span className="ms-1">{moment(theNotific.dateTime).format("h:mm:ss a")}</span>
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
                              <Tooltip id="tooltip-top">Mark as unread</Tooltip>
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
                src={currentUser.profileImage?  currentUser.profileImage:`https://ui-avatars.com/api/?name=${currentUser.fullName}&background=19a9c4&color=fff`}
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
                    src={currentUser.profileImage?  currentUser.profileImage:`https://ui-avatars.com/api/?name=${currentUser.fullName}&background=19a9c4&color=fff`}
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
            <Dropdown.Item onClick={()=>{localStorage.removeItem('access'); setCurrentUser({})}} className="mb-3">
              <i className="fe fe-power me-2"></i> Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${login ? "bg-white" : ""} navbar p-2 ${
          headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"
        }`}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image width={175} src={Logo} alt="" />
          </Navbar.Brand>
          <div
            className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
              login ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"
            }`}
          >
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">
                <strong>HOME</strong>{" "}
              </Nav.Link>
              {NavbarDefaultRoutes.map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link key={item.id} as={Link} to={item.link}>
                      <strong>{item.menuitem}</strong>
                    </Nav.Link>
                  );
                } else {
                  return (
                    <strong>
                      <NavDropdownMain
                        item={item}
                        key={item.id}
                        onClick={(value) => setExpandedMenu(value)}
                      />
                    </strong>
                  );
                }
              })}
              <NavDropdown
                title="..."
                id="basic-nav-dropdown"
                bsPrefix="no-dropdown-arrow d-block nav-link fs-3 lh-1 pt-0"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/nagu-saabsan/"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-file-text fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">Ngu saabsan</h5>
                      <p className="mb-0 fs-6">Maclumaad ku saabsan Qaamuus</p>
                    </div>
                  </div>
                </NavDropdown.Item>
                {/* <NavDropdown.Item
                  as={Link}
                  to="#"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-layers fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">
                        Changelog{" "}
                        <span className="text-primary ms-1">v1.4.0</span>
                      </h5>
                      <p className="mb-0 fs-6">See what's new</p>
                    </div>
                  </div>
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            {/* Search Form */}
            <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="formSearch"
                className="ps-6"
                placeholder="Search Courses"
              />
            </Form>
            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              {isLoading ?(
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
                  {/* <i className="fe fe-bell"></i> */}
                </Dropdown.Toggle>
                <Dropdown.Toggle
                  as={Nav.Link}
                  bsPrefix="dt"
                  className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
                  id="dropdownNotification"
                >
                  {/* <i className="fe fe-bell"></i> */}
                </Dropdown.Toggle>
                
              </Dropdown>
              
            </Fragment>
              ):(
                <span
                className={`ms-auto mt-3 mt-lg-0  ${login ? "d-none" : ""}`}
              >
                <Nav.Link
                  as={Link}
                  to="/auth/login"
                  bsPrefix="btn"
                  className="btn btn-white shadow-sm me-2"
                >
                  Log In
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/join/sign-up"
                  bsPrefix="btn"
                  className="btn btn-primary shadow-sm"
                >
                  Sign Up
                </Nav.Link>
              </span>
              )}
              

              <span
                className={`${
                  login
                    ? isDesktop || isLaptop
                      ? "d-flex"
                      : "d-none"
                    : "d-none"
                }`}
              >
                {isLoading ?(null):(
                <QuickMenu />
                )}
              </span>
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  isLoading:false,
  login: false,
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  isLoading:PropTypes.bool,
  login: PropTypes.bool,
};

export default NavbarDefault;
