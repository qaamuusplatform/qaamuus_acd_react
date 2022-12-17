import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yub from "yup";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import http, { httpAxiosWithToken } from "services/httpService";

export function WaafiPayment(theEventDetail) {
  const [formIsLoading, setFormIsLoading] = useState(false);
  //   let eventInrollmentData={}

  const onSubmit = async() => {
    theEventDetail.theEventDetail.number = paymentForm.values.number.toString();
    // setFormIsLoading(true);
    console.log(theEventDetail.theEventDetail)
    try {
        await http
        .post(
          `/api/inrollEventToUser/${theEventDetail.theEventDetail.type}/`,
          JSON.stringify(theEventDetail.theEventDetail), { headers: { "Content-Type": "application/json" }})
        .then((eventInrollmentResp) => {
          console.log(eventInrollmentResp.data);
          setFormIsLoading(false);
          registringUserForm.resetForm();
          toast.success(eventInrollmentResp.data.message);
          // history.replace("/auth/login/");
        });
    } catch(error){
        // console.log('errr',error)
        toast.error("laguma guulaysan lacag bixinta fadlan ku celi markale")
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

export function DahabPayment() {
  return <div>eDahab</div>;
}

export function StripeOrPaypal() {
  return <div>stripe</div>;
}
