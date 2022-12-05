// import node module libraries
import { withRouter } from 'react-router-dom';
import { Card, Form, Row, Col, Button, Image } from 'react-bootstrap';

// import custom components
import FormSelect from 'components/elements/custom/FormSelect';
import { FlatPickr } from 'components/elements/custom/FlatPickr';

// import media files
import Avatar3 from 'assets/images/avatar/avatar-3.jpg';

// import profile layout wrapper
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext, useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import baseUrl from 'services/baseUrl';

const EditProfile = (props) => {
	const { theUser, setTheUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);
	const statelist = [
		{ value: '1', label: 'Gujarat' },
		{ value: '2', label: 'Rajasthan' },
		{ value: '3', label: 'Maharashtra' }
	];
	const countrylist = [
		{ value: '1', label: 'India' },
		{ value: '2', label: 'UK' },
		{ value: '3', label: 'USA' }
	];
	return (
		<ProfileLayout>
			{account === 'instructor'}
			<Card className="border-0">
				{/* <Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Profile Details</h3>
						<p className="mb-0">
							You have full control to manage your own account setting.
						</p>
					</div>
				</Card.Header> */}
				<Card.Body>
					<div className="d-lg-flex align-items-center justify-content-between">
						<div className="d-flex align-items-center mb-4 mb-lg-0">
							<Image
								src={baseUrl.baseUrl + theUser.profileImage}
								id="img-uploaded"
								className="avatar-xl rounded-circle"
								alt=""
							/>
							<div className="ms-3">
								<h4 className="mb-0">{theUser.fullName}</h4>
								<p className="mb-0">
									{theUser.userTitle}
								</p>
							</div>
						</div>
						<div>
							<Button variant="outline-white" size="sm">
								Update
							</Button>{' '}
							<Button variant="outline-danger" size="sm">
								Delete
							</Button>
						</div>
					</div>
					<hr className="my-5" />
					<div>
						<h4 className="mb-0">Personal Details</h4>
						<p className="mb-4">Edit your personal information and address.</p>
						{/* Form */}
						<Form>
							<Row>
								{/* First name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formFirstName">
										<Form.Label>Magaca Shaqsiga</Form.Label>
										<Form.Control
											type="text"
											placeholder="First Name"
											required
											name="fullName"
											value={theUser.fullName}
										/>
									</Form.Group>
								</Col>

								{/* Last name */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label>Email</Form.Label>
										<Form.Control type="email" name="email" disabled placeholder="Emailkaga" required value={theUser.email} />
									</Form.Group>
								</Col>
								

								{/* Phone */}
								<Col md={8} sm={8} className="mb-3">
									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label>Number</Form.Label>
										<Form.Control type="number" placeholder="Phone" required value={theUser.number} />
									</Form.Group>
								</Col>
								<Col md={4} sm={4} className="mb-3">
									<Form.Group className="mb-3" controlId="formPhone">
										<Form.Label> </Form.Label><br></br>
										<Button variant="primary" type="submit">
											HUBI NUMBERKA
										</Button>
									</Form.Group>

								</Col>
								

								{/* Birthday */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Birthday</Form.Label>
										<Form.Control
											as={FlatPickr}
											value={''}
											placeholder="Date of Birth"
											required
										/>
									</Form.Group>
								</Col>

								{/* Address Line 1 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Magalada</Form.Label>
										<Form.Control
											type="text"
											placeholder="Magaalada Aad Joogto"
											required
											value={theUser.city}

										/>
									</Form.Group>
								</Col>

								{/* Address Line 2 */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formBirthday">
										<Form.Label>Address Line 2</Form.Label>
										<Form.Control
											type="text"
											placeholder="Address Line 2"
											required
										/>
									</Form.Group>
								</Col>

								{/* State */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>State</Form.Label>
										<FormSelect options={statelist} />
									</Form.Group>
								</Col>

								{/* Country */}
								<Col md={6} sm={12} className="mb-3">
									<Form.Group className="mb-3" controlId="formState">
										<Form.Label>Country</Form.Label>
										<FormSelect options={countrylist} />
									</Form.Group>
								</Col>

								{/* Button */}
								<Col sm={12} md={12}>
									<Button variant="primary" type="submit">
										Update Profile
									</Button>
								</Col>
							</Row>
						</Form>
					</div>
				</Card.Body>
			</Card>
		</ProfileLayout>
	);
};

export default withRouter(EditProfile);
