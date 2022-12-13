// import node module libraries
import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
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
    Image
} from 'react-bootstrap';
import PageHeading from 'components/elements/common/heading/PageHeading';
import FormSelect from 'components/elements/custom/FormSelect';
import { useRef } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import { CheckCuppon, getCoursesDetail, processPaymentService } from 'services/coursesService';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { END_POINT } from 'helper/constants';
import Tippy from '@tippyjs/react';
import Ratings from 'components/elements/common/ratings/Ratings';
import LevelIcon from 'pages/student/miscellaneous/LevelIcon';

// import custom components
function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  
const Checkout = () => {
    const { courseid } = useParams();
   const query = useQuery();
    const { data, error } = useSWR(
        `/api/qaCourse-detail-slug/${courseid}`,
        getCoursesDetail
      );
    const [status, setStatus] = useState(1); // 0: no show, 1: show yes, 2: show no.
    const FormRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const paypalemailRef = useRef(null); 
    const cupponRef = useRef(null); 
    const referalCodeRef = useRef(query.get("ref")); 

    const [cuppon, setcuppon] = useState({
        code:'',
        price:0
    });
console.log(query)
    const {currentUser} = useContext(CurrentUserContext)
    
    const history = useHistory();

    const radioHandler = (status) => {
        setStatus(status);
    };

    const statelist = [
        { value: '1', label: 'Gujarat' },
        { value: '2', label: 'Rajasthan' },
        { value: '3', label: 'Maharashtra' }
    ];
    const countrylist = [
        { value: '1', label: 'India' },
        { value: '2', label: 'UK' },
        { value: '3', label: 'USA' }
    ];

    // Month select control values
    const months = [
        { value: 'Jan', label: 'Jan' },
        { value: 'Feb', label: 'Feb' },
        { value: 'Mar', label: 'Mar' },
        { value: 'Apr', label: 'Apr' },
        { value: 'May', label: 'May' },
        { value: 'Jun', label: 'Jun' },
        { value: 'Jul', label: 'Jul' },
        { value: 'Aug', label: 'Aug' },
        { value: 'Sep', label: 'Sep' },
        { value: 'Oct', label: 'Oct' },
        { value: 'Nov', label: 'Nov' },
        { value: 'Dec', label: 'Dec' }
    ];

    // Year select control values
    const year = [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' }
    ];

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

    const onChange = () => {
        console.log('onChange was called!');
    };

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
                                    <i className="fab fa-cc-mastercard me-1  text-primary"></i>{' '}
                                    <i className="fab fa-cc-discover me-1  text-primary"></i>{' '}
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
                                            {' '}
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
                    {/* <div>
							<Button variant="primary">Make a Payment</Button>
						</div> */}

                    {/*  Text */}
                    <Col
                        md={12}
                        sm={12}
                        className="d-flex align-items-center"
                    >
                        <small className="mb-0">
                            By click start learning, you agree to our{' '}
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
                <Form id="internetpayment" ref={FormRef} onSubmit={handleSubmit}>
                    <div className="mb-3 mt-4 ">
                        <Form.Group controlId="paypalemail">
                            <Form.Label>PayPal</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your PayPal email"
                                required
                                ref={paypalemailRef}
                            />
                        </Form.Group>
                    </div>
                    {/* <Button variant="primary">PayPal Checkout</Button> */}
                </Form>
            </Fragment>
        );
    };
    const Waafi = () => {
        return (
            <Fragment>
                {/*  Paypal */}
                <Form id="internetpayment" ref={FormRef} onSubmit={handleSubmit}>
                    <div className="mb-3 mt-4 ">
                        <Form.Group controlId="waafiphone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                ref={phoneNumberRef}
                                placeholder="Enter your Payment Phone number"
                                required
                            />
                        </Form.Group>
                    </div>
                    {/* <Button variant="primary">PayPal Checkout</Button> */}
                </Form>
            </Fragment>
        );
    };


    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          
            var body = {
                "number":phoneNumberRef?.current?.value ?? '',
                "userId": currentUser.id??'',
                "money": (data?.saledPrice - cuppon.price)??0,
                "courseId": data.id,
                "months": "1",
                "refCode":referalCodeRef?.current.value,
                "cupponCode":cuppon.code,
                "type":(status==1?'waafi':status==2?'credit-card':'paypal')
            };


            const response = await processPaymentService(body);

            if (response && response.status) {
                console.log(response)
                toast.success(response.message)
                history.push("/user/dashboard/");
            } else {
toast.error('Payment Error');
            }

        } catch (error) {
            console.log("Error",error)
            toast.error(error);
        }
    }


    const processPayment = (e) => {
        if (FormRef.current) {
            FormRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
            FormRef.current.requestSubmit();
        }
    }

    const handleCuponcode = async (e)=>{
        e.preventDefault();
        
        try {
            if (cuppon.code == cupponRef?.current?.value) {
                toast.info('Cuppon Already Applied');
                return;
            }
            const response = await CheckCuppon(cupponRef?.current?.value??'');
            if (response.isCouponCode && response.exists) {
if (!response.isExpired) {
    toast.success('Cuppon Applied');
                    setcuppon({
                        code:cupponRef?.current?.value,
                        price:response.discountPrice
                    })
} else {
    if(cuppon.code) removeCuppon();
    toast.error('Cuppon Code Expired');
}
            }else{
                if(cuppon.code) removeCuppon();
                toast.error('Cuppon Code does not Exist');
            }
        } catch (error) {
            if(cuppon.code) removeCuppon();
            console.log("Error",error)
            toast.error(error);
        }
    }
    const removeCuppon = ()=>{
        setcuppon({
            code:'',
            price:0
        });
        cupponRef.current.value=''
    }

    return (
        <Fragment>
            {/* Page header */}
            <PageHeading pagetitle="Checkout" />

            {/*  Content */}
            <div className="py-6">
                <Container>
{
    (data && !error) && <Card className="mb-4 card-hover">
    <Row className="g-0">
        <Link
            to={`/courses/${data.slug}`}
            className="bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 "
            style={{
                background: `url(${END_POINT}${data.coverImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top center'
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
                    <Link to={`/courses/${data.slug}`} className="text-inherit">
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
                            src={`${END_POINT}${data.instructor.profileImage}`}
                            className="rounded-circle avatar-xs"
                            alt=""
                        />
                    </Col>
                    <Col className="col ms-2">
                        <span>{data.instructor.fullName}</span>
                    </Col>
                    <Col className="col-auto">
                        <Tippy content="Add to Bookmarks" animation={'scale'}>
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
}

                    <Row>
                        <Col xl={8} lg={8} md={12} sm={12}>

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
                                        label="Credit or Debit card"
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
                                    {status === 1 ? <Waafi /> : ''}
                                    {status === 2 ? CreditDebitCardMethod() : ''}
                                    {status === 3 ? PayPalMethod() : ''}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={12} sm={12}>
                            {/*  Card */}
                            <Card className="border-0 mb-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-between fs-4 mb-3">
                                        <p className='mb-0'>Original Price</p>
                                        <p className='mb-0 fw-bolder'>${data?.saledPrice}</p>
                                    </div>

                                    <div className="d-flex justify-content-between fs-4 mb-3">
                                        <p className='mb-0'>Discount</p>
                                        <p className='mb-0 fw-bolder'>${cuppon?.price ?? 0}</p>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between fs-4">
                                        <p>Total</p>
                                        <p className='fw-bolder'>${data?.saledPrice - cuppon.price}</p>
                                    </div>


                                    <h3 className="mb-2 mt-5">Cuppon Code</h3>
                                    <Form onSubmit={handleCuponcode}>
                                        <Form.Group
                                            className="input-group"
                                            controlId="discountcodes"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your code"
                                                required
                                                ref={cupponRef}
                                            />
                                            <Button variant="success" type='submit'>
                                                Apply
                                            </Button>
                                        </Form.Group>
                                        {cuppon.code && <Badge bg='success' className='mt-2'>{cuppon.code} <i className="fa fa-times text-white ml-3" onClick={()=>removeCuppon()}></i></Badge>}
                                    </Form>
                                    <Form.Control
                                                type="text"
                                                className='mt-4'
                                                placeholder="Referal code"
                                                
                                                ref={referalCodeRef}
                                            />
                                    <Button variant="success" className='mt-4 btn-block'
                                    disabled={!data}
                                    onClick={processPayment}>Process Payment</Button>
                                </Card.Body>
                            </Card>
                            {/*  Card */}

                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default Checkout;
