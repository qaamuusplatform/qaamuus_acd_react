// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts

import AllRoutes from 'layouts/AllRoutes';
import ScrollToTop from 'layouts/ScrollToTop';
// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';
import { CurrentUserContext } from 'services/currentUserContext';
import { useState,useEffect } from 'react';
import { getLoggedInUser } from 'services/authService';
function App() {
	const [theUser, setTheUser] = useState(getLoggedInUser());
	// const qInit = async () => {
	// 	 data = await getLoggedInUser();
	// 	console.log(data);
	// 	setTheUser(data);
	// };
	// useEffect(() => {
	// 	qInit();
	// }, []);
	return (
		<Router>
			<CurrentUserContext.Provider value={{ theUser, setTheUser }} >
				<div className="App">
					<ScrollToTop />
					<AllRoutes />
				</div>
			</CurrentUserContext.Provider>
		</Router>
	);
}

export default App;
