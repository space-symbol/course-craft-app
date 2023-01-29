import {
    ADMIN_ROUTE,
    CARDS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    REG_TEST_ROUTE,
    USER_PROFILE_ROUTE,
    COURSE_ROUTE,
} from "./utils/consts";
import Admin from "./pages/admin/Admin";
import Courses from "./pages/courses/Courses";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import RegTest from "./pages/reg-test/reg-test";
import Course from "./pages/course/Course";
import Profile from "./pages/profile/Profile";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: Profile
    }
];

export const publicRoutes = [
    {
        path: CARDS_ROUTE,
        Component: Courses
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: Course
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REG_TEST_ROUTE,
        Component: RegTest
    }
]