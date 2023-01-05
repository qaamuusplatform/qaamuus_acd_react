import Ratings from "components/elements/common/ratings/Ratings";
import LevelIcon from "pages/student/miscellaneous/LevelIcon";
import React, { useState } from "react";
import { Card, ListGroup, Image, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function NCourseCard({ item }) {
console.log(item.theReviews.length)
  return (
    <Card className="card-hover mb-4" >
      <Link to={`/course/${item.slug}`}>
        <Card.Img
          variant="top"
          className="rounded-md img-responsive position-relative course-grid-cover-image-new"
          src={item.coverImage}

        />
      </Link>
      {/* <div
        style={{ top: "14px" }}
        className="d-flex justify-content-between align-items-center gap-4 position-absolute "
      >
        

      </div> */}
      
      <Card.Body>
      <Badge badge className="px-2 py-1 rounded mx-0 mb-2 mt-0 fs-5" bg="warning">
          {item.category.categoryName}
        </Badge>
      <Link to={`/course/${item.slug}`}>
        <Card.Title style={{ fontSize: '18px', fontWeight: '600' }}>{item.title}</Card.Title>

        </Link>
        <ListGroup as="ul" bsPrefix="list-inline" className="mb-2">
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<i className="far fa-clock me-1"></i>
									{item.houres}
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<LevelIcon level={item.level} />
									{item.level}
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix="list-inline-item">
									<span className="text-warning">
										{' '}
										<Ratings rating={4.5} /> {4.5}
									</span>
									<span className="fs-6 text-muted">
										{' '}
									</span>
								</ListGroup.Item>
							</ListGroup>
        {/* <div className="d-flex gap-2 justify-content-between align-items-center">
          <div>
            <i className="far fa-clock me-1"></i>
            12 cashir
          </div>
          <div>
            <i className="far fa-user me-1"></i>
            12 cashir
          </div>
          <div>
            <LevelIcon level={2} />
            dsa
          </div>
        </div> */}
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 ">
            <Image
              style={{ objectFit: "cover" }}
              className="rounded-circle avatar-sm"
              src={
                item.instructor.profileImage
                  ?  item.instructor?.profileImage
                  : `https://ui-avatars.com/api/?name=${item.instructor.fullName}&background=19a9c4&color=fff`
                }
            />
            <h6 className="fs-5 mb-0 fw-normal ">{item.instructor.fullName}</h6>
          </div>
          <div className="d-flex align-items-center gap-1">
          {item.showDiscountPrice ? (
            
            <h6 style={{ textDecoration: 'line-through' }} className="mb-0 pt-1 text-muted">${item.regularPrice}</h6>
					
					) : (
						<div>
							
						</div>
					)}
            <h5 className="mb-0 fw-bold">$100</h5>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default NCourseCard;
