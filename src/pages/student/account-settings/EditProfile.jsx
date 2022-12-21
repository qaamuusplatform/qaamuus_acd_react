// import node module libraries
import { withRouter } from "react-router-dom";
import { Card, Form, Row, Col, Button, Image, InputGroup, FormControl, Container } from "react-bootstrap";

// import custom components
import FormSelect from "components/elements/custom/FormSelect";
import { FlatPickr } from "components/elements/custom/FlatPickr";

// import media files
import Avatar3 from "assets/images/avatar/avatar-3.jpg";

// import profile layout wrapper
import ProfileLayout from "layouts/ProfileLayout";
import { Fragment, useContext, useState } from "react";
import { CurrentUserContext } from "services/currentUserContext";
import baseUrl from "services/baseUrl";
import { updateUserInfo } from "services/authService";
import 'react-phone-number-input/style.css'
// import PhoneInputWithCountrySelect from "react-phone-number-input";
import { ShimmerPostDetails, ShimmerThumbnail } from "react-shimmer-effects";
import { toast } from "react-toastify";
import ReactQuillEditor from "components/editor/ReactQuillEditor";
import ReactQuill from "react-quill";

const EditProfile = (props) => {

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [aboutMe, setAboutMe] = useState('sda' )
  const [userNumber, setUserNumber] = useState();

  if (Object.keys(currentUser).length == 0) {
    return <Fragment>
      <Card className="p-lg-2 pt-2 pt-lg-0 rounded-0 border-0">
        <Container>
          <br />
          <ShimmerThumbnail height={100} rounded />
          <ShimmerPostDetails card cta variant="EDITOR" />
          <br></br>
        </Container>
      </Card>
    </Fragment>;
  }
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  function handleaboutMe(value) {
		setAboutMe(value);
    setCurrentUser((prev) => ({ ...prev, ["aboutMe"]: value }));
    console.log(currentUser)
	}

  async function userUpdateHandleSubmit(e) {
    e.preventDefault();
    const userData = new FormData(e.target);
    updateUserInfo(userData, currentUser.id).then((e) => {
      toast.success("Waad Ku guulaysatay Xog badallida")
    });
  }
  const account = props.location.pathname.substring(21, 11);
  // const statelist = [
  //   { value: "1", label: "Gujarat" },
  //   { value: "2", label: "Rajasthan" },
  //   { value: "3", label: "Maharashtra" },
  // ];
  return (
    <ProfileLayout>
      {account === "instructor"}
      <Card className="border-0">
        {/* <Card.Header>
					<div className="mb-3 mb-lg-0">
						<h3 className="mb-0">Profile Details</h3>
						<p className="mb-0">
							You have full control to manage your own account setting.
						</p>
					</div>
				</Card.Header> */}
        <Card.Body>
          <div className="d-lg-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center mb-4 mb-lg-0">
              <Image
              src={currentUser.profileImage? baseUrl.baseUrl + currentUser.profileImage:`https://ui-avatars.com/api/?name=${currentUser.fullName}&background=19a9c4&color=fff`}

                id="img-uploaded"
                className="avatar-xl rounded-circle"
                alt=""
              />
              <div className="ms-3">
                <h4 className="mb-0">{currentUser.fullName}</h4>
                <p className="mb-0">{currentUser.userTitle}</p>
              </div>
            </div>
            <div>
              <Button variant="outline-white" size="sm">
                Update
              </Button>{" "}
              <Button variant="outline-danger" size="sm">
                Delete
              </Button>
            </div>
          </div>
          <hr className="my-5" />
          <div>
            <h4 className="mb-0">Personal Details</h4>
            <p className="mb-4">Edit your personal information and address.</p>
            {/* Form */}
            <Form onSubmit={userUpdateHandleSubmit}>
              <Row>
                {/* First name */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Magaca Shaqsiga</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Magaca oo seddexan"
                      required
                      name="fullName"
                      onChange={(e) => handleChange(e)}
                      value={currentUser.fullName}
                    />
                  </Form.Group>
                </Col>

                {/* Last name */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Titlekaga</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Title"
                      required
                      name="userTitle"
                      onChange={(e) => handleChange(e)}
                      value={currentUser.userTitle}
                    />
                  </Form.Group>
                </Col>

                {/* Phone */}
                <Col md={9} sm={9} className="mb-3">

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Number</Form.Label>
                    {/* <PhoneInputWithCountrySelect
                      placeholder="Enter phone number"
                      value={userNumber}
                      className="form-control"
                      defaultCountry="SO"

                      onChange={setUserNumber} /> */}
                    {/* <Form.Control
                      type="number"
                      placeholder="Phone"
                      name="number"
                      required
                      value={currentUser.number}
                    /> */}
                  </Form.Group>
                </Col>
                <Col md={3} sm={3} className="mb-3">
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label> </Form.Label>
                    <br></br>
                    <Button variant="secondary" className="sm" type="nutton">
                      HUBI NUMBERKA
                    </Button>
                  </Form.Group>
                </Col>

                {/* Birthday */}
                {/* <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      as={FlatPickr}
                      value={""}
                      placeholder="Date of Birth"
                      required
                    />
                  </Form.Group>
                </Col> */}

                {/* Address Line 1 */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Magalada</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Magaalada Aad Joogto"
                      required
                      name="city"
                      onChange={(e) => handleChange(e)}
                      value={currentUser.city}
                    />
                  </Form.Group>
                </Col>

                {/* Address Line 2 */}
                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>Referral Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentUser.referralCode}
                      placeholder="Reffral Codekaga"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={12} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formBirthday">
                    <Form.Label>About U</Form.Label>
                    {/* <InputGroup> */}
                    <ReactQuill value={aboutMe} onChange={handleaboutMe} />
                      {/* <FormControl onChange={(e) => handleChange(e)} value={currentUser.aboutMe} name="aboutMe" as="textarea" placeholder="Xog Ku Saabsan Userka" aria-label="With textarea" /> */}
                    {/* </InputGroup> */}
                  </Form.Group>
                </Col>
                {(currentUser.userType.name == 'Instructor') ? (<div>
                  <Col md={12} sm={12} className="mb-3">
                    <Form.Group className="mb-3" controlId="formBirthday">
                      <Form.Label>Facebook Url</Form.Label>
                      <Form.Control
                        type="text"
                        name="facebook_link"
                        onChange={(e) => handleChange(e)}
                        value={currentUser.facebook_link}
                        placeholder="Facebook Profile link"

                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} sm={12} className="mb-3">
                    <Form.Group className="mb-3" controlId="formBirthday">
                      <Form.Label>Twitter Url</Form.Label>
                      <Form.Control
                        type="text"
                        name="twitter_link"
                        onChange={(e) => handleChange(e)}
                        value={currentUser.twitter_link}
                        placeholder="Twiter Profile link"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} sm={12} className="mb-3">
                    <Form.Group className="mb-3" controlId="formBirthday">
                      <Form.Label>Linkiga Seddexaad</Form.Label>
                      <Form.Control
                        type="text"
                        name="third_link"
                        onChange={(e) => handleChange(e)}
                        value={currentUser.third_link}
                        placeholder="Third link"
                      />
                    </Form.Group>
                  </Col>
                </div>) : (<div>

                </div>)}


                {/* State */}
                {/* <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formState">
                    <Form.Label>State</Form.Label>
                    <FormSelect options={statelist} />
                  </Form.Group>
                </Col>

                <Col md={6} sm={12} className="mb-3">
                  <Form.Group className="mb-3" controlId="formState">
                    <Form.Label>Country</Form.Label>
                    <FormSelect options={countrylist} />
                  </Form.Group>
                </Col> */}

                {/* Button */}
                <Col sm={12} md={12}>
                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </ProfileLayout>
  );
};

export default withRouter(EditProfile);
