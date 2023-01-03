import LevelIcon from "pages/student/miscellaneous/LevelIcon";
import React, { useState } from "react";
import { Card, ListGroup, Image, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function NCourseCard({ item }) {

  return (
    <Card className="card-hover mb-4" >
      <Link to={`/course/${item.slug}`}>
        <Card.Img
          variant="top"
          className="rounded-md img-responsive position-relative course-grid-cover-image-new"
          src={item.coverImage}

        />
      </Link>
      <div
        style={{ top: "14px" }}
        className="d-flex justify-content-between align-items-center gap-4 position-absolute "
      >
        <Badge badge className="px-3 py-1 rounded mx-1 fs-5" bg="warning">
          {item.category.categoryName}
        </Badge>

      </div>
      
      <Link to={`/course/${item.slug}`}>
      <Card.Body>
        <Card.Title style={{ fontSize: '18px', fontWeight: '600' }}>{item.title}</Card.Title>

        <div className="d-flex gap-2 justify-content-between align-items-center">
          <div>
            <i className="far fa-clock me-1"></i>
            12 cashir
          </div>
          <div>
            <i className="far fa-clock me-1"></i>
            12 cashir
          </div>
          <div>
            <LevelIcon level={2} />
            dsa
          </div>
        </div>
      </Card.Body>
      </Link>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 ">
            <Image
              style={{ objectFit: "cover" }}
              className="rounded-circle avatar-sm"
              src={item.instructor.profileImage}
            />
            <h6 className="fs-5 mb-0 fw-normal ">{item.instructor.fullName}</h6>
          </div>
          <div className="d-flex align-items-center gap-1">
            <h6 style={{ textDecoration: 'line-through' }} className="mb-0 pt-1 text-muted">$50</h6>
            <h5 className="mb-0 fw-bold">$100</h5>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default NCourseCard;
