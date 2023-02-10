import {$authHost, $host} from "./index";


export const fetchCourses = async (search) => {
    const {data} = await $host.get(`api/courses/`, {params: {search}})
    return data
}

export const fetchCourse = async (id) => {
    const {data} = await $host.get('api/courses/' + id)
    return data
}

export const createCourse = async (course) => {
    const {data} = await $authHost.post('api/courses/', course)
    return data
}

export const editCourse = async (course) => {
    const {data} = await $authHost.patch('api/courses/', course)
    return data
}

export const deleteCourse = async (id) => {
    return await $authHost.delete('api/courses/' + id)
}