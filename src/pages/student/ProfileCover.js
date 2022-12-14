// import node module libraries
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components

// import media files
import CheckedMark from "assets/images/svg/checked-mark.svg";
import ProfileBackground from "assets/images/background/profile-bg.jpg";
import LevelIconWithTooltip from "./miscellaneous/LevelIconWithTooltip";
import baseUrl from "services/baseUrl";

const ProfileCover = ({ dashboardData, isDashboard }) => {
  return (
    <Row className="align-items-center">
      <Col xl={12} lg={12} md={12} sm={12}>
        {/* <!-- Bg --> */}
        <div
          className="pt-16 rounded-top-md"
          style={{
            background: `url(${ProfileBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {" "}
        </div>
        <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
          <div className="d-flex align-items-center">
            <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
              
              <Image
              src={dashboardData.profileImage?  dashboardData.profileImage:`https://ui-avatars.com/api/?name=${dashboardData.fullName}&background=19a9c4&color=fff&bold=true`}
                className="avatar-xl rounded-circle border border-4 border-white position-relative"
                alt=""
              />
              {dashboardData.verified ? (
                <Link
                  to="#"
                  className="position-absolute top-0 end-0"
                  data-bs-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Verified"
                >
                  <Image src={CheckedMark} alt="" height="30" width="30" />
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="lh-1">
              <h2 className="mb-0">
                {dashboardData.fullName}{" "}
                <LevelIconWithTooltip level={dashboardData.level} />{" "}
              </h2>
              <p className="mb-0 d-block">{dashboardData.userTitle}</p>
            </div>
          </div>
          <div>
            {isDashboard ? (
              <Link
                to={"/user/edit-profile/"}
                className={`btn btn${
                  "dashboardData.outlinebutton" ? "-outline" : ""
                }-primary btn-sm  d-md-block`}
              >
                Account Setting
              </Link>
            ) : (
              <Link
                to={"/user/dashboard/"}
                className={`btn btn${
                  "dashboardData.outlinebutton" ? "-outline" : ""
                }-primary btn-sm  d-md-block`}
              >
                Q Dashboard
              </Link>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileCover;
