// import node module libraries
import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
	Accordion,
	useAccordionButton,
	AccordionContext,
	ListGroup
} from 'react-bootstrap';

import Icon from '@mdi/react';
import { mdiPlay } from '@mdi/js';

const CourseContent = ({ lessons : accordionItems, itemClass,onClickLesson,currentLesson:{link:currentLesson} }) => {
	const ContextAwareToggle = ({ children, eventKey, callback }) => {
		const { activeEventKey } = useContext(AccordionContext);

		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);

		const isCurrentEventKey = activeEventKey === eventKey;

		return (
			<Fragment>
				<Link
					to="#"
					onClick={decoratedOnClick}
					aria-expanded={isCurrentEventKey}
					className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
					data-bs-toggle="collapse"
					aria-controls="courseTwo"
				>
					<div className="me-auto text-capitalize">{children.compoName}</div>
					<span className="chevron-arrow ms-4">
						<i className="fe fe-chevron-down fs-4"></i>
					</span>
				</Link>
			<p className='mb-0 text-muted fs-6 mt-1 fw-normal'>{children.lessonsCount} Video</p>
			</Fragment>
		);
	};

	return (
		<Fragment>
			<Accordion defaultActiveKey={accordionItems[0].id}>
				<ListGroup as="ul" variant="flush">
					{accordionItems.map((item, index) => {
						return (
								<ListGroup.Item
									key={index}
									as="li"
									className={`${itemClass ? itemClass : ''}`}
								>
									<ContextAwareToggle eventKey={item.id}>
										{item}
									</ContextAwareToggle>
									<Accordion.Collapse eventKey={item.id} className="test">
										<ListGroup className="py-4" as="ul">
											{item.theCompoLessons.map((subitem, subindex) => (
												<ListGroup.Item
													key={subindex}
													as="li"
													// disabled={true}
													onClick={()=>onClickLesson({lesson:subitem.title, link:subitem.lessonLink})}
													className={"px-0 py-1 border-0 cursor-pointer"}
												>
													<div
													className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none text-capitalize ` + (currentLesson == subitem.lessonLink?'text-success':'')}
													>
														<div className="text-truncate ">
															<span
																className={`icon-shape 
																icon-sm
																rounded-2 me-2 `+(currentLesson == subitem.lessonLink?' bg-success text-white':'bg-light text-muted')}
															>
																
																	<i className="fe fe-youtube fs-5"></i>

															</span>
															<span className="fs-5 text-wrap">{subitem.title}</span>
														</div>
														<div className="text-truncate ms-2">
															<span className={currentLesson == subitem.lessonLink?'text-success fw-bold':'text-primary fw-bold'}>{subitem.duration}</span>
														</div>
													</div>
												</ListGroup.Item>
											))}
										</ListGroup>
									</Accordion.Collapse>
								</ListGroup.Item>
							);
											})}
					
					
				</ListGroup>
			</Accordion>
		</Fragment>
	);
};

export default CourseContent;
