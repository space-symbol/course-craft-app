import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {};
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    getIsAuth() {
        return this._isAuth
    }

    setUser(user){
        this._user = user
    }

    getUser() {
        return this._user
    }
}