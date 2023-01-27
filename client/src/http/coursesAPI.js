import {$host} from "./index";


export  const fetchCourses = async () => {
    return $host.get('api/courses/')
}