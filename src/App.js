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
import { Toaster } from "react-hot-toast";
function App() {
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
		  <Toaster />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
