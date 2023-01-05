import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yub from "yup";
import React from "react";
import {mutate} from "swr";
import { useState } from "react";
import { Fragment } from "react";
import AmericanExpress from "assets/images/creditcard/americanexpress.svg";
import Hormuud from "assets/images/creditcard/SVG/hormuud.svg";
import Somnet from "assets/images/creditcard/SVG/somnet.png";
import Goolis from "assets/images/creditcard/SVG/golis.png";
import PaypalExpress from "assets/images/creditcard/paypal.svg";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Image,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import http, { httpAxiosWithToken } from "services/httpService";
import { httpFetcher } from "services/coursesService";

export function WaafiPayment({ theEnrollmentData, itsCourse }) {
  const [formIsLoading, setFormIsLoading] = useState(false);
  //   let eventInrollmentData={}

  const onSubmit = async () => {
    theEnrollmentData.number = paymentForm.values.number.toString();
    setFormIsLoading(true);
    await qaamuusEnrollingCourseWithEventPayment(theEnrollmentData, itsCourse);
    setFormIsLoading(false);

    // if(emailVerified){

    // }else{
    //   setModalShow(true)
    // }
  };
  const paymentForm = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: yub.object().shape({
      number: yub
        .string()
        .min(9, "ugu yaraan 9 number")
        .max(9, "ugu badnaan 9 number")
        .required("Fadlan Soo gali number jira")
        .test("startWith6", "6 waa inuu ka bilawdaa", function (value) {
          if (value[0] == 6) {
            return true;
          } else {
            return false;
          }
        }),
    }),
    onSubmit,
  });

  return (
    <Fragment>
      <Form onSubmit={paymentForm.handleSubmit} controlId="validationFormik01">
        <Row>
          <center>
            <div className="d-inline-flex text-center">
              <Form.Check type="radio" id="inline-radio-1">
                <Form.Check.Input
                  type="radio"
                  name="paymentRadioOne"
                  defaultChecked
                />
                <Form.Check.Label>
                  <Image src={Hormuud} width={60} alt="" className="me-3" />
                </Form.Check.Label>
              </Form.Check>

              <Form.Check type="radio" id="inline-radio-2">
                <Form.Check.Input type="radio" name="paymentRadioOne" />
                <Form.Check.Label>
                  <Image src={Somnet} width={60} alt="" className="me-3" />
                </Form.Check.Label>
              </Form.Check>

              <Form.Check type="radio" id="inline-radio-3">
                <Form.Check.Input type="radio" name="paymentRadioOne" />
                <Form.Check.Label>
                  <Image src={Goolis} width={40} alt="" className="me-3" />
                </Form.Check.Label>
              </Form.Check>
            </div>
          </center>

          <br></br>
          <br></br>
          <Form.Label>Numberka Mobileka</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">+252</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="610 00 00 00"
              aria-label="PHONE NUMBER"
              name="number"
              isInvalid={
                paymentForm.errors.number && paymentForm.touched.number
                  ? true
                  : false
              }
              value={paymentForm.values.number}
              onChange={paymentForm.handleChange}
              onBlur={paymentForm.handleBlur}
              isValid={
                paymentForm.errors.username && paymentForm.touched.username
                  ? false
                  : true
              }
              aria-describedby="basic-addon1"
            />
            <Form.Control.Feedback type="invalid">
              {paymentForm.errors.number}
            </Form.Control.Feedback>
          </InputGroup>
          <div style={{ marginLeft: "3px", marginRight: "3px", width: "100%" }}>
            {formIsLoading ? (
              <Button
                variant="primary"
                size="md"
                className="text-right btn btn-primary"
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp; Loading...
              </Button>
            ) : (
              <Button
                variant="primary"
                className="text-right btn btn-primary"
                type="submit"
                size="md"
              >
                {" "}
                Diiwaangali{" "}
              </Button>
            )}
          </div>
        </Row>
      </Form>
    </Fragment>
  );
}

export function DahabPayment({ theEventDetail }) {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const onSubmit = async () => {
    theEventDetail.number = paymentForm.values.number.toString();
    // setFormIsLoading(true);
    console.log(theEventDetail);
    try {
      await http
        .post(
          `/api/inrollEventToUser/${theEventDetail.type}/`,
          JSON.stringify(theEventDetail),
          { headers: { "Content-Type": "application/json" } }
        )
        .then((eventInrollmentResp) => {
          console.log(eventInrollmentResp.data);
          setFormIsLoading(false);
          registringUserForm.resetForm();
          toast.success(eventInrollmentResp.data.message);
          // history.replace("/auth/login/");
        });
    } catch (error) {
      // console.log('errr',error)
      toast.error("laguma guulaysan lacag bixinta fadlan ku celi markale");
    }

    // if(emailVerified){

    // }else{
    //   setModalShow(true)
    // }
  };
  const paymentForm = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: yub.object().shape({
      number: yub
        .string()
        .min(9, "ugu yaraan 9 number")
        .max(9, "ugu badnaan 9 number")
        .required("Fadlan Soo gali number jira")
        .test("startWith6", "6 waa inuu ka bilawdaa", function (value) {
          if (value[0] == 6) {
            return true;
          } else {
            return false;
          }
        }),
    }),
    onSubmit,
  });

  return (
    <Fragment>
      <Form onSubmit={paymentForm.handleSubmit} controlId="validationFormik01">
        <Row>
          <Form.Label>Name on card</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">+252</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="610 00 00 00"
              aria-label="PHONE NUMBER"
              name="number"
              isInvalid={
                paymentForm.errors.number && paymentForm.touched.number
                  ? true
                  : false
              }
              value={paymentForm.values.number}
              onChange={paymentForm.handleChange}
              onBlur={paymentForm.handleBlur}
              isValid={
                paymentForm.errors.username && paymentForm.touched.username
                  ? false
                  : true
              }
              aria-describedby="basic-addon1"
            />
            <Form.Control.Feedback type="invalid">
              {paymentForm.errors.number}
            </Form.Control.Feedback>
          </InputGroup>
          <div style={{ marginLeft: "3px", marginRight: "3px", width: "100%" }}>
            {formIsLoading ? (
              <Button
                variant="primary"
                size="md"
                className="text-right btn btn-primary"
                disabled
              >
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp; Loading...
              </Button>
            ) : (
              <Button
                variant="primary"
                className="text-right btn btn-primary"
                type="submit"
                size="md"
              >
                {" "}
                Diiwaangali{" "}
              </Button>
            )}
          </div>
        </Row>
      </Form>
    </Fragment>
  );
}

export function StripeOrPaypal() {
  return <div>stripe</div>;
}

export function CashOnDelivery({ theEnrollmentData, itsCourse }) {
  const [formIsLoading, setFormIsLoading] = useState(false);
  const cashPymentSubmit = async () => {
    setFormIsLoading(true);
    let enrollmentResp = await qaamuusEnrollingCourseWithEventPayment(theEnrollmentData, itsCourse)
    console.log(enrollmentResp)
    setFormIsLoading(false);
    // if(emailVerified){

    // }else{
    //   setModalShow(true)
    // }
  };
  return (
    <Fragment>
      <Form controlId="validationFormik01">
        <Row>
          <Form.Label className="mx-0 fw-bold fs-4">Lacag Bixinta</Form.Label>
          <Alert className="m-2 mt-0" variant="info">EVC 616 981411</Alert>
          <Alert className="m-2 mt-0" variant="dark">SALAAM 30330044</Alert>
        </Row>

        {formIsLoading ? (
          <Button
            variant="primary"
            size="md"
            className="text-right btn btn-primary"
            disabled
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            &nbsp; Loading...
          </Button>
        ) : (
          <Button
            variant="primary"
            className="text-right ms-0 btn btn-primary"
            type="submit"
            onClick={cashPymentSubmit}
            size="md"
          >
            {" "}
            ISKA DIIWAANGALI{" "}
          </Button>
        )}

      </Form>
    </Fragment>
  );
}




const qaamuusEnrollingCourseWithEventPayment = async (theEnrollmentData, itsCourse) => {
  if (itsCourse) {
    try {
      let resp = await http
        .post(
          `/api/inrollCourseToUser/${theEnrollmentData.type}/`,
          JSON.stringify(theEnrollmentData),
          { headers: { "Content-Type": "application/json" } }
        );
      if (resp.data.paided) {
        toast.success(resp.data.message);

      } else {
        if (theEnrollmentData.type == 'cashOnDelivery') {

          toast.warning(resp.data.message);
        } else {
          toast.error(resp.data.message);
        }
      }
      return resp;
    } catch (error) {
      console.log("errr", error);
      toast.error("laguma guulaysan lacag bixinta fadlan ku celi markale");
      return error;
    }
  } else {
    try {
      let resp = await http
        .post(
          `/api/inrollEventToUser/${theEnrollmentData.type}/`,
          JSON.stringify(theEnrollmentData),
          { headers: { "Content-Type": "application/json" } }
        )
      toast.success(resp.data.message);
      
      mutate(`api/checkThisUserInrolledEvent-slug/${currentUser.id}/${slug}/`, httpFetcher)
      return resp
    } catch (error) {
      // console.log('errr',error)
      toast.error("laguma guulaysan lacag bixinta fadlan ku celi markale");
      return error;
    }
  }
}


