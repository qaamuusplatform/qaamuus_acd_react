// import node module libraries
import { Link, withRouter } from "react-router-dom";
import { Badge, Button, Card, Col, Modal, OverlayTrigger, Popover, Row } from "react-bootstrap";
// import custom components
import ProfileLayout from "layouts/ProfileLayout";
import { useContext, useState } from "react";
import { CurrentUserContext } from "services/currentUserContext";
import StatTopIcon from "components/marketing/common/stats/StatTopIcon";
import StatRightCenterIcon from "components/elements/common/StatRightCenterIcon";
import TransactionsMoney from "./transactionsMoney";
import { httpFetcher } from "services/coursesService";
import useSWR from "swr";
import { ShimmerBadge } from "react-shimmer-effects";

const ReferralMoney = (props) => {
  const { currentUser, setCurrentUser, userIsLoading } = useContext(CurrentUserContext);
  const { data: transactionsData, error } = useSWR(`/api/thisUserReferralTransaction-list/${currentUser.id}/`, httpFetcher);
  const account = props.location.pathname.substring(21, 11);
  const [mdShow, setMdShow] = useState(false);

  return (
    <ProfileLayout>
      <Modal show={mdShow} onHide={() => setMdShow(false)} aria-labelledby="example-modal-sizes-title-lg" >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Row>

        <Col lg={12} md={12} sm={12} className="mb-4 mb-lg-0">
          <Card>
            <Card.Header className="card-header d-flex justify-content-between">
              <h4 className="mb-0">Referral-Money Budget</h4>
              {currentUser.refBalance == 10 ? (
                <Button variant="btn-outline-secondary" onClick={() => setMdShow(true)} className="btn btn-sm btn-outline-secondary">
                  Lacag Labixista
                </Button>
              ) : (
                <OverlayTrigger trigger="click" placement="right" overlay={(
                  <Popover>
                    <Popover.Header as="h3">Fadlan Buuxi Shardigan</Popover.Header>
                    <Popover.Body>
                      Lacag bixinta waxaa u yar <strong>$10</strong>
                    </Popover.Body>
                  </Popover>
                )}>
                  <Button variant="btn-outline-secondary" className="btn btn-sm btn-outline-secondary">Lacag Labixista</Button>
                </OverlayTrigger>
              )}



            </Card.Header>
            {/* {(!transactionsData && !error) || userIsLoading
							? (<div>dsa</div>)
							:<div>dsa</div>   )} */}
            {(!transactionsData && !error) || userIsLoading ? (
              <Row className="m-2">
                <Col lg={4} md={12} xs={12}>
                  <ShimmerBadge width={150} />
                </Col>

                <Col lg={4} md={12} xs={12} className="border-start-md">
                  <ShimmerBadge width={150} />
                </Col>
                <Col lg={4} md={12} xs={12} className="border-start-md">
                  <ShimmerBadge width={150} />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col lg={4} md={12} xs={12}>
                  <StatRightCenterIcon
                    title="Haraagaaga"
                    value={`$${currentUser.refBalance}`}
                    iconName="dollar-sign"
                    iconColorVariant="primary"
                  />
                </Col>

                <Col lg={4} md={12} xs={12} className="border-start-md">
                  <StatRightCenterIcon
                    title="La Baxday"
                    value={`$${currentUser.refWithdraw}`}
                    iconName="pie-chart"
                    iconColorVariant="success"
                  />
                </Col>
                <Col lg={4} md={12} xs={12} className="border-start-md">
                  <StatRightCenterIcon
                    title="Tirada Iibsadayasha"
                    value={transactionsData?.length}
                    iconName="shopping-cart"
                    iconColorVariant="danger"
                  />
                </Col>
              </Row>
            )}




          </Card>
        </Col>

      </Row>
      <br></br>
      <TransactionsMoney />
      <br></br>
      {/* <Card className="mb-4 pb-1">
        <Card.Header className="border-0 ">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Dhaqdhaqayada</h3>
            <p className="mb-0">
              You have full control to manage your own account setting.
            </p>
          </div>
        </Card.Header>
      </Card> */}
    </ProfileLayout >
  );
};

export default withRouter(ReferralMoney);
