import { useState, useEffect } from "react";
// import node module libraries
import { BrowserRouter as Router } from "react-router-dom";

// import layouts

// ** Import core SCSS styles
import "assets/scss/theme.scss";

import AllRoutes from "layouts/AllRoutes";
import ScrollToTop from "layouts/ScrollToTop";
// import required stylesheet
import "simplebar/dist/simplebar.min.css";
import "tippy.js/animations/scale.css";
import { CurrentUserContext } from "services/currentUserContext";
import { getLoggedInUser } from "services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  var [userIsLoading, setUserIsLoading] = useState(true);

  const getCurrentUser = async () => {
    const { data } = await getLoggedInUser();

    if (data) {
      // console.log("data ready",data)
      setCurrentUser(data);
      setUserIsLoading(false);
      // setCurrentUser({});
    } else {
      setCurrentUser({});
    }
    setUserIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Router>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, userIsLoading }}
      >
        <div className="App">
          <ScrollToTop />
          <AllRoutes />
          <ToastContainer />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
