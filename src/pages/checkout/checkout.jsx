// import node module libraries
import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
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
    Tooltip
} from 'react-bootstrap';
import PageHeading from 'components/elements/common/heading/PageHeading';
import FormSelect from 'components/elements/custom/FormSelect';
import { useRef } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import { processPaymentService } from 'services/coursesService';
import { toast } from 'react-toastify';

// import custom components

const Checkout = () => {
    const [status, setStatus] = useState(1); // 0: no show, 1: show yes, 2: show no.
    const FormRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const paypalemailRef = useRef(null);

    const {currentUser} = useContext(CurrentUserContext)
    const { courseid } = useParams();
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
                "money": "2",
                "courseId": courseid,
                "months": "1",
                "type":(status==1?'waafi':status==2?'credit-card':'paypal')
            };

            console.log(body)

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
    return (
        <Fragment>
            {/* Page header */}
            <PageHeading pagetitle="Checkout" />

            {/*  Content */}
            <div className="py-6">
                <Container>
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
                                    <div className="d-flex justify-content-between">
                                        <p>Original Price:</p>
                                        <p>$20</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p>Discounts:</p>
                                        <p>$-20</p>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between">
                                        <p>Total</p>
                                        <p>$0</p>
                                    </div>


                                    <h3 className="mb-2 mt-5">Cuppon/Referal Codes</h3>
                                    <Form>
                                        <Form.Group
                                            className="input-group"
                                            controlId="discountcodes"
                                        >
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your code"
                                                required
                                            />
                                            <Button variant="secondary" id="couponCode">
                                                Apply
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                    <Button variant="success" className='mt-4 btn-block' onClick={processPayment}>Process Payment</Button>
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
