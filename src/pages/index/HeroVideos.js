// import node module libraries
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

// import sub components
import useSWR from 'swr';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { END_POINT } from 'helper/constants';
// import data files

const HeroVideos = () => {
	const { data: internationalFriendsData, error } = useSWR('/api/ourInternationalFriends-list/', async (url) => await axios(url).then(r => r.data));
	const settings = {
		dots: true,
		speed: 500,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
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

	return (
		<Slider {...settings} className="pb-sm-5 mb-5 slick-slider-wrapper">
			{internationalFriendsData?.map((item, index) => {
				return (<iframe width="560" height="315" src="https://www.youtube.com/embed/_aSuUipxslE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					

				);
			})}

		</Slider>

	);
};

// Specifies the default values for props
HeroVideos.defaultProps = {
	recommended: false,
	popular: false,
	trending: false
};

// Typechecking With PropTypes
HeroVideos.propTypes = {
	recommended: PropTypes.bool,
	popular: PropTypes.bool,
	trending: PropTypes.bool
};

export default HeroVideos;
