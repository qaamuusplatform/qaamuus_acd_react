// import node module libraries
import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
	Accordion,
	useAccordionButton,
	AccordionContext,
	ListGroup,
	ProgressBar
} from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';

const GKAccordionProgress = ({ lessons : accordionItems, itemClass,onClickLesson,currentLesson:{link:currentLesson} }) => {
	const ContextAwareToggle = ({ children, eventKey, callback }) => {
		const currentEventKey = useContext(AccordionContext);
		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);
		const isCurrentEventKey = currentEventKey === eventKey;
		return (
			<Fragment>
				<Link
					to="#"
					onClick={decoratedOnClick}
					aria-expanded={isCurrentEventKey}
					className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
					data-bs-toggle="collapse"
					role="button"
					aria-controls="courseTwo"
				>
					<div className={`me-auto ${isCurrentEventKey ? 'text-primary' : ''}`}>
						{children.compoName}
						<p className="mb-0 text-muted fs-6 mt-1 fw-normal">
							{children.lessonsCount} videos ({children.totalHours})
						</p>
					</div>
					<span className="chevron-arrow ms-4">
						<i className="fe fe-chevron-down fs-4"></i>
					</span>
				</Link>
			</Fragment>
		);
	};

	return (
		<Accordion defaultActiveKey={currentLesson} className="card">
			<ListGroup as="ul" variant="flush">
				{accordionItems.map((item, index) => {
					if (item.theCompoLessons.length === 0) {
						return (
							<ListGroup.Item key={index} as="li" className="p-0">
								<ContextAwareToggle eventKey={item.id}>
									{item}
								</ContextAwareToggle>
								<Accordion.Collapse eventKey={item.id}>
									<ListGroup variant="flush">
										<ListGroup.Item className="fs-5  rounded-3">
											{item.summary}
										</ListGroup.Item>
									</ListGroup>
								</Accordion.Collapse>
							</ListGroup.Item>
						);
					} else {
						return (
							<ListGroup.Item key={index} as="li" className="p-0">
								<ContextAwareToggle eventKey={item.id}>
									{item}
								</ContextAwareToggle>
								<Accordion.Collapse eventKey={item.id}>
									<ListGroup variant="flush">
										{/* pinner */}
										{/* <ListGroup.Item className="border-top-0">
											<ProgressBar
												variant="success"
												className="mb-2 progress"
												now={item.completed}
												style={{ height: '6px' }}
											/>
											<small>{item.completed ?? 0}% Completed</small>
										</ListGroup.Item> */}
										{item.theCompoLessons.map((subitem, index) => (
											<ListGroup.Item
												key={index}
												active={currentLesson == subitem.lessonLink}
												// disabled={true}
												onClick={()=>onClickLesson({lesson:subitem.title, link:subitem.lessonLink})}
												className='cursor-pointer'
											>
												
													<div className="text-truncate ">
														<span
															className={`icon-shape bg-${
																currentLesson != subitem.lessonLink 
																	? 'light' : 'success'
															} text-${
																currentLesson == subitem.lessonLink
																	? 'white'
																	: 'muted'
															} icon-sm rounded-circle me-2`}
														>
															{subitem.locked ? (
																<i className="fe fe-lock fs-4"></i>
															) : (
																<Icon path={mdiPlay} size={0.8} />
															)}{' '}
														</span>
														<span className="fs-5">{subitem.title}</span>
													</div>
													{/* <div className="text-truncate fs-5">
														<span>{subitem.duration}</span>
													</div> */}
												
											</ListGroup.Item>
										))}
									</ListGroup>
								</Accordion.Collapse>
							</ListGroup.Item>
						);
					}
				})}
			</ListGroup>
		</Accordion>
	);
};

export default GKAccordionProgress;
