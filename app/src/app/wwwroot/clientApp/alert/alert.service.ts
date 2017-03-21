import { Injectable, OnInit } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import Alert from "./alert.model";

@Injectable()
export default class AlertService implements OnInit {

    private _subject: Subject<Alert>;

    constructor() {
        this._subject = new Subject<Alert>();

    }
    ngOnInit() {
    }

    public showSuccess(msg: string): void {
        let alert = new Alert(msg, "alert-success")
        this._subject.next(alert);
    }

    public showError(msg: string): void {
        let alert = new Alert(msg, "alert-danger");
        this._subject.next(alert);
    }

    public getAlert(): Observable<Alert> {
        return this._subject.asObservable();
    }


}