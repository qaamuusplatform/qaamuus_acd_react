// import node module libraries
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import custom components

// import media files
import CheckedMark from 'assets/images/svg/checked-mark.svg';
import ProfileBackground from 'assets/images/background/profile-bg.jpg';
import LevelIconWithTooltip from './miscellaneous/LevelIconWithTooltip';
import baseUrl from 'services/baseUrl';

const ProfileCover = ({ dashboardData, isDashboard }) => {
	return (
		<Row className="align-items-center">
			<Col xl={12} lg={12} md={12} sm={12}>
				{/* <!-- Bg --> */}
				<div
					className="pt-16 rounded-top-md"
					style={{
						background: `url(${ProfileBackground})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}
				>
					{' '}
				</div>
				<div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
					<div className="d-flex align-items-center">
						<div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
							<Image
								src={baseUrl.baseUrl + dashboardData.profileImage}
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
								''
							)}
						</div>
						<div className="lh-1">
							<h2 className="mb-0">
								{dashboardData.fullName}{' '}
								<LevelIconWithTooltip level={dashboardData.level} />{' '}
							</h2>
							<p className="mb-0 d-block">{dashboardData.number}</p>
						</div>
					</div>
					<div>
						{isDashboard ? (<Link
							to={'/student/edit-profile/'}
							className={`btn btn${'dashboardData.outlinebutton' ? '-outline' : ''
								}-primary btn-sm d-none d-md-block`}
						>
							Account Setting
						</Link>) : (
							<Link
								to={'/student/dashboard/'}
								className={`btn btn${'dashboardData.outlinebutton' ? '-outline' : ''
									}-primary btn-sm d-none d-md-block`}
							>
							  Q	Dashboard
							</Link>
						)}

					</div>
				</div>
			</Col>
		</Row>
	);
};
ProfileCover.defaultProps = {
	isDashboard: false
};

ProfileCover.propTypes = {
	isDashboard: PropTypes.bool
};
export default ProfileCover;
