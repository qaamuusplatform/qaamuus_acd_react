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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCoursesDetail } from "services/coursesService";
import useSWR, { mutate } from "swr";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [avatorIsLoading,setAvatorIsLoading]=useState(true);

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
      setAvatorIsLoading(false);
      // setCurrentUser({});
    } else {
      setAvatorIsLoading(false);
    }
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
          <ToastContainer />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
