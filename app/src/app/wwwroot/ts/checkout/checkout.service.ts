import { Injectable } from "@angular/core";
import HttpService from "../app/services/http.service";
import { Observable } from "rxjs/Observable";
import Checkout from "./checkout.model";


@Injectable()
export default class CheckoutService {
    constructor(private _httpService: HttpService) {
    }

    public checkout(checkout : Checkout) : Observable<boolean>{
        let url = "/api/checkout/";
       return this._httpService.post(url,checkout);
    }
}
