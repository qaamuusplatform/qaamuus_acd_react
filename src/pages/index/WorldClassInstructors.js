// import node module libraries
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

// import custom components
// import sub components
import InstructorCard from 'components/cards/InstructorCard';
// import data files
import { InstructorsList } from 'data/allInstructorsData';

const WorldClassInstructors = () => {
	const title = 'Classes Taught by Industry Expert';
	const subtitle = 'World-class Instructors';
	const description = `Geeks teachers are icons, experts, and industry rock stars excited to share their experience, wisdom, and trusted tools with you.`;

	const isLaptop = useMediaQuery({ minWidth: 1024, maxWidth: 1445 });

	return (

		// <div className="py-8 py-lg-16 bg-light-gradient-top bg-white"></div>
		<div className="">
			{/* <h2 className="mb-0 mx-2">Popular Courses</h2> */}
			<br></br>
			<Row>
				{InstructorsList.map((item, index) => (
					<Col
						key={index}
						xl={3}
						lg={4}
						md={6}
						sm={12}
						className={`${isLaptop && index === 3 ? 'd-lg-none d-xl-block' : ''
							}`}
					>
						<InstructorCard item={item} />
					</Col>
				))}
			</Row>
			<div className="d-flex justify-content-between">
				<h2 className="mb-0 mx-2"> </h2>
				<Link to="/courses/" className="btn btn-secondary">
				See All Instructors
				</Link>
			</div>
			

		</div>
	);
};

export default WorldClassInstructors;
