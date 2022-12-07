// import node module libraries
import { withRouter } from 'react-router-dom';
import { Card, Form, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

// import custom components


// import media files

// import profile layout wrapper
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext, useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import baseUrl from 'services/baseUrl';

const AuthSecurity = (props) => {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [currentpassword, setCurrentPassword] = useState('');

	return (
		<ProfileLayout>
			{/* {account === 'instructor'} */}
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Security</h3>
						<p className="mb-0">
							Edit your account settings and change your password here.
						</p>
					</div>
				</Card.Header>
				<Card.Body>

					<Form>
						<Row>
							<Col lg={6} md={12} sm={12} className="mb-3">
								<h4 className="mb-0">Email Address</h4>
								<p>
									Emailka hadda waa{' '}
									<span className="text-success">{currentUser.email}</span>
								</p>
								<Form.Group>
									<Form.Label htmlFor="email">Emailka Cusub</Form.Label>
									<Form.Control type="email" id="email"  required />
								</Form.Group>

							</Col>
							<Col lg={6} md={12} sm={12} className="mb-3">
								<h4 className="mb-0">Usernameka</h4>
								<p>
									Usernamekaga hadda waa{' '}
									<span className="text-success">{currentUser.user.username}</span>
								</p>
								<Form.Group>
									<Form.Label htmlFor="text">Usernamka Cusub</Form.Label>
									<Form.Control type="text" id="text" required />
								</Form.Group>

							</Col>
						</Row>
						<Button type="submit" className="btn btn-primary mt-2">
							Update Details
						</Button>
					</Form>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Badal Passwordka</h4>
						<p>
							We will email you a confirmation when changing your password, so
							please expect that email after submitting.
						</p>
						{/* Form */}
						<Form>
							<Row>
								<Col lg={12} md={12} sm={12}>
									{/* Current password */}

									<Form.Group className="mb-3">
										<Form.Label htmlFor="currentpassword">
											Passwordkii Hore
										</Form.Label>
										<Form.Control
											type="password"
											id="currentpassword"
											placeholder="********"
											value={currentpassword}
											onChange={(e) => setCurrentPassword(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>
								
								<Col lg={6} md={12} sm={12}>
									{/* New password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="newpassword">Passwordka Cusub</Form.Label>
										<Form.Control
											type="password"
											id="newpassword"
											placeholder="********"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>
								
								<Col lg={6} md={12} sm={12}>
									
									{/* Confirm new password */}
									<Form.Group className="mb-3">
										<Form.Label htmlFor="confirmpassword">
											Hubi Passwordka Cusub
										</Form.Label>
										<Form.Control
											type="password"
											id="confirmpassword"
											placeholder="********"
											value={confirmpassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</Form.Group>
									{/* Button */}
									<Button type="submit" className="text-right btn btn-primary">
										Save Password
									</Button>
									<div className="col-6"></div>
								</Col>
								<Col lg={12} md={12} sm={12} className="mt-4">
									<p className="mb-0">
										Can't remember your current password?{' '}
										<Link to="#">Reset your password via email</Link>
									</p>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default withRouter(AuthSecurity);
