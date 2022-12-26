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

// import layouts

const AboutQaamuus = () => {
    const { currentUser, setCurrentUser,userIsLoading } = useContext(CurrentUserContext);
	return (
		<Fragment>
			{/* Default Navbar */}
        	{userIsLoading?(<NavbarDefault isLoading />):Object.keys(currentUser).length === 0 ? (<NavbarDefault /> ) : (<NavbarDefault login />)}

			<div className="py-10 bg-white">
				<Container>
					{/* Hero Title */}
					<HeroContent />

					{/* Justified Gallery Section */}
					<JustifiedGallery />
					<ZafarGallery />

					{/* 4 Columns Stat */}
					<Stat />
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
