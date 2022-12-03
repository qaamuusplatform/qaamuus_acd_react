// import node module libraries
import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";
import _const from "services/baseUrl";
// import custom components

import Ratings from "components/elements/common/ratings/Ratings";
const TestimonialCard = ({ item }) => {
  return (
    <Card className="border shadow-none">
      <Card.Header className="px-4 py-4">
        <div className="d-flex align-items-center">
          <Image
            src={_const.baseUrl + item.theUser.profileImage}
            alt=""
            className="avatar avatar-md rounded-circle"
          />
          <div className="ms-3">
            <h4 className="mb-0">{item.theUser.fullName}</h4>
            <p className="mb-0 small">{item.theUser.userTitle}</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-dark font-italic fw-medium mb-0">"{item.fText}"</p>
        <div className="mb-2">
          <span className="fs-4 text-warning">
            <Ratings rating={item.stars} />
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

// Typechecking With PropTypes
TestimonialCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TestimonialCard;
