// import node module libraries
import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import {
  Col,
  Row,
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Image,
} from "react-bootstrap";
import PageHeading from "components/elements/common/heading/PageHeading";
import { CurrentUserContext } from "services/currentUserContext";
import { getEvent, processPayment } from "services/evantService";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useFormik } from "formik";
import * as yub from "yup";

import { END_POINT } from "helper/constants";
import Tippy from "@tippyjs/react";

const EventCheckout = () => {
  const { slug } = useParams();

  const { data, error } = useSWR(`api/qaEvent-detail-slug/${slug}/`, getEvent);

  const [status, setStatus] = useState(1); // 0: no show, 1: show yes, 2: show no.

  const [input, setInput] = useState({
    number: "",
    userId: "",
    money: "",
    evtId: "",
  });
  const [inputError, setInputError] = useState("");

  const { currentUser } = useContext(CurrentUserContext);

  const history = useHistory();

  useEffect(() => {
    setInput("");
  }, [status]);

  const radioHandler = (status) => {
    setStatus(status);
  };

  const onSubmit = async () => {
    try {
      console.log("hello");
      // const response = await processPayment(input);
      // if (response && response.status) {
      //   console.log(response);
      //   toast.success(response.message);
      //   history.push("/user/dashboard/");
      // } else {
      //   toast.error("Payment Error");
      // }
    } catch (error) {
      console.log("Error", error);
      toast.error(error);
    }
  };

  const payForm = useFormik({
    initialValues: {
      number: "",
      userId: currentUser && currentUser.id,
      money: data && data.price,
      evtId: data && data.id,
      type: status == 1 ? "waafi" : status == 2 ? "somtel" : "paypal",
    },
    validationSchema: yub.object().shape({
      number: yub.number().required("Soo Gali Email"),
    }),
    onSubmit,
  });

  console.log(payForm.values);
  console.log(currentUser.id);

  const PayPalMethod = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={onSubmit}>
          <div className="mb-3 mt-4 ">
            <Form.Group controlId="paypalemail">
              <Form.Label>PayPal</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your PayPal email"
                required
              />
            </Form.Group>
          </div>
          <Button variant="primary">PayPal Checkout</Button>
        </Form>
      </Fragment>
    );
  };

  const handleOnChange = ({ target }) => {
    const { value, name } = target;

    setInput((prev) => ({ ...prev, [name]: value }));

    if (data && currentUser) {
      setInput((prev) => ({
        ...prev,
      }));
    }
  };

  // console.log(input);

  const Waafi = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={payForm.onSubmit}>
          <div className="mb-3 mt-4 ">
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <input
                type="text"
                placeholder="xxx-xxx-xxx"
                value={payForm.values.number}
                name={"number"}
                onChange={payForm.handleChange}
                onBlur={payForm.handleBlur}
                className="form-control bg-white px-4 py-2.1"
              />

              <span className="text-danger">{error}</span>
            </Form.Group>
          </div>
          <Button variant="primary">Waafi Checkout</Button>
        </Form>
      </Fragment>
    );
  };
  const Dahab = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={onSubmit}>
          <div className="mb-3 mt-4 ">
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <input
                type="text"
                placeholder="xxx-xxx-xxx"
                value={input.number}
                name={"number"}
                onChange={(e) => handleOnChange(e)}
                className="form-control bg-white px-4 py-2.1"
              />

              <span className="text-danger">{error}</span>
            </Form.Group>
          </div>
          <Button variant="primary">Waafi Checkout</Button>
        </Form>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {/* Page header */}
      <PageHeading pagetitle="Checkout" />

      {/*  Content */}
      <div className="py-6">
        <Container>
          {data && !error && (
            <Card className="mb-4 card-hover">
              <Row className="g-0">
                <Link
                  to={`/courses/${data.slug}`}
                  className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
                  style={{
                    background: `url(${END_POINT}${data.coverImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                >
                  <Image
                    src={`${END_POINT}${data.coverImage}`}
                    alt="..."
                    className="img-fluid d-lg-none invisible"
                  />
                </Link>
                <Col lg={9} md={12} sm={12}>
                  {/* <!-- Card body --> */}
                  <Card.Body>
                    <h3 className="mb-2 text-truncate-line-2 ">
                      <Link
                        to={`/events/${data.slug}`}
                        className="text-inherit"
                      >
                        {data.title}
                      </Link>
                    </h3>
                    {/* <!-- List inline --> */}
                    <ListGroup as="ul" bsPrefix="list-inline" className="">
                      <ListGroup.Item as="li" bsPrefix="list-inline-item">
                        <i className="fa fa-dollar-sign me-1"></i>
                        {data.saledPrice}
                      </ListGroup.Item>
                    </ListGroup>
                    {/* <!-- Row --> */}
                    <Row className="align-items-center g-0">
                      <Col className="col-auto">
                        <Image
                          src={`${END_POINT}${data.persenter.profileImage}`}
                          className="rounded-circle avatar-xs"
                          alt=""
                        />
                      </Col>
                      <Col className="col ms-2">
                        <span>{data.persenter.fullName}</span>
                      </Col>
                      <Col className="col-auto">
                        <Tippy content="Add to Bookmarks" animation={"scale"}>
                          <Link to="#" className="text-muted bookmark">
                            <i className="fe fe-bookmark"></i>
                          </Link>
                        </Tippy>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          )}

          <Row>
            <Col lg={12} md={12} sm={12}>
              {/*  Card */}
              <Card className="border-0 mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between fs-4 mb-3">
                    <p className="mb-0">Price</p>
                    <p className="mb-0 fw-bolder">${data?.price}</p>
                  </div>
                  <hr />
                </Card.Body>
              </Card>
              {/*  Card */}
            </Col>
            <Col xl={12} lg={12} md={12} sm={12}>
              <Card className="mb-3 mb-lg-0">
                {/*  Card header */}
                <Card.Header>
                  <h3 className="mb-0">Complete Enrollment</h3>
                </Card.Header>
                {/*  Card body */}
                <Card.Body>
                  <Form.Check
                    inline
                    label="Waafi Pay"
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    checked={status === 1}
                    onChange={(e) => radioHandler(1)}
                  />
                  <Form.Check
                    inline
                    label="Somtel"
                    name="group1"
                    type="radio"
                    id="inline-radio-2"
                    checked={status === 2}
                    onChange={(e) => radioHandler(2)}
                  />
                  <Form.Check
                    inline
                    label="PayPal"
                    name="group1"
                    type="radio"
                    id="inline-radio-3"
                    checked={status === 3}
                    onChange={(e) => radioHandler(3)}
                  />
                  {status === 1 ? Waafi() : ""}
                  {status === 2 ? Dahab() : ""}
                  {status === 3 ? PayPalMethod() : ""}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default EventCheckout;
