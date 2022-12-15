// import node module libraries
import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import baseUrl from "../../config.json";
import { END_POINT } from "helper/constants";

import moment from "moment/moment";

const EventCardFullWidth = ({ event }) => {
  const CategoryColors = (category) => {
    switch (category) {
      case "Courses":
        return "success";
      case "Tutorial":
        return "warning";
      case "Workshop":
        return "primary";
      case "Company":
        return "info";
      default:
        return "primary";
    }
  };

  // console.log(baseUrl);

  return (
    <Card className="mb-4 shadow-lg">
      <Row className="g-0">
        {/*  Image */}
        <Link
          to={`/events/${event.slug}`}
          className="col-lg-8 col-md-12 col-12 bg-cover img-left-rounded"
          style={{
            background: `url(${END_POINT + event.coverImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <Card.Img
            variant="left"
            src={END_POINT + event.image}
            className="img-fluid d-lg-none invisible"
          />
        </Link>
        <Col lg={4} md={12} sm={12}>
          {/*  Card body */}
          <Card.Body>
            <Link
              to={`/events/${event.slug}`}
              className={`fs-5 mb-3 fw-semi-bold d-block text-${CategoryColors(
                event.eventType
              )}`}
            >
              {event.eventType}
            </Link>
            <h1 className="mb-2 mb-lg-4">
              <Link to={`/events/${event.slug}`} className="text-inherit">
                {event.title}
              </Link>
            </h1>
            <p> {event.simDesc} </p>
            {/*  Media content */}
            <Row className="align-items-center g-0 mt-lg-7 mt-4">
              <Col className="col-auto">
                {/*  Img  */}
                <Image
                  src={END_POINT + event.persenter.profileImage}
                  alt=""
                  className="rounded-circle avatar-sm me-2"
                />
              </Col>
              <Col className="col lh-1 ">
                <h5 className="mb-1">{event.persenter.fullName}</h5>
                <p className="fs-6 mb-0">{event.persenter.email}</p>
              </Col>
              <Col className="col-auto">
                <p className="fs-6 mb-0">
                  {moment(event.dateTimeStarting).format("MMMM Do YYYY")}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

// Typechecking With PropTypes
EventCardFullWidth.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCardFullWidth;
