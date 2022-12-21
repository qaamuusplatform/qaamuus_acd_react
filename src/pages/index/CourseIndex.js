// import node module libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Col, Row, Container, Card, Image } from 'react-bootstrap';
import useSWR from 'swr';
import Slider from 'react-slick';

// import custom components
import HeroHeader from './HeroHeader';
import FeaturesList from './FeaturesList';
import allInternationalFriendData from 'data/AllInternationalFriends';
import CourseCard from 'components/cards/CourseCard';
import WorldClassInstructors from './WorldClassInstructors';
import TestimonialsSlider from './TestimonialsSlider';
import LogosTopHeading2 from 'components/clientlogos/LogosTopHeading2';
import LogoList1 from 'data/LogoList1';
import AboutUs from './AboutUs';
import { httpFetcher } from 'services/coursesService';
import { ShimmerPostItem } from 'react-shimmer-effects';
import AppIntegrationData from 'data/AppIntegrationData';
import InternationalFriends from './InternationalFriends';
import HeroVideos from './HeroVideos';

// import sub components

const CourseIndex = () => {

	const { data: popularCourses, error } = useSWR(`api/qaCourse-list/`, httpFetcher);
	// console.log(data);
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
			<FeaturesList />
			<AboutUs />

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
					<Row className="mb-8">
						<Col md={12}>
							{/*  Testimonial slider */}
							<TestimonialsSlider />
						</Col>
					</Row>
					<h2 className="mb-0 mx-2">fagaaraha aamuus</h2>
					<br />
					<InternationalFriends/>
					<LogosTopHeading2
						title="Loved by over 5 million users from companies like"
						logos={LogoList1}
						limit={0}
					/>
				</Container>
			</div>

		</Fragment>
	);
};

export default CourseIndex;
