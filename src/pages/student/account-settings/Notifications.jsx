// import node module libraries
import { withRouter } from 'react-router-dom';
import {
	Col,
	Row,
	Card,
	ListGroup,
	OverlayTrigger,
	Tooltip,
	CloseButton,
	Image
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import custom components
import { ThumbsUp, Award, MessageSquare } from 'react-feather';

// import profile layout wrapper
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext,useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import DotBadge from 'components/elements/bootstrap/DotBadge';
import NotificationData from 'data/NotificationData';
import { Fragment } from 'react';

const Notifications = (props) => {
	const { theUser, setTheUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);
	function NotificationsIcon(icon, color) {
		if (icon === 'ThumbsUp') {
			return <ThumbsUp className={`text-${color} me-1`} size="12px" />;
		}
		if (icon === 'Award') {
			return <Award className={`text-${color} me-1`} size="12px" />;
		}
		if (icon === 'MessageSquare') {
			return <MessageSquare className={`text-${color} me-1`} size="12px" />;
		}
	}
	function MarkAsRead(removable) {
		if (removable) {
			return (
				<Fragment>
					<OverlayTrigger
						placement="top"
						overlay={<Tooltip id="tooltip-top">Mark as read</Tooltip>}
					>
						<Link to="#">
							<DotBadge bg="info"></DotBadge>
						</Link>
					</OverlayTrigger>

					<OverlayTrigger
						placement="top"
						overlay={<Tooltip id="tooltip-top">Remove</Tooltip>}
					>
						<CloseButton className="btn-close fs-6 d-block me-1" />
					</OverlayTrigger>
				</Fragment>
			);
		} else {
			return (
				<OverlayTrigger
					placement="top"
					overlay={<Tooltip id="tooltip-top">Mark as unread</Tooltip>}
				>
					<Link to="#">
						<DotBadge bg="secondary"></DotBadge>
					</Link>
				</OverlayTrigger>
			);
		}
	}
	return (
		<ProfileLayout>
			{account === 'instructor'}
			<Card className="border-0">
				<Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Profile Details</h3>
						<p className="mb-0">
							You have full control to manage your own account setting.
						</p>
					</div>
				</Card.Header>
					
					<Card.Body className="rounded-3 p-0">
							<ListGroup>
								{NotificationData.map((item, index) => {
									return (
										<ListGroup.Item className="py-4" key={index}>
											<Row className="align-items-center">
												<Col>
													<div className="d-flex align-items-center">
														<Link to="#">
															<Image
																src={item.image}
																alt=""
																className="avatar-lg rounded-circle"
															/>
														</Link>
														<div className="ms-3">
															<Link to="#">
																<p className="mb-0 text-body">
																	<span className="fw-bold mb-0 h5">
																		{item.name}:
																	</span>{' '}
																	{item.notification}
																</p>
															</Link>
															<span className="fs-6 text-muted">
																<span>
																	{NotificationsIcon(
																		item.icon,
																		item.colorClass
																	)}
																	{item.date},
																</span>
																<span className="ms-1">{item.time}</span>
															</span>
														</div>
													</div>
												</Col>
												<Col className="col-auto text-center p-2">
													{MarkAsRead(item.removable)}
												</Col>
											</Row>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Card.Body>
					
			</Card>
		</ProfileLayout>
	);
};

export default withRouter(Notifications);
