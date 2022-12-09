// import node module libraries
import { Col, Row, Card, Image } from 'react-bootstrap';

// import media files
const AboutTab = ({ aboutUs }) => {
	console.log(aboutUs)
	return (
		<Row>
			<Col lg={12} md={12} sm={12}>
				{/* Card */}
				<Card>
					<Card.Header>
						<h3 className="mb-0">About Path</h3>
					</Card.Header>
					<Card.Body>
						{aboutUs?.aboutMe}
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
