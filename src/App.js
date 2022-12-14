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

import { getCoursesDetail } from "services/coursesService";
import useSWR, { mutate } from "swr";
import { boolean } from "yup";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  var userIsLoading = true;

  //   const { data:datadetal } = useSWR(
  //     `/api/userProfile-detail/14/`,
  //     getCoursesDetail
  //   );
  // const handlepost=()=>{
  //   mutate(`/api/userProfile-detail/14/`, getCoursesDetail)
  // }

  const getCurrentUser = async () => {
    const { data } = await getLoggedInUser();
    if (data) {
      // console.log("data ready",data)
      setCurrentUser(data);
      userIsLoading = false;

      // setCurrentUser({});
    } else {
    }
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
