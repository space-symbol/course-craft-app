import {$authHost, $host} from "./index";


export const fetchCourses = async () => {
    return $host.get('api/courses/')
}

export const createCourse = async (course) => {
    return $authHost.post('api/courses/', course)
}
