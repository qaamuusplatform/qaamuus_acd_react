// import node module libraries
import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import baseUrl from "../../config.json";
import moment from "moment/moment";

const BlogCard = ({ event }) => {
  const CategoryColors = (category) => {
    switch (category) {
      case "Courses":
        return "success";
      case "Tutorial":
        return "primary";
      case "Workshop":
        return "warning";
      case "Company":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <Card className="mb-4 shadow-lg">
      <Link to={`/events/${event.id}`}>
        <Card.Img
          variant="top"
          src={baseUrl.baseUrl + event.coverImage}
          className="rounded-top-md img-fluid"
        />
      </Link>
      {/* Card body  */}
      <Card.Body>
        <Link
          to={`events/${event.id}`}
          className={`fs-5 fw-semi-bold d-block mb-3 text-${CategoryColors(
            event.eventType
          )}`}
        >
          {event.eventType}
        </Link>
        <h3>
          <Link to={`/events/${event.id}`} className="text-inherit">
            {event.title}
          </Link>
        </h3>
        <p> {event.simDesc} </p>
        {/*  Media content  */}
        <Row className="align-items-center g-0 mt-4">
          <Col className="col-auto">
            <Image
              src={baseUrl.baseUrl + event.persenter.profileImage}
              alt=""
              className="rounded-circle avatar-sm me-2"
            />
          </Col>
          <Col className="col lh-1">
            <h5 className="mb-1">{event.persenter.fullName}</h5>
            <p className="fs-6 mb-0">{event.persenter.email}</p>
          </Col>
          <Col className="col-auto">
            <p className="fs-6 mb-0">
              {moment(event.dateTimeStarting).format("MMMM Do YYYY")}{" "}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Typechecking With PropTypes
BlogCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default BlogCard;
