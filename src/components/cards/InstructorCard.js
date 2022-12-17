// import node module libraries
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import MDI icons
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';

// Import required utility file
import { numberWithCommas } from 'helper/utils';
import { END_POINT } from 'helper/constants';

const GKInstructorCard = ({ item }) => {
	return (
		<Card className="mb-4 card-hover">
			{/* img */}
			<Card.Img
				variant="top"
				src={END_POINT+item.profileImage}
				className="rounded-top-md img-fluid"
			/>
			{/* card body */}
			<Card.Body>
				<h3 className="mb-0 fw-semi-bold">
					{' '}
					<Link to={`instructor/${item.username}/`} className="text-inherit">
						{item.fullName}
					</Link>
				</h3>
				<p className="mb-3">{item.userTitle}</p>
				<div className="lh-1  d-flex justify-content-between">
					<div>
						<span className="fs-6 text-warning">
							{/* <Icon path={mdiStar} size={0.5} /> <span>{item.rating}</span> */}
							<Icon path={mdiStar} size={0.5} /> <span>4</span> 
						</span>
					</div>
					<div>
						<span className="fs-6 text-muted">
							<span className="text-dark">
								{/* {numberWithCommas(item.students)} */}12
							</span>{' '}
							Students
						</span>
					</div>
					<div>
						<span className="fs-6 text-muted">
							<span className="text-dark">{item.id}</span> Course
						</span>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

// Typechecking With PropTypes
GKInstructorCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default GKInstructorCard;
