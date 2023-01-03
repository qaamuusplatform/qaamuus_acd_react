// import node module libraries
import { Fragment, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image, ProgressBar, Form, Modal, Button, Spinner, Badge, Dropdown } from 'react-bootstrap';

// import custom components
import Ratings from 'components/elements/common/ratings/Ratings';
import { END_POINT } from 'helper/constants';
import { Rating } from "react-simple-star-rating";
import http from 'services/httpService';
import { useContext } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import Icon from '@mdi/react';
import { mdiLock } from '@mdi/js';
import { toast } from 'react-toastify';
// import {mutate} from 'swr';
// import useSWR from 'swr';
import { httpFetcher } from 'services/coursesService';
import { Edit, MoreVertical, Move, ToggleLeft, ToggleRight, Trash } from 'react-feather';
// import { Reviews } from 'data/CourseIndexData';

// import data files

const ReviewsTab = ({ reviews, courseId }) => {
	console.log(reviews)
	const { currentUser, userIsLoading } = useContext(CurrentUserContext);
	const [registringReviewModal, setRegistringReviewModal] = useState(false)
	const [modalShow, setModalShow] = useState(false);
	const [rating, setRating] = useState(0)
	const [theRatingComp, setRatingComp] = useState(<Badge bg="primary" className="me-1">Heerka</Badge>)

	const CustomToggle = forwardRef(({ children, onClick }, ref) => (
		<Link
			to=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
		</Link>
	))
	// const { data,error,mutate } = useSWR( `/api/checkThisUserInrolledCourse-slug/${currentUser.id}/${slug}/`, httpFetcher );
	const handleRating = (number) => {
		setRating(number)
	}
	const deleteReview = async (id) =>{
		
		await http.delete(`/api/courseReview-create/${id}/`);
		toast.success(
			"Waad ku guulaysatay bixinta falcelintaada"
		);
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		var theUser = currentUser.id;
		setRegistringReviewModal(true)
		const formData = new FormData(e.target)
		let resp = await http.post(
			"/api/courseReview-create/",
			JSON.stringify({
				'theText': formData.get('theText'),
				'theUser': theUser,
				'theRating': rating,
				'theCourse': courseId,
			}),
			{
				headers: { "Content-Type": "application/json" },
			}
		)

		console.log(resp)
		toast.success(
			"Waad ku mahadsantahy falcelintaada"
		);
		setRegistringReviewModal(false)
		mutate()
		setModalShow(false)

	}
	const ActionMenu = ({theUserId,theReviewId}) => {
		
		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>SETTINGS</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						{' '}
						<Edit size="18px" className="dropdown-item-icon" /> Badalid
					</Dropdown.Item>
					{/* <Dropdown.Item eventKey="2">
						{' '}
						<Move size="18px" className="dropdown-item-icon" /> Move
					</Dropdown.Item>
					
					<Dropdown.Item eventKey="4">
						{' '}
						<ToggleLeft size="18px" className="dropdown-item-icon" /> Publish
					</Dropdown.Item>
					<Dropdown.Item eventKey="5">
						{' '}
						<ToggleRight size="18px" className="dropdown-item-icon" /> Unpublish
					</Dropdown.Item> */}
					<Dropdown.Item className='bg-danger text-white' eventKey="6">
						{' '}
						<Trash size="18px" className="dropdown-item-icon" onClick={deleteReview} color='white' /> Delete
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};
	return (
		<Fragment>
			<Modal show={modalShow} data-backdrop="static" backdrop="static" onHide={() => setModalShow(false)} centered>
				<Form onSubmit={handleSubmit} controlId="validationFormik01" >
					<Modal.Header closeButton className="pt-4 pb-2">
						<Modal.Title>Faahfaahinta Falcelinta</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<Col lg={12} md={12} sm={12} className="mb-1 mt-0">

							<Rating onClick={handleRating} initialValue={rating} className="mb-3" /> {theRatingComp}
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Faahfaahin Dheeri Ah</Form.Label>
								<Form.Control as="textarea" required name="theText" rows={3} />
							</Form.Group>

						</Col>



					</Modal.Body>

					<Modal.Footer className="pt-1 pb-2">
						<Button variant="secondary" size="sm" onClick={() => setModalShow(false)}>
							Close
						</Button>
						{registringReviewModal ? (
							<Button variant="primary" size="md" disabled>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								&nbsp; Loading...
							</Button>
						) : (<Button variant="primary" type="submit" size="md"> Diiwaangali </Button>)}


					</Modal.Footer>

				</Form>

			</Modal>
			<div className="mb-3">
				<h3 className="mb-4">Ardada Ka Cod Bixisay</h3>
				<Row className="align-items-center">
					<Col xs="auto" className="text-center">
						<h3 className="display-2 fw-bold">4.5</h3>
						<span className="text-warning">
							<Ratings rating={4.5} />
						</span>
						<p className="mb-0 fs-6">(Based on 27 reviews)</p>
					</Col>
					<Col className="pt-3 order-3 order-md-2">
						<ProgressBar
							variant="warning"
							now={50}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={36}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={9}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={3}
							className="mb-3"
							style={{ height: '6px' }}
						/>
						<ProgressBar
							variant="warning"
							now={2}
							className="mb-3"
							style={{ height: '6px' }}
						/>
					</Col>
					<Col xs={6} md="auto" className="order-2 order-md-3">

						<div>
							<span className="text-warning">
								<Ratings rating={5} />
							</span>
							<span className="ms-4">50%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={4} />
							</span>
							<span className="ms-4">36%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={3} />
							</span>
							<span className="ms-4">9%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={2} />
							</span>
							<span className="ms-4">3%</span>
						</div>
						<div>
							<span className="text-warning">
								<Ratings rating={1} />
							</span>
							<span className="ms-4">2%</span>
						</div>
					</Col>
				</Row>
			</div>

			<hr className="my-5" />
			<div className="mb-3">
				<div className="d-lg-flex align-items-center justify-content-between mb-5">
					{/* Reviews */}
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Falcelinta Ardada</h3>
					</div>
					<div>
						{/* Form */}
						{Object.keys(currentUser).length === 0 ? (
							<Link
								to={{
									pathname: "/auth/login",
									state: { from: location },
								}}
								className={`btn btn-dark`}
							>
								<Icon path={mdiLock} size={1} className="mb-0" color="white" /> &nbsp;
								LOGIN
							</Link>
						) : (
							<Button variant="primary" type="submit" size="smd" onClick={() => setModalShow(true)}>
								{" "}
								Falcelin Reeb{" "}
							</Button>
						)}

					</div>
				</div>
				{/* Rating */}
				{reviews.length != 0 ? (
					reviews.map((item, index) => (
						<div className="d-flex border-bottom pb-4 mb-4" key={index}>
							<Image
								src={item.theUser.profileImage}
								alt=""
								className="rounded-circle avatar-lg"
							/>
							<div className="ms-3 w-100">
								<h4 className="mb-1">
									<div className='d-flex justify-content-between' >
										<div>{item.theUser.fullName} </div>
										<ActionMenu theUserId={item.theUser.id} theReviewId={item.id} />
									</div>

									<span className="ms-1 fs-6 text-muted">{item.userTitle} </span>
								</h4>

								<div className="fs-6 mb-2 text-warning">
									<Ratings rating={item.theRate} />
								</div>
								<div
									dangerouslySetInnerHTML={{
										__html: item.theText
									}}
								/>
								{/* <div className="d-lg-flex">
									<p className="mb-0">Was this review helpful?</p>
									<Link to="#" className="btn btn-xs btn-primary ms-lg-3">
										Yes
									</Link>
									<Link to="#" className="btn btn-xs btn-outline-white ms-1">
										No
									</Link>
								</div> */}
							</div>
						</div>
					))
				) : (<center>Ma jiraan Wax Falcelin ah</center>)}


			</div>
		</Fragment>
	);
};
export default ReviewsTab;
