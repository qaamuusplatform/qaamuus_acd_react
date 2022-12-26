// import node module libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Col, Row, Container, Card, Image } from 'react-bootstrap';
import useSWR from 'swr';
import Slider from 'react-slick';

// import custom components
import HeroHeader from './HeroHeader';
import allInternationalFriendData from 'data/AllInternationalFriends';
import CourseCard from 'components/cards/CourseCard';
import WorldClassInstructors from './WorldClassInstructors';
import TestimonialsSlider from './TestimonialsSlider';
import LogosTopHeading2 from 'components/clientlogos/LogosTopHeading2';
import LogoList1 from 'data/LogoList1';
import { httpFetcher } from 'services/coursesService';
import { ShimmerContentBlock, ShimmerPostItem } from 'react-shimmer-effects';
import AppIntegrationData from 'data/AppIntegrationData';
import InternationalFriends from './InternationalFriends';
import HeroVideos from './HeroVideos';
import EventCardFullWidth from 'components/cards/HeroEventCard';
import TopFeaturesList from './TopFeaturesList';
import HomeFeaturesList from './HomeFeaturesList';

// import sub components

const CourseIndex = () => {

	const { data: popularCourses, error } = useSWR(`api/qaCourse-list/`, httpFetcher);
	// console.log(data);
	const { data: events, error: eventError } = useSWR("api/qaEvent-list/", httpFetcher);
	const courseSliderSettings = {
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};
	const settings = {
		dots: true,
		speed: 500,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	};
	return (
		<Fragment>
			{/*  Page Content  */}
			<HeroHeader />

			{/*  Features list  */}
			<TopFeaturesList />
			<HomeFeaturesList />

			{/* <div className="pb-lg-3 pt-lg-3">
				<Container>
					<Row className="mb-4">
						<Col>
							<h2 className="mb-0 mx-2">Most Popular</h2>
						</Col>
					</Row>
					<div className="position-relative">
					</div>
				</Container>
			</div> */}


			<div className="pb-lg-8 pt-lg-3 py-6">
				<Container>
							<h3 className="mb-0 fw-w500">Event Comming son</h3>
					{!events && !eventError
						? [1].map((idx) => (
							<div>
								<ShimmerContentBlock
									title
									text
									cta
									thumbnailWidth={500}
									thumbnailHeight={500}
								/>
								<br></br>
							</div>
						))
						: null}
					{events
						?.filter((event) => event.heroEvent === true)
						.map((event, index) => (
							<Col xl={12} lg={12} md={12} sm={12} key={index}>
								<EventCardFullWidth event={event} />
							</Col>
						))}
					{/* <h2 className="mb-0 mx-2">Most Popular</h2> */}

					{/* <CourseSlider popular={true} /> */}
					{/* <div className="d-flex justify-content-between">
						<h2 className="mb-0 mx-2">Popular Courses</h2>
						<Link to="/courses/" className="btn btn-primary">
							See All Courses
						</Link>
					</div>

					<br></br> */}

					<div className="position-relative">
						<div className="mb-2 mt-4">
							<h3 className="mb-0 fw-w600">Coursooyinka</h3>
						</div>
						<Row>
							{!popularCourses && !error
								? [1, 2, 3, 4].map((idx) => (
									<Col lg={3} md={4} sm={12} key={idx}>
										<ShimmerPostItem card title text cta />
									</Col>
								))
								: null}
							{popularCourses?.map((course, idx) => (
								<Col lg={3} md={4} sm={12} key={idx}>
									<CourseCard
										item={course}
										showprogressbar={true}
										viewby="grid"
									/>
								</Col>
							))}
						</Row>

						{/* <Slider {...courseSliderSettings} className="pb-sm-5 mb-5 slick-slider-wrapper">
							{popularCourses && !error
								? [1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
									<div className="item px-md-1" key={idx}>
										<ShimmerPostItem card title text cta />
									</div>
								))
								: null}
							{popularCourses?.map((course, idx) => (
								<div className="item px-md-1" key={idx}>
									<CourseCard
										item={course}
										showprogressbar
										key={idx}
									/>
								</div>
							))}

						</Slider> */}
						{/* <HeroVideos/> */}
						{/* <h2 className="mb-0 mx-2">HERO EVENTS</h2> */}



						<WorldClassInstructors />
					</div>


					<br></br>
					{/* <br></br> */}
					<Row className="mb-4">
						<Col md={12}>
							{/*  Testimonial slider */}
							<TestimonialsSlider />
						</Col>
					</Row>
					<h3 className="mb-0 fw-w700">Saaxiibada Qaamuus</h3>
				
					<InternationalFriends />
					{/* <LogosTopHeading2
						title="Loved by over 5 million users from companies like"
						logos={LogoList1}
						limit={0}
					/> */}
				</Container>
			</div>

		</Fragment>
	);
};

export default CourseIndex;
