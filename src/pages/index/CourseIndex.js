// import node module libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import useSWR from 'swr';
import http from 'services/httpService';
import Slider from 'react-slick';

// import custom components
import HeroHeader from './HeroHeader';
import FeaturesList from './FeaturesList';
import allInternationalFriendData from 'data/AllInternationalFriends';
import AllCoursesData from 'data/AllCoursesData';
import CourseCard from 'components/cards/CourseCard';
import WorldClassInstructors from './WorldClassInstructors';
import TestimonialsSlider from './TestimonialsSlider';
import LogosTopHeading2 from 'components/clientlogos/LogosTopHeading2';
import LogoList1 from 'data/LogoList1';
import AboutUs from './AboutUs';
import axios from 'axios';

// import sub components

const CourseIndex = () => {

	// const {data,error} = useSWR('/api/ourInternationalFriends-list/',async (url)=>await axios(url).then(r=>r.data));
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
			<AboutUs/>

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
					<br />
					<Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
						{allInternationalFriendData.map((item, index) => {
							return (
								<Card className="item px-md-1" key={index}>
									<Card.Img variant="top" src={item.image} />
								</Card>
							)

						})}

					</Slider>
					{/* <CourseSlider popular={true} /> */}
					<div className="d-flex justify-content-between">
						<h2 className="mb-0 mx-2">Popular Courses</h2>
						<Link to="/courses/" className="btn btn-primary">
							See All Courses
						</Link>
					</div>

					<br></br>
					<div className="position-relative">

						<Slider {...courseSliderSettings} className="pb-sm-5 mb-5 slick-slider-wrapper">

							{AllCoursesData.map((item, index) => (
								<div className="item px-md-1" key={item.id}>
									{/* <CourseCard key={index} item={item} extraclass="mx-2" /> */}
								</div>
							))}
						</Slider>

						<h2 className="mb-0 mx-2">HERO EVENTS</h2>



						<WorldClassInstructors />
					</div>


					<br></br>
					<br></br>
					<h2 className="mb-0 mx-2">Fagaaraha Qaamuus</h2>
					{/* <br></br> */}
					<Row className="mb-8">
						<Col md={12}>
							{/*  Testimonial slider */}
							<TestimonialsSlider />
						</Col>
					</Row>

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
