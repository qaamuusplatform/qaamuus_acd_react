// ** Import from react dom
import { Route, Switch, Redirect } from "react-router-dom";

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
        if (userAccessToken() === null) return <Redirect to={"/auth/login"} />;

        return (
          <Layout>
            <Component {...props}></Component>
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
        path="/checkout/course/:courseid"
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
        path="/courses/:slug"
        layout={DefaultLayout}
        component={CourseDetail}
      />
      <ProtectedRoute
        exact
        path="/courses/:id/watch"
        layout={DefaultLayout}
        component={<h1>Watch Course</h1>}
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
