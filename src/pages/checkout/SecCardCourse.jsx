import React, { useState } from "react";
import { Card, ListGroup, Image, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function SecCardCourse({ item }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <Card style={{ width: "18rem", margin: "10px 50px" }}>
      <Card.Img
        style={{ transform: `${hover ? "scale(1.1)" : ""}` }}
        variant="top"
        className="rounded-md img-responsive position-relative"
        src="https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div
        style={{ top: "14px", left: "15%" }}
        className="d-flex justify-content-between align-items-center gap-4 position-absolute "
      >
        <Badge pill className="px-3 py-1 fs-5" bg="primary">
          Primary
        </Badge>
        <Badge pill className="px-3 py-1 fs-5" bg="info">
          Primary
        </Badge>
      </div>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className="d-flex gap-2 justify-content-between align-items-center">
          <div>hello</div>
          <div>hel</div>
          <div>he</div>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2 ">
            <Image
              style={{ objectFit: "cover" }}
              className="w-15 rounded-circle"
              src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <h6 className="fs-6 mb-0 ">Mohamed nadaara</h6>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h6 className="mb-0">$50</h6>
            <h6 className="mb-0">$100</h6>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default SecCardCourse;
