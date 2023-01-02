// import node module libraries
import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

// import sub components
import FeaturesList from './FeaturesList';
import CTAButton from './CTAButton';
import Stat from './Stat';
import FooterWithLinks from 'layouts/footers/FooterWithLinks';
import NavbarDefault from 'layouts/navbars/NavbarDefault';
import { useContext } from 'react';
import { CurrentUserContext } from 'services/currentUserContext';
import JustifiedGallery from './JustifiedGallery';
import HeroContent from './HeroContent';
import ZafarGallery from './zafarGallery';
import TeamGridRoundImages from './TeamGridRoundImages';
import InternationalFriends from 'pages/index/InternationalFriends';
import Slider from 'react-slick';
import { HeroVideos } from './heroVideosLink';

// import layouts

const AboutQaamuus = () => {
	const { currentUser, setCurrentUser, userIsLoading } = useContext(CurrentUserContext);
	const heroVideosSliderSettings = {
		infinite: true,
		slidesToShow: 2,
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
	return (
		<Fragment>
			{/* Default Navbar */}
			{userIsLoading ? (<NavbarDefault isLoading />) : Object.keys(currentUser).length === 0 ? (<NavbarDefault />) : (<NavbarDefault login />)}

			<div className="py-10 bg-white">
				<Container>
					{/* Hero Title */}
					<HeroContent />

					{/* Justified Gallery Section */}
					<JustifiedGallery />
					<ZafarGallery />

					{/* 4 Columns Stat */}
				
					<Stat />
					<br />
					<InternationalFriends />
					<br />
					<Slider {...heroVideosSliderSettings} className="pb-sm-5 pt-sm-5 mb-5 slick-slider-wrapper">
						{HeroVideos?.map((theVideo, idx) => (
								<div  key={idx}>
									{/* <iframe src="https://www.youtube.com/embed/GUWkDyfEgCE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
									<iframe src={theVideo.videoUlr} loading="lazy" style={{ border: 'none', top: 0, width:'70vh', height: '30vh' }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen="true" />
								</div>
							))}
					
					</Slider>
				</Container>
			</div>

			{/* Three Columns Features Section */}
			<FeaturesList />
			

			{/* Team Section in Rounded Image with Grid Layout */}
			{/* <TeamGridRoundImages /> */}

			{/* Hero Call to Action */}
			<CTAButton />
			

			{/* Footer with links */}
			<FooterWithLinks />
		</Fragment>
	);
};

export default AboutQaamuus;
