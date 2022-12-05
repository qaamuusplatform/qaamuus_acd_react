import { useState, useEffect } from "react";
// import node module libraries
import { BrowserRouter as Router } from "react-router-dom";

// import layouts

import AllRoutes from "layouts/AllRoutes";
import ScrollToTop from "layouts/ScrollToTop";
// import required stylesheet
import "simplebar/dist/simplebar.min.css";
import "tippy.js/animations/scale.css";
import { CurrentUserContext } from "services/currentUserContext";
import { getLoggedInUser } from "services/authService";
function App() {
<<<<<<< HEAD
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
=======
  const [currentUser, setCurrentUser] = useState("");

  const getCurrentUser = async () => {
    const { data } = await getLoggedInUser();

    setCurrentUser(data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Router>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <ScrollToTop />
          <AllRoutes />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
>>>>>>> bd4664dc9e9272cf99d3946d2ea53d2b489963e7
}

export default App;
