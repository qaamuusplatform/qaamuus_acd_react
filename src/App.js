// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts

import AllRoutes from 'layouts/AllRoutes';
import ScrollToTop from 'layouts/ScrollToTop';
// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

function App() {
	return (
		<Router>
			<div className="App">
				<ScrollToTop/>
				<AllRoutes />
			</div>
		</Router>
	);
}

export default App;
