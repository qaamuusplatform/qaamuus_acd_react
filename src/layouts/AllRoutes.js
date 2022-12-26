// ** Import from react dom
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { userAccessToken } from "../services/authService";

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
import EnrolledCourses from "pages/student/account-settings/EnrolledCourses";
import Notifications from "pages/student/account-settings/Notifications";
import DeleteProfile from "pages/student/account-settings/DeleteProfile";
import AuthSecurity from "pages/student/account-settings/AuthSecurity";
import CourseDetail from "pages/courses/detail/courseDetail";
import Error404 from "pages/errorPages/Error404";
import ComingSoon from "pages/errorPages/ComingSoon";

// import DeleteProfile from "pages/student/account-settings/Deleteprofile";
import InstructorDetail from "./../pages/instructor/InstructorDetail";
import Members from "pages/instructor/InstructorsList";
import Checkout from "pages/checkout/checkout";
import EventDetail from "pages/events/eventDetail";
import EventWatchLive from "pages/events/eventWatch/EventWatchLive";
import LiveLayout from "./LiveLayout";
import ReferralData from "pages/student/account-settings/ReferralData";
import EventCheckout from "./../pages/checkout/EventCheckout";
import { CurrentUserContext } from "services/currentUserContext";
import WatchCourse from "pages/courses/watchCourse";
import ForgetPassword from "pages/auth/ForgetPassword";
import CourseResumeLayout from "./CourseResumeLayout";
import EventWatchVr from "pages/events/eventWatch/EventWatchVirtual";
import DashboardIndexTop from "./DashboardIndexTop";
import AboutQaamuus from "pages/aboutQ/AboutQaamuus";
import BlankLayout from "./BlankLayout";

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

const ProtectedRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log(props);
        if (userAccessToken() === null)
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location },
              }}
            />
          );

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    ></Route>
  );
};

function AllRoutes() {
  return (
    <Switch>
      {/* --------------------------- */}
      {/* LANDING PAGES ROUTERS - START */}
      <AppRoute exact path="/" layout={DefaultLayout} component={CourseIndex} />
      <AppRoute exact path="/nagu-saabsan/" layout={BlankLayout} component={AboutQaamuus} />

      {/* authentication joining forgetting  */}
      <AppRoute
        exact
        path="/auth/login"
        layout={AuthLayout}
        component={SignIn}
      />
      <AppRoute
        exact
        path="/auth/forget-password/"
        layout={AuthLayout}
        component={ForgetPassword}
      />
      <AppRoute
        exact
        path="/join/sign-up"
        layout={AuthLayout}
        component={SignUp}
      />

      {/* dashboard edit userifno */}
      <ProtectedRoute
        exact
        path="/user/dashboard/"
        layout={DefaultLayout}
        component={StudentDashboard}
      />
      <ProtectedRoute
        exact
        path="/user/edit-profile/"
        layout={DefaultLayout}
        component={EditProfile}
      />
      <ProtectedRoute
        exact
        path="/user/notifications/"
        layout={DefaultLayout}
        component={Notifications}
      />
      <ProtectedRoute
        exact
        path="/user/delete-profile/"
        layout={DefaultLayout}
        component={DeleteProfile}
      />
      <ProtectedRoute
        exact
        path="/user/enrolled-courses/"
        layout={DefaultLayout}
        component={EnrolledCourses}
      />
      <ProtectedRoute
        exact
        path="/user/referral-data/"
        layout={DefaultLayout}
        component={ReferralData}
      />
      <ProtectedRoute
        exact
        path="/user/auth-security/"
        layout={DefaultLayout}
        component={AuthSecurity}
      />
      <ProtectedRoute
        exact
        path="/user/delete-account/"
        layout={DefaultLayout}
        component={DeleteProfile}
      />

      <AppRoute
        exact
        path="/members/"
        layout={DefaultLayout}
        component={Members}
      />
      <AppRoute
        exact
        path="/instructor/:instructorUsername/"
        layout={DefaultLayout}
        component={InstructorDetail}
      />
      <ProtectedRoute
        exact
        path="/checkout/course/:slug"
        layout={DefaultLayout}
        component={Checkout}
      />
      <AppRoute
        exact
        path="/members/"
        layout={DefaultLayout}
        component={Members}
      />

      {/* <AppRoute exact path="/instructor-detail/:instructorId" layout={DefaultLayout} component={InstructorDetail} /> */}

      {/* COURSES AND CATEGORIES */}
      <AppRoute
        exact
        path="/courses/"
        layout={DefaultLayout}
        component={Courses}
      />
      <AppRoute
        exact
        path="/course/:slug"
        layout={DefaultLayout}
        component={CourseDetail}
      />
      {/* <ProtectedRoute
        exact
        path="/courses/:slug/watch"
        layout={DashboardIndexTop}
        component={WatchCourse}
      /> */}
      <ProtectedRoute
        exact
        path="/course/:slug/watch"
        layout={DashboardIndexTop}
        component={WatchCourse}
      />
      <AppRoute
        exact
        path="/events/"
        layout={DefaultLayout}
        component={Events}
      />

      <AppRoute
        exact
        path="/event/:slug"
        layout={DefaultLayout}
        component={EventDetail}
      />
      <AppRoute
        exact
        path="/checkout/event/:slug"
        layout={DefaultLayout}
        component={EventCheckout}
      />
      <ProtectedRoute
        exact
        path="/event/watch-live/:slug"
        layout={LiveLayout}
        component={EventWatchLive}
      />
      <ProtectedRoute
        exact
        path="/event/watch-live-vt/:slug"
        layout={LiveLayout}
        component={EventWatchVr}
      />
      
      {/* <AppRoute exact path="/event-waiting/:slug" layout={DefaultLayout}  component={EventWatingScreen} /> */}

      <AppRoute exact path="/404" layout={DefaultLayout} component={Error404} />
      <AppRoute
        exact
        path="/coming-soon"
        layout={DefaultLayout}
        component={ComingSoon}
      />

      {/* <AppRoute exact path="/event-waiting/:slug" layout={DefaultLayout}  component={EventWatingScreen} /> */}

      <AppRoute exact path="/404" layout={DefaultLayout} component={Error404} />

      {/*Redirect*/}
      <Redirect to="/404" />
    </Switch>
  );
}

export default AllRoutes;
