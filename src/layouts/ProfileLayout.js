// import node module libraries
import React, { Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

// import routes file
// import {
// 	DashboardMenu,
// 	AccountSettingsMenu
// } from 'routes/marketing/StudentDashboardMenu';


// import media files
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';
import ProfileCover from 'pages/student/ProfileCover';
import { AccountSettingsMenu, DashboardMenu } from 'routes/StudentDashboardMenu';
import { useContext } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
const ProfileLayout = (props) => {
	
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const location = useLocation();
	

	useEffect(() => {
		document.body.style.backgroundColor = '#f5f4f8';
	});

	const dashboardData = {
		avatar: Avatar3,
		name: 'Stella Flores',
		username: '@stellaflores',
		linkname: 'Go to Dashboard ',
		link: '/user/dashboard',
		verified: true,
		outlinebutton: true,
		level: ''
	};

	return (
		<Fragment>
			<div className="pt-5 pb-5">
				<Container>
					{/* User info */}
					<ProfileCover dashboardData={currentUser} isDashboard={false} />

					{/* Content */}
					<Row className="mt-0 mt-md-4">
						<Col lg={3} md={4} sm={12}>
							<Navbar
								expand="lg"
								className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
							>
								<Link
									className="d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
									to="#"
								>
									Menu
								</Link>
								<Navbar.Toggle
									aria-controls="basic-navbar-nav"
									className="p-0 focus-none border-0"
									label="Responsive Menu"
								>
									<span
										className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
										data-bs-toggle="collapse"
										data-bs-target="#sidenav"
										aria-controls="sidenav"
										aria-expanded="false"
										aria-label="Toggle navigation"
									>
										<span className="fe fe-menu"></span>
									</span>
								</Navbar.Toggle>

								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto flex-column" as="ul" activeKey="0">
										<Nav.Item className="navbar-header" as="li">
											ACCOUNT SETTINGS
										</Nav.Item>
										{DashboardMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${
													item.link === location.pathname ? 'active' : ''
												}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
										<Nav.Item className="navbar-header mt-4" as="li">
											SUBSCRIPTION
										</Nav.Item>
										{AccountSettingsMenu.map((item, index) => (
											<Nav.Item
												as="li"
												key={index}
												className={`${
													item.link === location.pathname ? 'active' : ''
												}`}
											>
												<Link className="nav-link" to={item.link}>
													<i className={`fe fe-${item.icon} nav-icon`}></i>
													{item.title}
												</Link>
											</Nav.Item>
										))}
									</Nav>
								</Navbar.Collapse>
							</Navbar>
						</Col>

						<Col lg={9} md={8} sm={12}>
							{props.children}
						</Col>
					</Row>
				</Container>
			</div>
		</Fragment>
	);
};
export default ProfileLayout;
