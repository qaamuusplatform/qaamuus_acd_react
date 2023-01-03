// import node module libraries

import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Image, ProgressBar, Form, Button, Spinner, Modal } from "react-bootstrap";
import Ratings from "../../components/elements/common/ratings/Ratings";
import { Reviews } from "../../data/CourseIndexData";
import { Rating } from "react-simple-star-rating";

// import custom components

// import data files

const EventReviewsTab = ({ reviews }) => {
  const [registringReviewModal, setRegistringReviewModal] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [rating, setRating] = useState(0)

  const handleRating = ( number) => {
    setRating(number)
    console.log(number)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('dsadas')
    setRegistringReviewModal(true)
  }
  return (
    <Fragment>
       <Form onSubmit={handleSubmit} controlId="validationFormik01" >
        <Modal show={modalShow} data-backdrop="static" backdrop="static" onHide={() => setModalShow(false)}  centered>
          <Modal.Header closeButton  className="pt-4 pb-2">
            <Modal.Title>Faahfaahinta Falcelinta</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Col lg={12} md={12} sm={12} className="mb-1 mt-0">
              
              <Form.Group>
                <Form.Label htmlFor="email">Heerka Qiyaasta</Form.Label><br></br>
                <Rating onClick={handleRating} initialValue={rating} />
               
              </Form.Group>

            </Col>



          </Modal.Body>

          <Modal.Footer className="pt-1 pb-2">
            <Button variant="secondary" size="sm" onClick={() => setModalShow(false)}>
              Close
            </Button>
            {registringReviewModal ? (
              <Button variant="primary" size="md" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp; Loading...
              </Button>
            ) : (<Button variant="primary" type="submit" size="md"> Diiwaangali </Button>)}


          </Modal.Footer>


        </Modal>
        </Form>

      {/* <div className="mb-3">
        <h3 className="mb-4">How students rated this courses</h3>
        <Row className="align-items-center">
          <Col xs="auto" className="text-center">
            <h3 className="display-2 fw-bold">4.5</h3>
            <span className="text-warning">
              <Ratings rating={4.5} />
            </span>
            <p className="mb-0 fs-6">(Based on 27 reviews)</p>
          </Col>
        
          <Col className="pt-3 order-3 order-md-2">
            <ProgressBar
              variant="warning"
              now={50}
              className="mb-3"
              style={{ height: "6px" }}
            />
            <ProgressBar
              variant="warning"
              now={36}
              className="mb-3"
              style={{ height: "6px" }}
            />
            <ProgressBar
              variant="warning"
              now={9}
              className="mb-3"
              style={{ height: "6px" }}
            />
            <ProgressBar
              variant="warning"
              now={3}
              className="mb-3"
              style={{ height: "6px" }}
            />
            <ProgressBar
              variant="warning"
              now={2}
              className="mb-3"
              style={{ height: "6px" }}
            />
          </Col>
          <Col xs={6} md="auto" className="order-2 order-md-3">
   
            <div>
              <span className="text-warning">
                <Ratings rating={5} />
              </span>
              <span className="ms-4">50%</span>
            </div>
            <div>
              <span className="text-warning">
                <Ratings rating={4} />
              </span>
              <span className="ms-4">36%</span>
            </div>
            <div>
              <span className="text-warning">
                <Ratings rating={3} />
              </span>
              <span className="ms-4">9%</span>
            </div>
            <div>
              <span className="text-warning">
                <Ratings rating={2} />
              </span>
              <span className="ms-4">3%</span>
            </div>
            <div>
              <span className="text-warning">
                <Ratings rating={1} />
              </span>
              <span className="ms-4">2%</span>
            </div>
          </Col>
        </Row>
      </div> */}
      {/* hr */}
      <div className="d-lg-flex align-items-center justify-content-between mb-5">
        {/* Reviews */}
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Falcelinta Ardada</h3>
        </div>
        <div>
          {/* Form */}
         
            <Button variant="primary" type="submit" size="smd" onClick={() => setModalShow(true)}>
              {" "}
              Falcelin Reeb{" "}
            </Button>
    
          {/* <Form className="form-inline">
            <Form.Group
              className="d-flex align-items-center me-2"
              controlId="formBasicEmail"
            >
              <span className="position-absolute ps-3">
                <i className="fe fe-search"></i>
              </span>
              <Button
                placeholder="Search Review"
                className=" ps-6"
              />
            </Form.Group>
          </Form> */}
        </div>
      </div>
      <hr className="my-5" />
      <div className="mb-3">

        {/* Rating */}
        {reviews.length != 0 ? (
          reviews.map((item, index) => (
            <div className="d-flex border-bottom pb-4 mb-4" key={index}>
              <Image
                src={item.theUser.profileImage}
                alt=""
                className="rounded-circle avatar-lg"
              />
              <div className=" ms-3">
                <h4 className="mb-1">
                  {item.theUser.fullName}
                  <span className="ms-1 fs-6 text-muted">{item.postedon}</span>
                </h4>
                <div className="fs-6 mb-2 text-warning">
                  <Ratings rating={item.theRate} />
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.theText
                  }}
                />
                <div className="d-lg-flex">
                  <p className="mb-0">Was this review helpful?</p>
                  <Link to="#" className="btn btn-xs btn-primary ms-lg-3">
                    Yes
                  </Link>
                  <Link to="#" className="btn btn-xs btn-outline-white ms-1">
                    No
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (<center>Ma jiraan Wax Falcelin ah</center>)}

      </div>
    </Fragment>
  );
};
export default EventReviewsTab;
