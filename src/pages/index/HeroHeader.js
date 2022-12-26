// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import { Col, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import media files
import HeroImage from 'assets/images/hero/hero-img.png';

const HeroHeader = () => {
	return (
		<div className="bg-primary">
			<Container>
				{/*  Hero Section  */}
				<Row className="align-items-center g-0">
					<Col xl={5} lg={6} md={12}>
						<div className="py-5 py-lg-0">
							<h1 className="text-white display-4 fw-bold">
								QAAMUUS ACADEMY
							</h1>
							<p className="text-white-50 mb-4 lead">
							Akaademiyadda Qaamuus: waa goob waxbarasho oo ku shaqaysa hab elektarooni ah, kuna baxaysa si fogaan dhigad ah 
							</p>
							<Link
								to="/events/"
								className="btn btn-success"
							>
								Webinaradeena
							</Link>{' '}
							<Link to="/nagu-saabsan/" className="btn btn-white">
								Nagu-saabsan
							</Link>
						</div>
					</Col>
					<Col xl={7} lg={6} md={12} className="text-lg-end text-center">
						<Image src={HeroImage} alt="" className="img-fluid" />
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default HeroHeader;
