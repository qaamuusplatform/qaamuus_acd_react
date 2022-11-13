// import node module libraries
import React, { Fragment, useEffect } from 'react';

// import layouts
import FooterWithLinks from './footers/FooterWithLinks';
import NavbarDefault from './navbars/NavbarDefault';

const DefaultLayout = (props) => {
	useEffect(() => {
		document.body.style.backgroundColor = '#f5f4f8';
	});
	return (
		<Fragment>
			<NavbarDefault  />
			{/* <NavbarDefault  /> */}
			{props.children}
			<FooterWithLinks />
		</Fragment>
	);
};

export default DefaultLayout;
