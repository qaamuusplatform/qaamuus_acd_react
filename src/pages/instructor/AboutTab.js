// import node module libraries
import CertificateCard from "components/cards/CertificateCard";
import InstructorData from "data/InstructorData";
import { Col, Row, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
const AboutTab = ({ instructorInfo }) => {
  console.log(instructorInfo);
  return (
    <Row>
      <Col lg={4} md={5} sm={12}>
	  <Card.Header>
            <h3 className="mb-0">Shahaadooyinka</h3>
          </Card.Header>
	  {instructorInfo.theCertifications?.map((theCertificate, idx) => (
              <CertificateCard item={theCertificate} />
            ))}
        
        <Card className="border-0 mb-4">
          {/* Card body */}

          <Card.Body>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h4 className="mb-0 fw-bold">{InstructorData[1].courses}</h4>
                <p className="fs-6 mb-0">Coursoyinka</p>
              </div>
              <div>
                <span>
                  <i className="fe fe-file-text fs-3"></i>
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h4 className="mb-0 fw-bold">{InstructorData[1].students}</h4>
                <p className="fs-6 mb-0">Ardada Iibsatay</p>
              </div>
              <div>
                <span>
                  <i className="fe fe-users fs-3"></i>
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h4 className="mb-0 fw-bold">{InstructorData[1].reviews}</h4>
                <p className="fs-6 mb-0">Codbixinta</p>
              </div>
              <div>
                <span>
                  <i className="fe fe-star fs-3"></i>
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={8} md={7} sm={12}>
        {/* Card */}
        <Card>
          <Card.Header>
            <h3 className="mb-0">About Path</h3>
          </Card.Header>
          <Card.Body>
            {instructorInfo?.aboutMe}
            {/* Blockquote */}
            {/* <blockquote className="blockquote-left ">
							<p className="mb-4 font-italic ms-4">
								Blockquote. Lorem ipsum dolor sit amet, consectetur adipiscing
								elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a
								est eget ligula molestie gravida. Curabitur massa. Donec
								eleifend, libero at sagittis mollis, tellus est malesuada
								tellus, at luctus turpis elit sit amet quam. Vivamus pretium
								ornare est
							</p>
							<footer className="blockquote-footer ms-4">Andrew Watkins</footer>
						</blockquote> */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default AboutTab;
