// import node module libraries
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Col, Row, Tab, Card, Container, Nav } from 'react-bootstrap';

// import profile layout wrapper
import ProfileLayout from 'layouts/ProfileLayout';
import { useContext, useState } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';

import CoursesTable from './CoursesTable';
import useSWR from 'swr';
import http from 'services/httpService';
import { ShimmerContentBlock } from 'react-shimmer-effects';
import { httpFetcher } from 'services/coursesService';

const EnrolledCourses = (props) => {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const account = props.location.pathname.substring(21, 11);
	const { data: enrolledCoursesDetail, error } = useSWR(`api/userEnrollments-detail/${currentUser.id}/`,httpFetcher);
	return (
		<ProfileLayout>
			{account === 'instructor'}

			<Card className="border-0">
				<Card.Header className="border-bottom-0 p-0 bg-white">

				</Card.Header>
				<Card.Body className="p-0">

					{enrolledCoursesDetail ?  (<CoursesTable courses_data={enrolledCoursesDetail.enrolledCourses} />):(
						<ShimmerContentBlock
							title
							text
							cta
							thumbnailWidth={370}
							thumbnailHeight={370}
						/>) }
			

				</Card.Body>
			</Card>

		</ProfileLayout>
	);
};

export default withRouter(EnrolledCourses);
