// import node module libraries
import { Link, withRouter } from "react-router-dom";
import { Badge, Card, Col, Row } from "react-bootstrap";
// import custom components
import ProfileLayout from "layouts/ProfileLayout";
import { useContext, useState } from "react";
import { CurrentUserContext } from "services/currentUserContext";
import StatTopIcon from "components/marketing/common/stats/StatTopIcon";

const ReferralMoney = (props) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const account = props.location.pathname.substring(21, 11);

  return (
    <ProfileLayout>
      <Row>
      
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="Haraagaaga"
            value="$3,800"
            iconName="shopping-bag"
            colorVariant="danger"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12} className="mb-4 mb-lg-0">
          <StatTopIcon
            title="La Baxday"
            value="$3,210"
            iconName="folder"
            colorVariant="primary"
            progress={65}
          />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <StatTopIcon
            title="Dadka U"
            value="10,800"
            iconName="shopping-bag"
            colorVariant="warning"
            progress={65}
          />
        </Col>
      </Row>
      <br></br>
      <Card className="mb-4 pb-1">
        <Card.Header className="border-0 ">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Dadka Ku iibsaday </h3>
            <p className="mb-0">
              You have full control to manage your own account setting.
            </p>
          </div>
        </Card.Header>
      </Card>
      <Card className="mb-4 pb-1">
        <Card.Header className="border-0 ">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Dhaqdhaqayada</h3>
            <p className="mb-0">
              You have full control to manage your own account setting.
            </p>
          </div>
        </Card.Header>
      </Card>
    </ProfileLayout>
  );
};

export default withRouter(ReferralMoney);
