// import node module libraries
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap';

const CertificateCard = ({ item }) => {
	return (
		<Card className="mb-4 card-hover">
			<div className="d-flex justify-content-between align-items-center p-4">
				<div className="d-flex">
					<Link to="#">
						<Image src="https://www.iconpacks.net/icons/1/free-certificate-icon-1356-thumb.png" alt="" className="avatar-md" />
					</Link>
					<div className="ms-3">
						<h4 className="mb-1">
							<Link
								to="#"
								className="text-inherit"
							>
								{item.certificateName}
							</Link>
						</h4>
						<p className="mb-0 fs-6">
							<span className="me-2">
								<span className="text-dark fw-medium">{item.certificateDate} </span>
								Courses
							</span>
							<span>
								<span className="text-dark fw-medium">{item.certificateDate} </span>
								Hours
							</span>
						</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

// Typechecking With PropTypes
CertificateCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default CertificateCard;
