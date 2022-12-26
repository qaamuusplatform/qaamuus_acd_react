// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image, InputGroup, Spinner } from 'react-bootstrap';

import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yub from "yup";
// import media files
import Logo from 'assets/images/brand/logo/logo.svg';
import logoCard from "assets/images/brand/logo/logoCard.svg";
import { getAllUsernamesAnsEmails } from 'services/authService';
import http from 'services/httpService';
export default function ForgetPassword() {
  const [sendedCode, setSendedCode] = useState(0);
  const [passwordShown, setPasswordShown] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [activationCodeChecked, setAtivationCodeChecked] = useState(false);
  const [existsUsernamesWithEmail, setExistsUsernamesWithEmail] = useState({})
  const qInit = async () => {
    const { emails, usernames } = await getAllUsernamesAnsEmails();
    setExistsUsernamesWithEmail({ emails: emails, usernames: usernames })
  }
  useEffect(() => {
    qInit()
  }, []);

  const sendResetPasswordCode = async () => {
    console.log(passwordResetForm.errors.email)
    if (!passwordResetForm.errors.email) {
      setSendedCode(1)
      await http.get(`api/send-reset-password-code/${passwordResetForm.values.email}/`).then((resp) => {
        if(resp.data.sended){
        setSendedCode(resp.data.sendedCode)
        }else{
          toast.warning('emailka aad galisay maaha mid jira')
        }

      })
    } else {
      toast.warning("Fadlan email saxan soo gali")
    }

  };
  const onSubmit = async () => {
    
    setFormIsLoading(true);
    // setRegistringModal(true)
    // localStorage.removeItem("access");
    await http
      .post(
        `/api/userProfile-update-email/${passwordResetForm.values.email}/`,
        JSON.stringify(passwordResetForm.values),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((userProfileResp) => {
        setFormIsLoading(false);
        passwordResetForm.resetForm();
        toast.success(
          "Waad ku guulaysatay iska badalidda passwordka"
        );
        history.replace("/auth/login/");
      });


  };
  const passwordResetForm = useFormik({
    initialValues: {
      email: "",
      activationCode: "",
      password: "",
      comfirmPassword: "",
    },
    validationSchema: yub.object().shape({
      email: yub
        .string()
        .email("Soo Gali Email Gira")
        .required("Soo Gali Emailkaaga").test(
          "existEmail",
          "emailkan maaha mid diiwaangashan",
          function (_theEmail) {
            if (existsUsernamesWithEmail.emails.includes(_theEmail)) {
              return true;
            } else {
              return false;
            }
          }
        ),
      activationCode: yub.number().min(6).required().test(
        "activationEmail",
        "Codeka Mahan mid saxan",
        function (_theActivationCode) {
          if ((_theActivationCode - passwordResetForm.values.email.length) == sendedCode) {
            setAtivationCodeChecked(true)
            return true;
          } else {
            return false;
          }
          // console.log(_theActivationCode)
          // if (existUsernames.includes(_theUsername)) {
          //   return false;
          // } else {
          //   return true;
          // }
        }
      ),
      password: yub.string().min(4).required(),

      comfirmPassword: yub
        .string()
        .oneOf([yub.ref("password"), null], "Labada Password  isma lahan"),
    }),
    onSubmit,
  });

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={7} md={7} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">

              {/* <Link to="/">
                <Image width={90} src={logoCard} className="mb-2" alt="" />
              </Link> */}

              {/* Form */}
              <Form onSubmit={passwordResetForm.handleSubmit} controlId="validationFormik01">
                <Row>
                  {activationCodeChecked ? (
                    <div>
                      <Col lg={12} md={12} sm={12}>
                        {/* New password */}
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="newpassword">Passwordka Cusub</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={passwordShown ? "text" : "password"}
                              id="password"
                              name="password"
                              placeholder="********"
                              value={passwordResetForm.values.password}
                              onChange={passwordResetForm.handleChange}
                              onBlur={passwordResetForm.handleBlur}
                              isInvalid={
                                passwordResetForm.errors.password &&
                                  passwordResetForm.touched.password
                                  ? true
                                  : false
                              }
                              required
                            />
                            <InputGroup.Text>
                              <i
                                onClick={togglePassword}
                                className={
                                  passwordShown ? "fas fa-eye-slash" : "fas fa-eye"
                                }
                              ></i>
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                          {passwordResetForm.errors.password}
                        </Form.Control.Feedback>
                      </Col>

                      <Col lg={12} md={12} sm={12}>

                        {/* Confirm new password */}
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="confirmpassword">
                            Hubi Passwordka Cusub
                          </Form.Label>
                          <InputGroup>
                            <Form.Control
                              type={passwordShown ? "text" : "password"}
                              id="comfirmPassword"
                              name="comfirmPassword"
                              placeholder="********"
                              value={passwordResetForm.values.comfirmPassword}
                              onChange={passwordResetForm.handleChange}
                              onBlur={passwordResetForm.handleBlur}
                              isInvalid={
                                passwordResetForm.errors.comfirmPassword &&
                                  passwordResetForm.touched.comfirmPassword
                                  ? true
                                  : false
                              }
                              required
                            />
                            <InputGroup.Text>
                              <i
                                onClick={togglePassword}
                                className={
                                  passwordShown ? "fas fa-eye-slash" : "fas fa-eye"
                                }
                              ></i>
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                          {passwordResetForm.errors.comfirmPassword}
                        </Form.Control.Feedback>
                        {/* Button */}

                      </Col>
                      {/* <Col lg={12} md={12} className="mb-3">
                        <Form.Check type="checkbox" id="check-api-checkbox">
                          <Form.Check.Input
                            type="checkbox"
                            onClick={togglePassword}
                          />
                          <Form.Check.Label>SHOW PASSWORD</Form.Check.Label>
                        </Form.Check>
                      </Col> */}
                      {formIsLoading ? (
                          <Button className="text-right btn btn-primary" size="md" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            &nbsp; Loading ...
                          </Button>
                        ) : (<Button type="submit" className="text-right btn btn-primary">  Save Password </Button>)}
                      
                    </div>
                  ) : (


                    <div>

                      <Col lg={12} md={12} className="mb-3">
                        {/*  email */}
                        <Form.Label> Emailkaaga</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={passwordResetForm.values.email}
                            onChange={passwordResetForm.handleChange}
                            onBlur={passwordResetForm.handleBlur}
                            placeholder="Fadlan Soo Gali Emailkaga"
                            isInvalid={
                              passwordResetForm.errors.email &&
                                passwordResetForm.touched.email
                                ? true
                                : false
                            }
                            isValid={passwordResetForm.values.email ?
                              passwordResetForm.errors.email &&
                                passwordResetForm.touched.email
                                ? false
                                : true
                              : false
                            }
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {passwordResetForm.errors.email}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col lg={6} md={6} className="mb-3 d-grid gap-2">
                        {/* Button */}
                        {sendedCode == 1 ? (
                          <Button variant="secondary" size="md" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            &nbsp; Loading Reset Code...
                          </Button>
                        ) : (<Button variant="secondary" onClick={sendResetPasswordCode} type="button"> Send Reset Link </Button>)}

                      </Col>
                      {sendedCode != 0 && sendedCode != 1 ? (
                        <Col lg={12} md={12} className="mb-3">
                          <p>
                            Fariin ayaa laguugu diray emailkan{" "}
                            <span className="text-success">
                              {passwordResetForm.values.email}
                            </span>
                          </p>
                          <Form.Group>
                            <Form.Label htmlFor="email">Codeka Hubinta</Form.Label>
                            <Form.Control
                              placeholder="00 00 00"
                              type="text"
                              id="activationCode"
                              name="activationCode"
                              value={passwordResetForm.values.activationCode}
                              onChange={passwordResetForm.handleChange}
                              onBlur={passwordResetForm.handleBlur}
                              isInvalid={
                                passwordResetForm.errors.activationCode &&
                                  passwordResetForm.touched.activationCode
                                  ? true
                                  : false
                              }
                              isValid={passwordResetForm.values.activationCode ?
                                passwordResetForm.errors.activationCode &&
                                  passwordResetForm.touched.activationCode
                                  ? false
                                  : true
                                : false
                              }
                              required
                            />
                            <Form.Control.Feedback type="valid">
                              waad ku guulaysatay activation codeka
                            </Form.Control.Feedback>

                            <Form.Control.Feedback type="invalid">
                              {passwordResetForm.errors.activationCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>) : (<div></div>)

                      }
                    </div>
                  )}
                </Row>
                <span>
                  Return to <Link to="/auth/login"> Sign in</Link>
                </span>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
