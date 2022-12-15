// import node module libraries
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import http from "services/httpService"
import {
  Col,
  Alert,
  Row,
  Card,
  Form,
  Button,
  Spinner, InputGroup,
  Image,
  Modal,
} from "react-bootstrap";

import ProfileBackground from 'assets/images/background/profile-bg.jpg';
import { toast } from "react-toastify";
export default function SignUp() {
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); setFormIsLoading(false); };
  const handleShow = () => setShow(true);

  
  const [sendedCodeActive, setSendedCodeActive] = useState(false);
  const [activationCode, setActivationCode] = useState(0);
  const [passwordShown, setPasswordShown] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [regsitringUserData, setRegsitringUserData] = useState({
    "email": "",
    "username": "",
    "password": "",
    "fullName": ""
  })
  const [userNameIsExist, setUserNameIsExist] = useState(false);
  const [emailIsExist, setEmailIsExist] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [usernameValid, setUsernameValid] = useState('Usernamka ugu yaraan 6');
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = async ({ target }) => {
    const { value, name } = target;
    if (name == 'username') {
      if (value.length > 6) {
        setUserNameIsExist(await (await http.get("/api/checkingUserExist/" + value + '/')).data.isExist)
        if (userNameIsExist) {
          setUsernameValid('Usernamkan wa la qabsaday');
        } else {
          setRegsitringUserData(prev => ({ ...prev, [name]: value }))
        }
      } else {
        setUsernameValid('Usernamka ugu yaraan 6');
        setUserNameIsExist(true);
      }
    } else if (name == 'email') {
      setEmailIsExist(await (await http.get("/api/checkingEmailExist/" + value + '/')).data.isExist)
      if (!setEmailIsExist) {
        setRegsitringUserData(prev => ({ ...prev, [name]: value }))
      }
      setRegsitringUserData(prev => ({ ...prev, [name]: value }))
    }
    else {
      setRegsitringUserData(prev => ({ ...prev, [name]: value }))
    }
  };



  async function userActivateHandleSubmit(e) {
    e.preventDefault();
    if((parseInt(e.target.elements.activateCode.value)-(regsitringUserData.email.length)) == parseInt(activationCode)){
      setEmailVerified(true)
      setSendedCodeActive(false)
      setShow(false)
      registerUserFun();
    }else{
      console.log('eeee')

    }
  }
  async function userJoinHandleSubmit(e) {
    setFormIsLoading(true);
    // setUserRegistred(false);
    e.preventDefault();
    registerUserFun();

    

  }
  async function registerUserFun() {
    setFormIsLoading(true);
    if (regsitringUserData.username != null && regsitringUserData.email != null) {
      if (emailVerified) {
        await http.post("/api/userProfile-create/", regsitringUserData, { headers: { 'Content-Type': 'application/json' } })
          .then((userProfileResp) => {
            console.log(userProfileResp)
            setFormIsLoading(false);
            // setUserRegistred(true);
            // return Redirect("/user/dashboard");
          });

      } else {
        http.get(`api/sendActivationEmailCode/${regsitringUserData.email}/`).then((resp) => {
          setActivationCode(resp.data.sendedCode)
        })
        setShow(true)
      }
    } else {
      toast.error("Fadlan iska hubi emailka ama usernameka")
      setFormIsLoading(false);
    }
  }
  return (
    <Fragment >
      <Modal show={show} onHide={handleClose} centered>
        <Form  onSubmit={userActivateHandleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Hubinta Emailka</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col lg={12} md={12} sm={12} className="mb-3">
              <h4 className="mb-0">Email Address</h4>
              <p>
                Fariin ayaa laguugu diray emailkan {' '}
                <span className="text-success">{regsitringUserData.email}</span>
              </p>
              <Form.Group>
                <Form.Label htmlFor="email">Codeka Hubinta</Form.Label>
                <Form.Control 
                placeholder="21 12 12" 
                type="number" 
                id="activateCode" 
                isInvalid={sendedCodeActive == true ? true : false}
                isValid={sendedCodeActive == true ? false : true}
                required />
              </Form.Group>

            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" size="sm">
              Active Now
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <br />
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={10} md={12} className="py-8 py-xl-0">
          <Card>
            <Card.Img variant="top" src={ProfileBackground} />
            <Card.Body className="p-6">


              {/* Form */}
              <Form onSubmit={userJoinHandleSubmit} controlId="validationFormik01">
                <Row>

                  <Col lg={8} md={8} className="mb-3">
                    {/* User Name */}
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="fullName"
                      onChange={handleChange}
                      size="sm"
                      name="fullName"
                      placeholder="Full Name"
                      required
                    />
                  </Col>
                  <Col lg={4} md={4} className="mb-3">
                    {/* User Name */}
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        id="username"
                        size="sm"
                        onChange={handleChange}
                        name="username"
                        isInvalid={userNameIsExist == true ? true : false}
                        isValid={userNameIsExist == true ? false : true}
                        placeholder="Username auth"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {usernameValid}
                      </Form.Control.Feedback>
                    </InputGroup>
                    {/* <Form.Label id="usernameIsValid" >Email </Form.Label> */}
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* email */}
                    <Form.Label>Email </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChange}
                        isInvalid={emailIsExist == true ? true : false}
                        isValid={emailIsExist == true ? false : true}
                        id="email"
                        size="sm"
                        placeholder="Email address here"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {emailIsExist ? ("Emailkan horay ayuu u jiray") : ("")}
                      </Form.Control.Feedback>
                    </InputGroup>

                  </Col>
                  {/* <Col lg={3} md={3} className="mb-3">
                    <Form.Label style={{ "color": "white" }} className="sm-none" >Email </Form.Label>
                    <br></br>
                    <Button variant="warning" style={{ "color": "white" }} onClick={handleShow} type="button" size="sm"> HUBI EMAILKA </Button>
                  </Col> */}
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={handleChange}
                      size="sm"
                      placeholder="**************"
                      required
                    />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    {/* Password */}
                    <Form.Label>Comfirm password </Form.Label>
                    <Form.Control
                      type={passwordShown ? "text" : "password"}
                      name="comfirmPassword"
                      id="password"
                      size="sm"
                      placeholder="**************"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    {/* Checkbox */}
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input
                        type="checkbox"
                        onClick={togglePassword}
                      />
                      <Form.Check.Label>SHOW PASSWORD</Form.Check.Label>
                    </Form.Check>
                  </Col>
                </Row>
                {formIsLoading ? (
                  <Button variant="primary" size="sm" disabled>
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
                  <Button variant="primary" type="submit" size="md"> Diiwaangali </Button>
                )}

              </Form>
              <hr className="my-4" />
              <div className="mt-4 text-center">
                {/* Facebook */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-facebook"
                >
                  <i className="fab fa-facebook"></i>
                </Link>{" "}
                {/* Twitter */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>{" "}
                {/* LinkedIn */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>{" "}
                {/* GitHub */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-github"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
