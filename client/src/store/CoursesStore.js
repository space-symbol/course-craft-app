import {makeAutoObservable} from "mobx";

export default class CoursesStore {
    constructor() {
        this._courses = []
        makeAutoObservable(this)
    }

    setCourses(courses) {
        this._courses = courses
    }

    getCourses() {
        return this._courses
    }
}