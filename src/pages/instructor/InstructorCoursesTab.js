// import node module libraries
import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ShimmerPostItem } from 'react-shimmer-effects';
import useSWR from 'swr';
import InstructorCourseCard from './InstructorCourseCard';

// import custom components
// import data files

const InstructorCoursesTab = ({ instructorInfo }) => {
	console.log(instructorInfo.instructorCourses)


	return (
		<Fragment className='bg-black'>
			<Row>
				<Col lg={12}>
					<div className="mb-2">
						{/* <h2 className="mb-1">Beginner</h2> */}
						{/* <p>
							Learn Bootstrap tutorial for beginners with there easy components
							and utility.
						</p> */}
					</div>
				</Col>
			</Row>
			<Row>
				{!instructorInfo.instructorCourses
					? [1, 2, 3].map((idx) => (
						<Col lg={4} md={4} sm={12} key={idx}>
							<ShimmerPostItem card title text cta />
						</Col>
					))
					: (instructorInfo.instructorCourses.map((item, index) => (
							<Col lg={3} md={6} sm={12} key={index}>
								<InstructorCourseCard item={item} />
							</Col>
						))
					)}

			</Row>
			<hr className="my-5" />
			{/* Intermediate Courses */}
			{/* <Row>
				<Col lg={12} md={12} sm={12}>
					<div className="mb-5">
						<h2 className="mb-1">Intermediate</h2>
						<p>Learn Bootstrap tutorial for Intermediat with node modules.</p>
					</div>
				</Col>
			</Row>
			<Row>
				{instructorCourses.map((item, index) => (
					<Col lg={3} md={6} sm={12} key={index}>
						<CourseCard item={item} />
					</Col>
				))}
			</Row> */}
			{/* Advance Courses */}


		</Fragment>
	);
};
export default InstructorCoursesTab;
