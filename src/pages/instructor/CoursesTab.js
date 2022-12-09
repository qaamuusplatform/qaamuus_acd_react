// import node module libraries
import CourseCard from 'components/cards/CourseCard';
import AllCoursesData from 'data/AllCoursesData';
import { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import { httpFetcher } from 'services/coursesService';
import useSWR from 'swr';

// import custom components
// import data files

const CoursesTab = ({ instructorInfo }) => {
	
    const { data: instructorCourses, error } = useSWR(`/api/qaCourse-list/`, httpFetcher);
	if(!instructorCourses && !error){
		console.log('loading')
		return <div>loading</div> 
	}
	return (
		<Fragment className='bg-black'>
			<Row>
				<Col lg={12}>
					<div className="mb-5">
						<h2 className="mb-1">Beginner</h2>
						<p>
							Learn Bootstrap tutorial for beginners with there easy components
							and utility.
						</p>
					</div>
				</Col>
			</Row>
			<Row>
				{instructorCourses.map((item, index) => (
					<Col lg={3} md={6} sm={12} key={index}>
						<CourseCard item={item} />
					</Col>
				))}
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
export default CoursesTab;
