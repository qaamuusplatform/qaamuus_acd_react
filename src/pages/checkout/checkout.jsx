// import node module libraries
import React, { Fragment, useContext, useState, useRef } from "react";
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
  Tab,
  Nav,
  Alert,
} from "react-bootstrap";
import PageHeading from "components/elements/common/heading/PageHeading";
import FormSelect from "components/elements/custom/FormSelect";
import { CurrentUserContext } from "services/currentUserContext";
import {
  CheckCuppon,
  getCoursesDetail,
  httpFetcher,
  processPaymentService,
} from "services/coursesService";
import { toast } from "react-toastify";
import useSWR from "swr";
import { ShimmerCategoryItem, ShimmerPostDetails } from "react-shimmer-effects";
import { END_POINT } from "helper/constants";
import Tippy from "@tippyjs/react";
import Ratings from "components/elements/common/ratings/Ratings";
import LevelIcon from "pages/student/miscellaneous/LevelIcon";
import { qaamuusPayments } from "data/qaamuusPayments";
import {
  CashOnDelivery,
  DahabPayment,
  WaafiPayment,
} from "pages/payments/paymentsComponents";
import { useEffect } from "react";
import PaypalSdk from "pages/payments/paypal_sdk";

// import custom components
function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Checkout = () => {
  const { slug } = useParams();
  // console.log(queryParameters.get("idd"))
  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)
  const { currentUser, userIsLoading } = useContext(CurrentUserContext);
  const { data: checkoutCourse, error } = useSWR(`/api/checkThisUserInrolledCourse-slug/${currentUser.id}/${slug}/`,httpFetcher);
  let coursePrice = 5;
  const cupponCodeRef = useRef(null);
  const referralCodeRef = useRef(null);
  
  const [referralCodeRefState, setReferralCodeRefState] = useState({ code: '', price: 0 });
  const [cupponCodeDiscount, setCupponCodeDiscount] = useState({ code: '', price: 0 });

  const handleReferralCode = async (e) => {
    setReferralCodeRefState(e.target.value)
  }

  if (checkoutCourse) {
    if (checkoutCourse.theCourse.showDiscountPrice) {
      coursePrice = checkoutCourse.theCourse.saledPrice
    } else {
      coursePrice = checkoutCourse.theCourse.regularPrice
    }
  }


  const handleCuponcode = async (e) => {
    e.preventDefault();
    try {
      if (cupponCodeDiscount == cupponCodeRef?.current?.value) {
        toast.info('Codekan horay ayaad qabsatay');
        return;
      }
      const response = await CheckCuppon(cupponCodeRef?.current?.value ?? '');
      if (response.isCouponCode && response.exists) {
        if (!response.isExpired) {
          toast.success('Codekan Waa la aqbalay');
          coursePrice = response.discountPrice;
          setCupponCodeDiscount({
            code: cupponCodeRef?.current?.value,
            price: response.discountPrice
          })
        } else {
          if (cupponCodeDiscount) removeCuppon();
          toast.error('Cuppon Codekan waa expire');
        }
      } else {
        if (cupponCodeDiscount) removeCuppon();
        toast.error('Cuppon Codekan maaha midjira');
      }
    } catch (error) {
      if (cupponCodeDiscount) removeCuppon();
      console.log("Error", error)
      toast.error(error);
    }
  }
  const handleCuponcodeWithOutSubmit = async () => {
    try {
      if (cupponCodeDiscount == cupponCodeRef?.current?.value) {
        toast.info('Codekan horay ayaad qabsatay');
        return;
      }
      const response = await CheckCuppon(cupponCodeRef?.current?.value ?? '');
      if (response.isCouponCode && response.exists) {
        if (!response.isExpired) {
          toast.success('Codekan Waa la aqbalay');
          coursePrice = response.discountPrice;
          setCupponCodeDiscount({
            code: cupponCodeRef?.current?.value,
            price: response.discountPrice
          })
        } else {
          if (cupponCodeDiscount) removeCuppon();
          toast.error('Cuppon Codekan waa expire');
        }
      } else {
        if (cupponCodeDiscount) removeCuppon();
        toast.error('Cuppon Codekan maaha midjira');
      }
    } catch (error) {
      if (cupponCodeDiscount) removeCuppon();
      console.log("Error", error)
      toast.error(error);
    }
  }
  const removeCuppon = () => {
    setCupponCodeDiscount({
      code: '',
      price: 0
    });
    // cupponCodeRef.current.value = ''
  }
  if (!checkoutCourse && !error) {
    return (
      <Fragment>
        <div className=" pt-8 pb-8">
          <Container>
            <ShimmerPostDetails card cta variant="EDITOR" />
          </Container>
        </div>
      </Fragment>
    );
  }
  // useEffect(() => {
  //   handleCuponcodeWithOutSubmit();
  // }, [cupponCodeRef]);
  return (
    <Fragment>
      {/* Page header */}
      <PageHeading pagetitle="Godoshada Courseska" />

      {/*  Content */}
      <div className="py-6">
        <Container>
          {/* {checkoutCourse.isEnrolled && checkoutCourse.paided ?(
            
            <Alert variant="success" ><strong>MAHADSANID</strong> Horay Ayaad uga diiwaangashneed courskan </Alert>
          ):(
            <div></div>
          ) } */}
          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              <Card className="mb-3 mb-lg-0">
                <Card.Header>
                  <h3 className="mb-0">Complete Enrollment</h3>
                </Card.Header>
                <Card.Body>
                  <Tab.Container
                    fill
                    variant="pills"
                    defaultActiveKey="waafiP"
                    id="uncontrolled-tab-example"
                  >
                    <Nav className="d-flex justify-content-between nav-lt-tab">
                      {qaamuusPayments.map((thePayment, index) => (
                        <Nav.Item className="d-flex" key={index}>
                          <Nav.Link
                            eventKey={thePayment.key}
                            className="mb-sm-3 mb-md-0"
                          >
                            <div className="d-flex">
                              <Image
                                src={thePayment.image}
                                width={thePayment.width}
                                alt=""
                                className="me-3"
                              />
                              <div>
                                <h5 className="mb-0">{thePayment.name}</h5>
                                <p className="mb-0 fs-6">{thePayment.desc}</p>
                              </div>
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                    <hr></hr>
                    <Tab.Content>
                      {/* {qaamuusPayments.map((thePayment, index) => (
              
            ))} */}
                      <Tab.Pane eventKey="waafiP" className="pb-1 p-1">
                        {/* Description Tab */}
                        <WaafiPayment
                          theEnrollmentData={{
                            number: 0,
                            userId: `${currentUser.id}`,
                            courseId: `${checkoutCourse.theCourse.id}`,
                            months: `2`,
                            money: `${coursePrice - cupponCodeDiscount.price}`,
                            referralCode: referralCodeRef.current?.value,
                            cupponCode: cupponCodeDiscount.code,
                            type: "waafi",
                          }}
                          itsCourse={true}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="somtelP" className="pb-1 p-1">
                        {/* Description Tab */}
                        {/* {thePayment.content} */}
                        <DahabPayment
                          theEventDetail={{
                            number: 0,
                            userId: `${currentUser.id}`,
                            courseId: `${checkoutCourse.theCourse.id}`,
                            months: `2`,
                            referralCode: referralCodeRef.current?.value,
                            money: `${coursePrice - cupponCodeDiscount.price}`,
                            type: "eDahab",
                          }}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="othersp" className="pb-1 p-1">
                        {/* Description Tab */}
                        <CashOnDelivery theEnrollmentData={{
                          number: 0,
                          userId: `${currentUser.id}`,
                          courseId: `${checkoutCourse.theCourse.id}`,
                          months: `2`,
                          money: `${coursePrice - cupponCodeDiscount.price}`,
                          referralCode: referralCodeRefState,
                          cupponCode: cupponCodeDiscount.code,
                          type: "cashOnDelivery",
                        }}
                          itsCourse={true} />
                        {/* {thePayment.content} */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="paypalP" className="pb-1 p-1">
                        {/* Description Tab */}
                        <PaypalSdk theEnrollmentData={{
                          number: 0,
                          userId: `${currentUser.id}`,
                          courseId: `${checkoutCourse.theCourse.id}`,
                          months: `2`,
                          money: `${coursePrice - cupponCodeDiscount.price}`,
                          referralCode: referralCodeRef.current?.value,
                          cupponCode: cupponCodeDiscount.code,
                          type: "paybalCc",
                        }}
                          itsCourse={true} />
                        {/* {thePayment.content} */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={12} sm={12}>
              {/*  Card */}
              <Card className="border-0 mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between fs-4 mb-3">
                    <p className="mb-0 fw-bold">QIIMAHA</p>
                    <div className="mb-3">

                      {checkoutCourse.theCourse.showDiscountPrice ? (
                        <div>
                          <span className="text-dark fw-bold h3 me-2">
                            ${checkoutCourse.theCourse.saledPrice}
                          </span>
                          <del className="fs-5 text-muted">
                            ${checkoutCourse.theCourse.regularPrice}
                          </del>
                        </div>
                      ) : (
                        <div>
                          <span className="text-dark fw-bold h3 me-2">
                            ${checkoutCourse.theCourse.regularPrice}
                          </span>

                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between fs-4 mb-3">
                    <p className="mb-0 fw-bold">QIIMA-DHIMIS</p>
                    <p className="mb-0  fw-bolder">${cupponCodeDiscount.price}</p>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-4">
                    <p className="fw-bold">TOTALKA</p>
                    <p className="fw-bolder">
                      ${coursePrice - cupponCodeDiscount.price}
                    </p>
                  </div>
                  <hr></hr>
                  <Form.Label className='mt-3 fw-bold'>Cuppon Code</Form.Label>
                  {/* <h3 className="mb-2 fw-bold mt-5">Cuppon Code</h3> */}
                  <Form onSubmit={handleCuponcode}>
                    <Form.Group
                      className="input-group"
                      controlId="discountcodes"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Enter your code"
                        required
                        value={queryParameters.get('cupponCode')}
                        ref={cupponCodeRef}
                      />

                      <Button variant="success" type="submit">
                        Apply
                      </Button>
                    </Form.Group>

                    <Form.Label className='mt-3 fw-bold'>Reffral Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Referral code"
                      value={queryParameters.get('refrralCode')}
                      onChange={handleReferralCode}
                      ref={referralCodeRef}
                    />
                    {/* {cupponCodeDiscount && <Badge bg='success' className='mt-2'>{cupponCodeDiscount} <i className="fa fa-times text-white ml-3" onClick={() => removeCuppon()}></i></Badge>} */}
                  </Form>
                  {/* <Form.Control
                                        type="text"
                                        className='mt-4'
                                        placeholder="Referal code"

                                        ref={referalCodeRef}
                                    /> */}
                  {/* <Button variant="success" className='mt-4 btn-block'
                                        disabled={!checkoutCourse}
                                        onClick={processPayment}>Process Payment</Button> */}
                </Card.Body>
              </Card>
              {/*  Card */}
            </Col>
          </Row>
          {checkoutCourse && !error && (
            <Card className="mb-4 card-hover">
              <Row className="g-0">
                <Link
                  to='#'
                  className="bg-cover img-left-rounded col-12 col-md-12 col-xl-4 col-lg-4 "
                  style={{
                    background: `url(${checkoutCourse.theCourse.coverImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                  }}
                >
                  <Image
                    src={`${checkoutCourse.theCourse.coverImage}`}
                    alt="..."
                    className="img-fluid d-lg-none invisible"
                  />
                </Link>
                <Col lg={8} md={12} sm={12}>
                  {/* <!-- Card body --> */}
                  <Card.Body>
                    <h3 className="mb-2 text-truncate-line-2 ">
                      <Link
                        to='#'
                        className="text-inherit"
                      >
                        {checkoutCourse.theCourse.title}
                      </Link>
                    </h3>
                    {/* <!-- List inline --> */}
                    <ListGroup as="ul" bsPrefix="list-inline" className="">
                      <ListGroup.Item as="li" bsPrefix="list-inline-item">
                        <i className="far fa-clock me-1"></i>
                        {checkoutCourse.theCourse.houres}
                      </ListGroup.Item>
                      <ListGroup.Item as="li" bsPrefix="list-inline-item">
                        <LevelIcon level={checkoutCourse.theCourse.level} />
                        {checkoutCourse.theCourse.level}
                      </ListGroup.Item>
                      <ListGroup.Item as="li" bsPrefix="list-inline-item">
                        <i className="fa fa-dollar-sign me-1"></i>
                        {checkoutCourse.theCourse.saledPrice}
                      </ListGroup.Item>
                    </ListGroup>
                    <h5 className="mb-2 fw-normal text-truncate-line-2 ">
                      {checkoutCourse.theCourse.simDesc}

                    </h5>
                    {/* <!-- Row --> */}
                    <Row className="align-items-center g-0">
                      <Col className="col-auto">
                        <Image
                          src={
                            checkoutCourse.theCourse.instructor.profileImage
                              ? checkoutCourse.theCourse.instructor.profileImage
                              : `https://ui-avatars.com/api/?name=${checkoutCourse.theCourse.instructor.fullName}&background=19a9c4&color=fff`
                          }
                          className="rounded-circle avatar-xs"
                          alt=""
                        />
                      </Col>
                      <Col className="col ms-2">
                        <span>{checkoutCourse.theCourse.instructor.fullName}</span>
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

        </Container>
      </div>
    </Fragment>
  );
};

export default Checkout;
