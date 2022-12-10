// ** Import from react dom
import { Route, Switch, Redirect } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

/* ----------------------------------- */
/* IMPORTS FOR MARKETING PAGES - START */

import CourseIndex from "pages/index/CourseIndex";
import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import StudentDashboard from "pages/student/Dashboard";
import EditProfile from "pages/student/account-settings/EditProfile";
import Courses from "pages/courses/Courses";
import Events from "pages/events/events";
import EventDetail from "pages/events/eventDetail";
import EnrolledCourses from "pages/student/account-settings/EnrolledCourses";
import Notifications from "pages/student/account-settings/Notifications";
import DeleteProfile from "pages/student/account-settings/DeleteProfile";
import AuthSecurity from "pages/student/account-settings/AuthSecurity";
import CourseDetail from "pages/courses/detail/courseDetail";
import Error404 from "pages/errorPages/Error404";
import ComingSoon from "pages/errorPages/ComingSoon";

import Timer from "pages/events/Timer";

// import DeleteProfile from "pages/student/account-settings/Deleteprofile";
import InstructorDetail from "./../pages/instructor/InstructorDetail";
import Checkout from "pages/checkout/checkout";

/* IMPORTS FOR MARKETING PAGES - END */
/* --------------------------------- */

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

function AllRoutes() {
  return (
    <Switch>
      {/* --------------------------- */}
      {/* LANDING PAGES ROUTERS - START */}
      <AppRoute exact path="/" layout={DefaultLayout} component={CourseIndex} />

      {/* authentication joining forgetting  */}
      <AppRoute
        exact
        path="/auth/login"
        layout={AuthLayout}
        component={SignIn}
      />
      <AppRoute
        exact
        path="/join/sign-up"
        layout={AuthLayout}
        component={SignUp}
      />

      {/* dashboard edit userifno */}
      <AppRoute
        exact
        path="/user/dashboard/"
        layout={DefaultLayout}
        component={StudentDashboard}
      />
      <AppRoute
        exact
        path="/user/edit-profile/"
        layout={DefaultLayout}
        component={EditProfile}
      />
      <AppRoute
        exact
        path="/user/delete-profile/"
        layout={DefaultLayout}
        component={DeleteProfile}
      />
      <AppRoute
        exact
        path="/user/enrolled-courses/"
        layout={DefaultLayout}
        component={EnrolledCourses}
      />
      <AppRoute
        exact
        path="/user/auth-security/"
        layout={DefaultLayout}
        component={AuthSecurity}
      />
      <AppRoute
        exact
        path="/user/delete-account/"
        layout={DefaultLayout}
        component={DeleteProfile}
      />

      <AppRoute
        exact
        path="/instructor-detail/:instructorId"
        layout={DefaultLayout}
        component={InstructorDetail}
      />

      {/* COURSES AND CATEGORIES */}
      <AppRoute
        exact
        path="/courses/"
        layout={DefaultLayout}
        component={Courses}
      />
      <AppRoute
        exact
        path="/courses/:id"
        layout={DefaultLayout}
        component={CourseDetail}
      />
      <AppRoute
        exact
        path="/courses/:id/watch"
        layout={DefaultLayout}
        component={<h1>Watch Course</h1>}
      />
      <AppRoute
        exact
        path="/checkout/course/:courseid"
        layout={DefaultLayout}
        component={Checkout}
      />
      <AppRoute
        exact
        path="/events/"
        layout={DefaultLayout}
        component={Events}
      />
      <AppRoute
        exact
        path="/events/"
        layout={DefaultLayout}
        component={Events}
      />
      <AppRoute
        exact
        path="/events/:slug"
        layout={DefaultLayout}
        component={EventDetail}
      />
      <AppRoute exact path="/404" layout={DefaultLayout} component={Error404} />
      <AppRoute
        exact
        path="/coming-soon"
        layout={DefaultLayout}
        component={ComingSoon}
      />

      {/* COURSES AND CATEGORIES */}
      {/* <AppRoute
        exact
        path="/courses/"
        layout={DefaultLayout}
        component={Courses}
      />
      <AppRoute
        exact
        path="/events/"
        layout={DefaultLayout}
        component={Events}
      />
      <AppRoute
        exact
        path="/events/:id"
        layout={DefaultLayout}
        component={EventDetail}
      /> */}

      {/* ADMIN PAGES ROUTERS - START */}
      {/* --------------------------- */}

      {/* ADMIN PAGES ROUTERS - END */}
      {/* ------------------------- */}

      {/*Redirect*/}
      <Redirect to="/404" />
    </Switch>
  );
}

export default AllRoutes;
