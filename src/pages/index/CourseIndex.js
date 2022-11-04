// import node module libraries
import React from 'react';
import { Fragment } from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';

import Slider from 'react-slick';
// import custom components
import HeroHeader from './HeroHeader';
import FeaturesList from './FeaturesList';
import allInternationalFriendData from 'data/AllInternationalFriends';

// import sub components

const CourseIndex = () => {
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
									<Container>
										<Card.Title>Card Title</Card.Title>
									</Container>
								</Card>
							)

						})}

					</Slider>
					{/* <CourseSlider popular={true} /> */}

					<div className="position-relative">

					</div>
				</Container>
			</div>
		</Fragment>
	);
};

export default CourseIndex;
