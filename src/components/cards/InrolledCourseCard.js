// import node module libraries
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Image,
	Card,
	Row,
	Col,
	ProgressBar,
	ListGroup,
	Badge
} from 'react-bootstrap';

// import tippy tooltip
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';

// import custom components
import LevelIcon from 'pages/student/miscellaneous/LevelIcon';
import Ratings from 'components/elements/common/ratings/Ratings';

// import utility file
import { numberWithCommas } from 'helper/utils';
import { END_POINT } from 'helper/constants';

const InrolledCourseCard = ({ item, free, viewby, showprogressbar, extraclass }) => {
	/** Used in Course Index, Course Category, Course Filter Page, Student Dashboard etc...  */
	const GridView = () => {
		return (
			<Card className={`mb-4 card-hover ${extraclass}`}>
				<Link to={`/course/${item.theCourse.slug}`}>
					<Image
						src={`${item.theCourse.coverImage}`}
						alt=""
						className="card-img-top rounded-top-md course-grid-cover-image"
					/>
				</Link>
				{/* Card body  */}
				<Card.Body>
					<h3 className="h4 mb-2 text-truncate-line-2 ">
						<Link to={`/course/${item.theCourse.slug}`} className="text-inherit">
							{item.theCourse.title}
						</Link>
					</h3>
					<ListGroup as="ul" bsPrefix="list-inline" className="mb-3">
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<i className="far fa-clock me-1"></i>
							{item.theCourse.houres}
						</ListGroup.Item>
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<LevelIcon level={item.theCourse.level} />
							{item.theCourse.level}
						</ListGroup.Item>
					</ListGroup>
					<div
						className={`lh-1 d-flex align-items-center`}
					>
						<span className="text-warning me-1 mb-1">
							{' '}
							<Ratings rating={'4.5'} />
						</span>
						<span className="text-warning me-1"> {'4.5'}</span>
						<span className="fs-6 text-muted">
							{' '}
							25,300
						</span>
					</div>
			
				</Card.Body>
				{/* Card Footer */}
				<Card.Footer>
					<Row className="align-items-center g-0">
						<Col className="col-auto">
							<Image
							src={
								item.theCourse.instructor?.profileImage
								  ?  item.theCourse.instructor?.profileImage
								  : `https://ui-avatars.com/api/?name=${item.theCourse.instructor?.fullName}&background=19a9c4&color=fff`
							  }
								className="rounded-circle avatar-xs"
								alt=""
							/>
						</Col>
						<Col className="col ms-2">
							<span>{item.theCourse.instructor.fullName}</span>
						</Col>
						<Col className="col-auto">
							<Tippy content="Add to Bookmarks" animation={'scale'}>
								<Link to="#" className="text-muted bookmark">
									<i className="fe fe-bookmark"></i>
								</Link>
							</Tippy>
						</Col>
					</Row>
					<span className={`${showprogressbar ? '' : 'd-none'}`}>
						{' '}
						<ProgressBar
							variant="success"
							now={6}
							className="mt-3"
							style={{ height: '5px' }}
						/>
					</span>
				</Card.Footer>
			</Card>
		);
	};

	/** Used in Course Filter Page  */
	const ListView = () => {
		return (
			<Card className="mb-4 card-hover">
				<Row className="g-0">
					<Link
						to={`/courses/${item.theCourse.slug}`}
						className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
						style={{
							background: `url(${item.theCourse.coverImage})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'top center'
						}}
					>
						<Image
							src={`${item.theCourse.coverImage}`}
							alt="..."
							className="img-fluid d-lg-none invisible"
						/>
					</Link>
					<Col lg={9} md={12} sm={12}>
						{/* <!-- Card body --> */}
						<Card.Body>
							<h3 className="mb-2 text-truncate-line-2 ">
								<Link to={`/courses/${item.theCourse.slug}`} className="text-inherit">
									{item.theCourse.title}
								</Link>
							</h3>
							{/* <!-- List inline --> */}
							<ListGroup as="ul" bsPrefix="list-inline" className="mb-5">
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<i className="far fa-clock me-1"></i>
									{item.theCourse.houres}hrs
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<LevelIcon level={item.theCourse.level} />
									{item.theCourse.level}
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<span className="text-warning">
										{' '}
										<Ratings rating={4.5} /> {4.5}
									</span>
									<span className="fs-6 text-muted">
										{' '}
										25,00
									</span>
								</ListGroup.Item>
							</ListGroup>
							{/* <!-- Row --> */}
							<Row className="align-items-center g-0">
								<Col className="col-auto">
									<Image
										src={`${END_POINT}${item.theCourse.instructor.profileImage}`}
										className="rounded-circle avatar-xs"
										alt=""
									/>
								</Col>
								<Col className="col ms-2">
									<span>{item.theCourse.instructor.fullName}</span>
								</Col>
								<Col className="col-auto">
									<Tippy content="Add to Bookmarks" animation={'scale'}>
										<Link to="#" className="text-muted bookmark">
											<i className="fe fe-bookmark"></i>
										</Link>
									</Tippy>
								</Col>
							</Row>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		);
	};

	/** Used in Instructor Profile Page  */
	const ListGroupView = () => {
		return (
			<div className="d-lg-flex align-items-center">
				<div>
					<Image src={item.theCourse.image} alt="" className="rounded img-4by3-lg" />
				</div>
				<div className="ms-lg-3 mt-2 mt-lg-0">
					<h4 className="text-primary-hover">
						{item.theCourse.title}{' '}
						<Badge bg="light-success" className="text-success">
							New
						</Badge>
					</h4>
					<ListGroup
						as="ul"
						bsPrefix="list-inline"
						className="fs-6 mb-0 text-inherit"
					>
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<i className="far fa-clock me-1"></i>
							{item.theCourse.duration}
						</ListGroup.Item>
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<LevelIcon level={item.theCourse.level} />
							{item.theCourse.level}
						</ListGroup.Item>
						<ListGroup.Item as="li" bsPrefix="list-inline-item">
							<span className="text-warning">
								{' '}
								<Ratings rating={item.theCourse.rating} /> {item.theCourse.rating.toFixed(1)}
							</span>
							<span className="fs-6 text-muted">
								{' '}
								({numberWithCommas(item.theCourse.ratingby)})
							</span>
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>
		);
	};
	return (
		<Fragment>
			{viewby === 'grid' ? (
				<GridView />
			) : viewby === 'list' ? (
				<ListView />
			) : (
				null
			)
			}
		</Fragment>
	);
};

// Specifies the default values for props
InrolledCourseCard.defaultProps = {
	free: false,
	viewby: 'grid',
	showprogressbar: false,
	extraclass: 'card'
};

// Typechecking With PropTypes
InrolledCourseCard.propTypes = {
	item: PropTypes.object.isRequired,
	free: PropTypes.bool,
	viewby: PropTypes.string,
	showprogressbar: PropTypes.bool,
	extraclass: PropTypes.string
};

export default InrolledCourseCard;
