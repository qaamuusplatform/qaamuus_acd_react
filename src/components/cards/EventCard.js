// import node module libraries
import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import baseUrl from "../../config.json";
import { END_POINT } from "helper/constants";
import moment from "moment";

const EventCard = ({ event }) => {
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
      <Link to={`/event/${event.slug}`}>
        <Card.Img
          variant="top"
          src={END_POINT + event.coverImage}
          className="rounded-top-md img-fluid"
        />
      </Link>
      {/* Card body  */}
      <Card.Body>
        <div className="d-flex justify-content-between p-2 align-items-center mb-2 opacity-75  border border-primary rounded">
          <p className="mb-0 fw-bold">
            {moment(event.dateTimeStarting).format("MMMM Do YYYY")}
          </p>
          <p className="mb-0 fw-bold">
            {moment(event.dateTimeStarting).format("h:mm:ss a")}
          </p>
        </div>
        <h3>
          <Link to={`/event/${event.slug}`} className="text-inherit">
            {event.title}
          </Link>
        </h3>
        <p> {event.simDesc} </p>
        {/*  Media content  */}
        <Row className="align-items-center g-0 mt-4">
          <Col className="col-auto">
            <Image
              src={END_POINT + event.persenter.profileImage}
              alt=""
              className="rounded-circle avatar-sm me-2"
            />
          </Col>
          <Col className="col lh-1">
            <h5 className="mb-1">{event.persenter.fullName}</h5>
            <p className="fs-6 mb-0">{event.persenter.userTitle}</p>
          </Col>
          {/* <Col className="col-auto">
            <p className="fs-6 mb-0">
              {moment(event.dateTimeStarting).format("MMMM Do YYYY")}{" "}
            </p>
          </Col> */}
        </Row>
      </Card.Body>
    </Card>
  );
};

// Typechecking With PropTypes
EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
