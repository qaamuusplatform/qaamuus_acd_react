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
// import DeleteProfile from "pages/student/account-settings/Deleteprofile";

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
			<AppRoute exact path="/auth/login" layout={AuthLayout} component={SignIn}
			/>
			<AppRoute exact path="/join/register/" layout={AuthLayout} component={SignUp} />

			{/* dashboard edit userifno */}
			<AppRoute exact path="/user/dashboard/" layout={DefaultLayout} component={StudentDashboard} />
			<AppRoute exact path="/user/edit-profile/" layout={DefaultLayout} component={EditProfile} />
			<AppRoute exact path="/user/enrolled-courses/" layout={DefaultLayout} component={EnrolledCourses} />
			<AppRoute exact path="/user/notifications/" layout={DefaultLayout} component={Notifications} />
			<AppRoute exact path="/user/delete-account/" layout={DefaultLayout} component={DeleteProfile} />
			<AppRoute exact path="/user/auth-security/" layout={DefaultLayout} component={AuthSecurity} />

			{/* COURSES AND CATEGORIES */}
			<AppRoute exact path="/courses/" layout={DefaultLayout} component={Courses} />
			<AppRoute exact path="/events/" layout={DefaultLayout} component={Events} />
			<AppRoute exact path="/events/eventDe" layout={DefaultLayout} component={EventDetail} />

			{/* ADMIN PAGES ROUTERS - START */}
			{/* --------------------------- */}

			{/* ADMIN PAGES ROUTERS - END */}
			{/* ------------------------- */}

			{/*Redirect*/}
			<Redirect to="/marketing/specialty/404-error/" />
		</Switch>
	);
}

export default AllRoutes;
