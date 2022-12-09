// import node module libraries
import { Col, Row, Container, Form, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";

// import custom components
// import FormSelect from 'components/elements/custom/FormSelect';
import BlogCard from "components/cards/BlogCard";
import BlogArticlesList from "data/blogArticlesData";
import BlogCardFullWidth from "components/cards/HeroEventCard";
import { ShimmerPostItem } from "react-shimmer-effects";
import { getEvents } from "services/evantService";
import useSWR from "swr";
import { toast } from "react-toastify";
export default function Events() {
  const { data: events, error } = useSWR("api/qaEvent-list/", getEvents);

  if (error) {
    toast.error(error);
  }

  return (
    <Fragment>
      {/* Page header */}
      <div className="pt-9 pb-9 bg-white ">
        <Container>
          <Row>
            <Col
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 8, offset: 2 }}
              md={12}
              sm={12}
            >
              <div className="text-center mb-5">
                <h1 className=" display-2 fw-bold">Qaamuus Events</h1>
                <p className="lead">
                  Our features, journey, tips and us being us. Lorem ipsum dolor
                  sit amet, accumsan in, tempor dictum neque.
                </p>
              </div>
              {/* Form */}
              {/* <Form className="row px-md-20">
								<Form.Group
									className="mb-3 col ps-0 ms-2 ms-md-0"
									controlId="formBasicEmail"
								>
									<Form.Control type="email" placeholder="Email Address" />
								</Form.Group>
								<Form.Group
									className="mb-3 col-auto ps-0"
									controlId="formSubmitButton"
								>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form.Group>
							</Form> */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content */}
      <div className="pb-8 bg-white">
        {/* <Container>
					<Row>
						<Col xl={12} lg={12} md={12} sm={12}>
							<div className="flush-nav">
								<Nav>
									<Link
										to="/marketing/blog/listing/"
										className="ps-0 nav-link active"
									>
										All
									</Link>
									<Link to="/marketing/blog/category/" className="nav-link">
										Courses
									</Link>
									<Link to="/marketing/blog/category/" className="nav-link">
										Workshop
									</Link>
									<Link to="/marketing/blog/category/" className="nav-link">
										Tutorial
									</Link>
									<Link to="/marketing/blog/category/" className="nav-link">
										Company
									</Link>
								</Nav>
							</div>
						</Col>
					</Row>
				</Container> */}

        <Container>
          <Row>
            {!events && !error
              ? [1].map((indx) => {
                  <Col xl={12} lg={12} md={12} sm={12} key={indx}>
                    <ShimmerPostItem card title text cta />
                  </Col>;
                })
              : null}
            {/* Show first article in full width */}
            {events
              ?.filter((event) => event.heroEvent === true)
              .map((event, index) => (
                <Col xl={12} lg={12} md={12} sm={12} key={index}>
                  <BlogCardFullWidth event={event} />
                </Col>
              ))}

            {/* Show remaining articles in 3 column width  */}

            {!events && !error
              ? [1, 2, 3, 4].map((indx) => {
                  <Col xl={4} lg={4} md={6} sm={12} key={indx}>
                    <ShimmerPostItem card title text cta />
                  </Col>;
                })
              : null}

            {events
              ?.filter((event) => event.heroEvent === false)
              .map((event, index) => (
                <Col
                  xl={4}
                  lg={4}
                  md={6}
                  sm={12}
                  key={index}
                  className="d-flex"
                >
                  <BlogCard event={event} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}
