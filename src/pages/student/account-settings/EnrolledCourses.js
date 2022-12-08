// import node module libraries
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Col, Row, Tab, Card, Container, Nav } from 'react-bootstrap';

// import profile layout wrapper
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext, useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import {
	allcourses,
	allapprovedcourses,
	allpendingcourses
} from 'data/enrolledCourses';
import CoursesTable from './CoursesTable';
import useSWR from 'swr';
import http from 'services/httpService';
import { ShimmerContentBlock } from 'react-shimmer-effects';

const EnrolledCourses = (props) => {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);

	const { data, error } = useSWR('/api/userEnrollments-detail/14/', async (url) => await http.get(url).then(r => r.data.enrolledCourses));
	// console.log(data);
	// console.log(allcourses);
	return (
		<ProfileLayout>
			{account === 'instructor'}

			<Card className="border-0">
				<Card.Header className="border-bottom-0 p-0 bg-white">

				</Card.Header>
				<Card.Body className="p-0">

					{data == null ? (
						<ShimmerContentBlock
							title
							text
							cta
							thumbnailWidth={370}
							thumbnailHeight={370}
						/>) : (<CoursesTable courses_data={data} />)}
					{/*  */}

				</Card.Body>
			</Card>

		</ProfileLayout>
	);
};

export default withRouter(EnrolledCourses);
