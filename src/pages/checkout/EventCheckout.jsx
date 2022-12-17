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
  Badge,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import PageHeading from "components/elements/common/heading/PageHeading";
import FormSelect from "components/elements/custom/FormSelect";
import { CurrentUserContext } from "services/currentUserContext";
import {
  CheckCuppon,
  getCoursesDetail,
  processPaymentService,
} from "services/coursesService";

import { getEvent, processPayment } from "services/evantService";
import { toast } from "react-toastify";
import useSWR from "swr";
import { ShimmerCategoryItem } from "react-shimmer-effects";
import { END_POINT } from "helper/constants";
import Tippy from "@tippyjs/react";
import Ratings from "components/elements/common/ratings/Ratings";
import LevelIcon from "pages/student/miscellaneous/LevelIcon";

// import custom components
// function useQuery() {
//   const { search } = useLocation();
//   return new URLSearchParams(search);
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }

const statelist = [
  { value: "1", label: "Gujarat" },
  { value: "2", label: "Rajasthan" },
  { value: "3", label: "Maharashtra" },
];
const countrylist = [
  { value: "1", label: "India" },
  { value: "2", label: "UK" },
  { value: "3", label: "USA" },
];

// Month select control values
const months = [
  { value: "Jan", label: "Jan" },
  { value: "Feb", label: "Feb" },
  { value: "Mar", label: "Mar" },
  { value: "Apr", label: "Apr" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "Jul", label: "Jul" },
  { value: "Aug", label: "Aug" },
  { value: "Sep", label: "Sep" },
  { value: "Oct", label: "Oct" },
  { value: "Nov", label: "Nov" },
  { value: "Dec", label: "Dec" },
];

// Year select control values
const year = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];

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

  const CardNumberInput = (props) => (
    <InputMask
      mask="9999-9999-9999-9999"
      placeholder="xxxx-xxxx-xxxx-xxxx"
      value={props.value}
      onChange={props.onChange}
      className="form-control bg-white px-4 p-2"
    >
      {(inputProps) => <Form.Control {...inputProps} type="tel" />}
    </InputMask>
  );

  const CreditDebitCardMethod = () => {
    return (
      <Fragment>
        {/*  Form */}
        <Form className="row " id="cardpayment">
          {/*  Card number */}
          <Col md={12} sm={12} className="mb-3 mt-4">
            {/*  Card Number */}
            <Form.Group controlId="formCardNumber">
              <Form.Label className="d-flex justify-content-between align-items-center ">
                Card Number
                <span>
                  <i className="fab fa-cc-amex me-1  text-primary"></i>
                  <i className="fab fa-cc-mastercard me-1  text-primary"></i>{" "}
                  <i className="fab fa-cc-discover me-1  text-primary"></i>{" "}
                  <i className="fab fa-cc-visa  text-primary"></i>
                </span>
              </Form.Label>
            </Form.Group>
            <CardNumberInput />

            <small className="text-muted">
              Full name as displayed on card.
            </small>
          </Col>
          {/*  Month */}
          <Col md={4} sm={12} className="mb-3">
            <Form.Group controlId="formMonth">
              <Form.Label>Month</Form.Label>
              <FormSelect options={months} required />
            </Form.Group>
          </Col>
          {/*  Year */}
          <Col md={4} sm={12} className="mb-3">
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <FormSelect options={year} required />
            </Form.Group>
          </Col>
          {/*  CVV Code */}
          <Col md={4} sm={12} className="mb-3">
            <Form.Group controlId="formCVVCode">
              <Form.Label>
                CVV Code
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-top">
                      {" "}
                      A 3 - digit number, typically printed on the back of a
                      card.
                    </Tooltip>
                  }
                >
                  <i className="fe fe-help-circle ms-1 fs-6"></i>
                </OverlayTrigger>
              </Form.Label>
            </Form.Group>
            <InputMask
              type="password"
              mask="999"
              maskChar={null}
              className="form-control"
              placeholder="xxx"
            />
          </Col>
          {/*  Name on card */}
          <Col sm={12} md={12} className="mb-3">
            <Form.Group controlId="nameoncard">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control type="text" placeholder="Name" required />
            </Form.Group>
          </Col>
          {/*  Country */}
          <Col md={6} sm={6} className="mb-3">
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <FormSelect options={countrylist} />
            </Form.Group>
          </Col>
          {/*  Zip Code */}
          <Col md={6} sm={6} className="mb-3">
            <Form.Group controlId="postalcode">
              <Form.Label>Zip/Postal Code</Form.Label>
              <Form.Control type="text" placeholder="Zipcode" required />
            </Form.Group>
          </Col>
          {/*  CheckBox */}
          <Col md={12} sm={12} className="mb-5">
            {/*  Checkbox  */}
            <Form.Group controlId="customCheck1">
              <Form.Check type="checkbox" label="Remember this card" />
            </Form.Group>
          </Col>
          {/*  Button */}
          <div>
            <Button variant="primary">Make a Payment</Button>
          </div>

          {/*  Text */}
          <Col md={12} sm={12} className="d-flex align-items-center">
            <small className="mb-0">
              By click start learning, you agree to our{" "}
              <Link to="#">Terms of Service and Privacy Policy.</Link>
            </small>
          </Col>
        </Form>
      </Fragment>
    );
  };

  const PayPalMethod = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={handleSubmit}>
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
        userId: currentUser.id,
        money: 2,
        evtId: data.id,
        type: status == 1 ? "waafi" : status == 2 ? "somtel" : "paypal",
      }));
    }
  };

  // console.log(input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

  const Waafi = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={handleSubmit}>
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
  const Dahab = () => {
    return (
      <Fragment>
        {/*  Paypal */}
        <Form id="internetpayment" onSubmit={handleSubmit}>
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
