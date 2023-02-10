import {
    ADMIN_ROUTE,
    COURSES_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    USER_PROFILE_ROUTE,
    COURSE_ROUTE,
    MAKE_COURSE_ROTE,
} from "./utils/consts";

import Admin from "./pages/admin/Admin";
import Courses from "./pages/courses/Courses";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Course from "./pages/course/Course";
import Profile from "./pages/profile/Profile";
import MakeCourse from "./pages/make-course/MakeCourse";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: MAKE_COURSE_ROTE,
        Component: MakeCourse
    },
];

export const publicRoutes = [
    {
        path: COURSES_ROUTE,
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
]