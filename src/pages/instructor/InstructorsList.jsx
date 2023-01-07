// import node module libraries
import { Col, Row, Container, Form, Button, Nav, Breadcrumb, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";

// import custom components
// import FormSelect from 'components/elements/custom/FormSelect';
import useSWR from "swr";
import { toast } from "react-toastify";
import { httpFetcher } from "services/coursesService";
import ProjectsGridData from "data/ProjectsGridData";
import ProjectCard from "./ProjectCard";
import { ShimmerPostItem } from "react-shimmer-effects";
import PageHeadingBriefinfo from "components/elements/common/heading/PageHeadingBriefinfo";
export default function Members() {
  const { data: instructorsList, error } = useSWR("api/userProfile-list/", httpFetcher);
  const [ProjectsList, setProjectsList] = useState(
    ProjectsGridData.slice(0, 500)
  );
  if (error) {
    toast.error(error);
  }
  const [pageNumber, setPageNumber] = useState(0);
  const projectsPerPage = 400;
  const pagesVisited = pageNumber * projectsPerPage;
  const displayProjects = ProjectsList.slice(
    pagesVisited,
    pagesVisited + projectsPerPage
  ).map((item, index) => {
    return (
      <Col xxl={3} xl={4} lg={6} xs={12} className="mb-4" key={index}>
        <ProjectCard item={item} />
      </Col>
    );
  });
  return (
    <Fragment>
      <PageHeadingBriefinfo
				pagetitle="Macalimiinta Qaamuus"
				briefinfo="Khubaro Takhusus takhusas kasta leh."
			/>
      <div className="pt-5 pb-9 bg-white ">
        <Container>
        
          <Row>
            {!instructorsList && !error
              ? [1, 2, 3, 4].map((idx) => (
                <Col lg={4} xl={4} md={6} sm={12} key={idx}>
                  <ShimmerPostItem card title cta />
                </Col>
              ))
              : (
                instructorsList.filter((theUser) => theUser.userType.id === 2).map((item, index) => {
                  return <Col xl={3} lg={3} md={3} sm={6} xs={12} className="mb-4" key={index}>
                    <ProjectCard item={item} />
                  </Col>
                })
              )}
          

          </Row>
        </Container>
      </div>

    </Fragment>
  );
}
