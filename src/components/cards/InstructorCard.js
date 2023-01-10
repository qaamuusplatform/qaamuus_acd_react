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
				src={
					item.profileImage
					  ?  item.profileImage
					  : `https://ui-avatars.com/api/?name=${item.fullName}&background=19a9c4&color=fff`
				  }
				  style={{height:"250px",objectFit:"cover"}}
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
				{/* <div className="lh-1  d-flex justify-content-between">
					<div>
						<span className="fs-6 text-warning">
							<Icon path={mdiStar} size={0.5} /> <span>{item.rating}</span>
							<Icon path={mdiStar} size={0.5} /> <span>4</span> 
						</span>
					</div>
					<div>
						<span className="fs-6 text-muted">
							<span className="text-dark">
								{numberWithCommas(item.students)}12
							</span>{' '}
							Students
						</span>
					</div>
					<div>
						<span className="fs-6 text-muted">
							<span className="text-dark">{item.id}</span> Course
						</span>
					</div>
				</div> */}
			</Card.Body>
			<Card.Footer className="bg-white p-0">
				<div className="d-flex justify-content-between ">
					<div className="w-50 py-3 px-4 ">
						<h6 className="mb-0 text-muted">Koorsooyin:  <strong className='fw-bold'>{item.enrolledCourses.length}</strong></h6>
					</div>
					<div className="border-start w-50 py-3 px-4">
						<h6 className="mb-0 text-muted">events: <strong className='fw-bold'>{item.persenter.length}</strong> </h6>
						
					</div>
				</div>
			</Card.Footer>
		</Card>
	);
};

// Typechecking With PropTypes
GKInstructorCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default GKInstructorCard;
