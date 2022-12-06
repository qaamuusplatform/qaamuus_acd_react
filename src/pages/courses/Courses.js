// import node module libraries
import { Col, Row, Container, Tab } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";

// import custom components
import FormSelect from 'components/elements/custom/FormSelect';
import PageHeading from "components/elements/common/heading/PageHeading";
import GridListViewButton from "components/elements/custom/GridListViewButton";
import { getAllCourses } from "services/coursesService";
import CourseCard from "components/cards/CourseCard";
import { ShimmerPostItem } from "react-shimmer-effects";

export default function Courses() {
  const [courseError, setCourseError] = useState(null);
  const [coursesList, setcoursesList] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const { data, status, statusText } = await getAllCourses();
        if (status) {
          setcoursesList(data);
        } else {
          setCourseError(statusText);
        }
      } catch (error) {
        console.log(error);
        setCourseError(error);
      }
    };
    load();
  }, []);

  return (
    <Fragment>
      <PageHeading pagetitle="Filter Page" />
      <div className="py-6">
        <Container>
          {courseError ? <span>{JSON.stringify(courseError)}</span> : null}
          <Tab.Container defaultActiveKey="grid">
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-4">
                <Row className="d-lg-flex justify-content-between align-items-center">
                  <Col md={6} lg={8} xl={9}>
                    <h4 className="mb-3 mb-lg-0">
                      Displaying {coursesList.length} out of {coursesList.length} courses
                    </h4>
                  </Col>
                  <Col md={6} lg={4} xl={3} className="d-inline-flex">
                    <div className="me-2">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                    <FormSelect options={[]} placeholder="Sort by" />
                  </Col>
                </Row>
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
                {/* <FilterOptions /> */}
              </Col>
              {/* Tab content */}
              {/* <Col xl={9} lg={9} md={8} sm={12}> */}
              <Col  sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    {/* <CourseGridView /> */}
<Row>
{coursesList.length == 0? [1,2,3].map((idx)=><Col lg={4} md={6} sm={12} key={idx}>
<ShimmerPostItem card title text cta />
                      </Col>) :null}
                    {coursesList.map((course, idx) => (
                      <Col lg={4} md={6} sm={12} key={idx}>
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
                    {coursesList.map((course, idx) => (
                      <CourseCard
                        item={course}
                        showprogressbar={true}
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
