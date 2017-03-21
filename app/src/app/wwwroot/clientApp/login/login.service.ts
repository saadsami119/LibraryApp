import { Injectable } from "@angular/core";
import HttpService from "../app/services/http.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export default class LoginService {
    constructor(private _httpService: HttpService) {
    }

    verifyUser(username: string, password: string): Observable<boolean> {
        var url = "/api/account/login/username/" + username + "/password/" + password + "";
        return this._httpService.get(url);
    }
}