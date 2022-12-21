// import node module libraries
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, ProgressBar, Dropdown, Image } from 'react-bootstrap';

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
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={END_POINT + item.profileImage}
				className="bg-cover img-fluid rounded-top img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3"
				style={{
					height: '50%',
					objectFit: 'cover'
				}}
			/>
			{/* <Link
				to={`/courses/${item.id}`}
				className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3"
				style={{
					background: `url(${END_POINT}${item.profileImage})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'top center'
				}}
			>

				<Image
					src={`${END_POINT}${item.profileImage}`}
					alt="..."
					className="img-fluid d-lg-none invisible"
				/>
			</Link> */}
			<div className="d-flex position-absolute end-0 pe-3 pt-3">
				<ActionMenu />
			</div>


			<Card.Body>
				<div>
					<h3 className="mb-0">
						<Link to="#" className="fw-bold text-inherit">
							{item.fullName}
						</Link>
					</h3>
					<span className="text-muted fs-6">{item.userTitle}</span>
				</div>

				<div className="mt-2 mb-3">
					{item.aboutMe ? (<p className="mb-0">{`${item.aboutMe.substring(0, 70)} `}<a href="/instructor/">....</a></p>):(
						<p></p>
					)}
					
				</div>
				{/* progress */}
				<div className="d-flex justify-content-between align-items-center mb-5">
					<div className="d-flex align-items-center">
						{/* avatar group */}
						{/* <AvatarGroup>
							{ProjectTeamMembersData.filter(function (dataSource) {
								return (
									dataSource.id === item.team[0] ||
									dataSource.id === item.team[1] ||
									dataSource.id === item.team[2]
								);
							}).map((member, index) => {
								return (
									<Avatar
										size="md"
										src={member.image}
										type={`${member.image == null ? 'initial' : 'image'}`}
										name={member.name}
										className="rounded-circle"
										imgtooltip
										key={index}
									/>
								);
							})}
							<Avatar
								size="md"
								type="initial"
								name={item.team.length - 3 + '+'}
								variant="light"
								className="rounded-circle text-dark"
								showExact
							/>
						</AvatarGroup> */}
					</div>
					{/* text */}
					{/* <div>
						<span
							className={`badge bg-light-${getStatusColor(
								item.status
							)} text-dark-${getStatusColor(item.status)}`}
						>
							{item.status}
						</span>
					</div> */}
				</div>
				<div>
					{/* progress bar */}
					{/* <ProgressBar className="progress-tooltip" style={{ height: '6px' }}>
						<ProgressBar
							now={item.progress}
							style={{ width: item.progress + '%' }}
							variant={getStatusColor(item.status)}
						/>
						<div className="progress-bar">
							<span>{item.progress}%</span>
						</div>
					</ProgressBar> */}
				</div>
			</Card.Body>

			{/* card footer */}
			<Card.Footer className="bg-white p-0">
				<div className="d-flex justify-content-between ">
					<div className="w-50 py-3 px-4 ">
						<h6 className="mb-0 text-muted">COURSES:</h6>
						<p className="text-dark fs-6 fw-semi-bold mb-0">{item.duedate}</p>
					</div>
					<div className="border-start w-50 py-3 px-4">
						<h6 className="mb-0 text-muted">EVENTS:</h6>
						<p className="text-dark fs-6 fw-semi-bold mb-0">
							{/* ${numberWithCommas(item.budget)} */}
						</p>
					</div>
				</div>
			</Card.Footer>
		</Card>
	);
};

export default ProjectCard;
