// import node module libraries
import { BrowserRouter as Router } from "react-router-dom";

// import layouts

import AllRoutes from "layouts/AllRoutes";
import ScrollToTop from "layouts/ScrollToTop";
// import required stylesheet
import "simplebar/dist/simplebar.min.css";
import "tippy.js/animations/scale.css";
import { CurrentUserContext } from "services/currentUserContext";
import { useState, useEffect } from "react";
import { getLoggedInUser } from "services/authService";
function App() {
  const [user, setUser] = useState([]);

  const getCurrentUser = async () => {
    const { data } = await getLoggedInUser();
    console.log(data);
    setUser(data);
  };

  console.log(user);

  useEffect(() => {
    getCurrentUser();
  }, []);

  //   console.log(user);
  return (
    <Router>
      <CurrentUserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <ScrollToTop />
          <AllRoutes />
        </div>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
