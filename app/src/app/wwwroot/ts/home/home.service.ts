import { Injectable } from "@angular/core";
import HttpService from "../app/services/http.service";
import { Observable } from "rxjs/Observable";
import Book from "../books/book.model";
import CheckoutHistory from "./model/checkoutHistorie.model";

@Injectable()
export default class HomeService {
    constructor(private _httpService: HttpService) {
    }

    getAllCheckedoutBooks(username: string): Observable<Array<CheckoutHistory>> {
        var url = "/api/checkout/user/" + username;
        return this._httpService.get(url);
    }
}