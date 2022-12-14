// import node module libraries
import { Col, Row, Container, Tab } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";

// import custom components
import FormSelect from "components/elements/custom/FormSelect";
import PageHeading from "components/elements/common/heading/PageHeading";
import GridListViewButton from "components/elements/custom/GridListViewButton";
import { getAllCourses } from "services/coursesService";
import CourseCard from "components/cards/CourseCard";
import { ShimmerPostItem } from "react-shimmer-effects";
import useSWR from "swr";

import { toast } from "react-toastify";

export default function Courses() {
  const { data: coursesList, error } = useSWR(
    `api/qaCourse-list/`,
    getAllCourses
  );

  if (error) {
    toast.error(error);
  }

  return (
    <Fragment>
      <PageHeading pagetitle="Filter Page" />
      <div className="py-6">
        <Container>
          {error ? <span>{JSON.stringify(error)}</span> : null}
          <Tab.Container defaultActiveKey="grid">
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-4">
                <Row className="d-lg-flex justify-content-between align-items-center">
                  <Col md={6} lg={8} xl={9}>
                    <h4 className="mb-3 mb-lg-0">
                      Displaying {coursesList?.length} out of{" "}
                      {coursesList?.length} courses
                    </h4>
                  </Col>
                  <Col md={6} lg={4} xl={3} className="d-inline-flex">
                    <div className="me-2">
                      {/* <GridListViewButton keyGrid="grid" keyList="list" /> */}
                    </div>
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    {/* <FormSelect options={[]} placeholder="Sort by" /> */}
                  </Col>
                </Row>
              </Col>
              {/* <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
                <FilterOptions />
              </Col> */}
              {/* Tab content */}
							<Col xl={12} lg={12} md={12} sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    {/* <CourseGridView /> */}
                    <Row>
                      {!coursesList && !error
                        ? [1, 2, 3, 4].map((idx) => (
                          <Col lg={4} xl={3} md={6} sm={12} key={idx}>
                            <ShimmerPostItem card title text cta />
                          </Col>
                        ))
                        : null}
                      {coursesList?.map((course, idx) => (
                        <Col lg={4} xl={3} md={6} sm={12} key={idx}>
                          <CourseCard
                            item={course}
                            showprogressbar={true}
                            viewby="grid"
                          />
                        </Col>
                      ))}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    {/* <CourseListView /> */}
                    {coursesList?.map((course, idx) => (
                      <CourseCard
                        item={course}
                        showprogressbar
                        viewby="list"
                        key={idx}
                      />
                    ))}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </Fragment>
  );
}
