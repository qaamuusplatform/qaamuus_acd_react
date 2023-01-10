// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, ProgressBar, Dropdown, Image } from 'react-bootstrap';

import parse from 'html-react-parser';
// import custom components
import { Avatar, AvatarGroup } from 'components/elements/bootstrap/Avatar';

// import utility file
import { numberWithCommas, getStatusColor } from 'helper/utils';
import { END_POINT } from 'helper/constants';

// import data files
// import ProjectTeamMembersData from 'data/dashboard/projects/ProjectTeamMembersData';

const ProjectCard = ({ item }) => {
	// The forwardRef is important!!
	// Dropdown needs access to the DOM node in order to position the Menu
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
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
	));

	const ActionMenu = () => {
		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<i className="fe fe-more-vertical text-muted"></i>
				</Dropdown.Toggle>
				<Dropdown.Menu align="end">
					<Dropdown.Header>Settings</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<i className="fe fe-edit dropdown-item-icon"></i>Edit Details
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<i className="fe fe-link dropdown-item-icon"></i>Copy project link
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-save dropdown-item-icon"></i>Save as Default
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-copy dropdown-item-icon"></i>Duplicate
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item eventKey="3">
						<i className="fe fe-upload dropdown-item-icon"></i>Import
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-printer dropdown-item-icon"></i>Export / Print
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-users dropdown-item-icon"></i>Move to another
						team
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item eventKey="3">
						<i className="fe fe-archive dropdown-item-icon"></i>Archive
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<i className="fe fe-trash dropdown-item-icon"></i>Delete Project
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};



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
					<Link to={`/instructor/${item.username}/`} className="text-inherit">
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
				<div className="mt-2 mb-3">
					
					<p> {parse(item.summerInfo ?? '')}	</p>
					{/* {item.aboutMe ? (<p className="mb-0">{`${item.aboutMe.substring(0, 70)} `}<a href="/instructor/">....</a></p>):(
						<p></p>
					)} */}
					
				</div>
			</Card.Body>
			<Card.Footer className="bg-white p-0">
				<div className="d-flex justify-content-between ">
					<div className="w-50 py-3 px-4 ">
						<h6 className="mb-0 text-muted">Koorsooyin: {item.enrolledCourses.length}</h6>
					</div>
					<div className="border-start w-50 py-3 px-4">
						<h6 className="mb-0 text-muted">events: {item.persenter.length}</h6>
						
					</div>
				</div>
			</Card.Footer>
		</Card>
	
	);
};

export default ProjectCard;
