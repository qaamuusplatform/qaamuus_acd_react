// import node module libraries
import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import {
  Col,
  Row,
  Card,
  Breadcrumb,
  ListGroup,
  Form,
  Dropdown,
  Button,
  Nav,
} from "react-bootstrap";

// import sub custom components
import MailSidebar from "components/mail-app/MailSidebar";
// import { MailContext } from 'components/mail-app/Context';

// import context file

// import hook file
import MailRow from "components/mail-app/mail/MailRow";
import useMultipleSelection from "components/hooks/useMultipleSelection";

const ToggleActions = React.forwardRef(({ children, onClick }, ref) => (
  <Link
    to="#"
    ref={ref}
    className="btn btn-outline-white btn-sm fs-5"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Link>
));

const ToggleFilter = React.forwardRef(({ children, onClick }, ref) => (
  <Link
    to="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Link>
));

const LessonDiscussion = () => {
  // const { mailContextValue: { mails, filters, activeFilter } } = useContext(MailContext);

  // pagination
  return (
    <Fragment>
      <Row>
        <Col xl={12} lg={12} md={12} xs={12}>
          <Card>
            <Row className="g-0">
              <Col xxl={12} xl={12} xs={12}>
                <Card.Header className="p-4">
                  <div className=" d-md-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap gap-2 mb-2 mb-md-0">
                          <Link
                            to="#home"
                            className="btn btn-primary"
                            onClick={() => setModalShow(true)}
                          >
                            Compose New Email
                          </Link>
                        
                      <div className="d-flex align-items-center border px-3 py-2 rounded-2">
                        
                        <Form.Check type="checkbox" id="checkAllMails" />
                        <Dropdown>
                          <Dropdown.Toggle
                            as={ToggleFilter}
                            id="dropdown-custom-components"
                          >
                            <div className="dropdown-toggle text-inherit ms-2">
                              {/* {currentFilter === 'None' ? '' : currentFilter} */}
                            </div>
                          </Dropdown.Toggle>
                          {/* <Dropdown.Menu as="ul">
														{filters.map((item, index) => {
															return (
																<Dropdown.Item
																	eventKey={index}
																	as="li"
																	bsPrefix=" "
																	key={index}
																	onClick={() => handleFilter(item)}
																>
																	<Link
																		to="#"
																		className={`dropdown-item ${
																			currentFilter === item ? 'active' : ' '
																		}`}
																	>
																		{item}
																	</Link>
																</Dropdown.Item>
															);
														})}
													</Dropdown.Menu> */}
                        </Dropdown>
                      </div>
                      {/* <Button
												variant="outline-white"
												size="sm"
												onClick={() => handleFilter()}
											>
												<i className="fe fe-rotate-cw align-middle "></i>
											</Button> */}
                      <Dropdown>
                        <Dropdown.Toggle
                          as={ToggleActions}
                          id="dropdown-custom-components"
                        >
                          <i className="fe fe-more-vertical align-middle"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as="ul">
                          {[
                            "Action",
                            "Another action",
                            "Something else here",
                          ].map((item, index) => {
                            return (
                              <Dropdown.Item
                                eventKey="1"
                                as="li"
                                bsPrefix=" "
                                key={index}
                              >
                                <Link to="#" className="dropdown-item">
                                  {item}
                                </Link>
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="">
                      <Form.Control
                        type="search"
                        size="sm"
                        placeholder="Search Email"
                      />
                    </div>
                  </div>
                </Card.Header>
                <div className="">
                  {/* <ListGroup
										variant="flush"
										className="list-group list-group-mail"
									>
										{displayMails.length > 0 ? (
											displayMails
										) : (
											<ListGroup.Item className="list-group-item-action px-4 list-mail bg-light">
												No matching mails found.
											</ListGroup.Item>
										)}
									</ListGroup> */}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default LessonDiscussion;
