import { makeAutoObservable } from "mobx";

interface IJwtPayload {
    id: number;
    status: 'active' | 'blocked';
    email: string;
}

export default class UserStore {
    _isAuth: boolean;
    _user: IJwtPayload | null;

    constructor() {
        this._isAuth = false;
        this._user = {
            id: 0,
            status: 'active',
            email: ''
        };
        makeAutoObservable(this);
    }

    setIsAuth(state: boolean) {
        this._isAuth = state
    }

     isAuth() {
        return this._isAuth
    }
    setUser(user: IJwtPayload | null) {
        this._user = user

    }

     user() {
        return this._user
    }

}
