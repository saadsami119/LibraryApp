import { Component, OnInit } from "@angular/core";
import Alert from "../alert/alert.model";
import AlertService from "../alert/alert.service";
import HttpService from "./services/http.service";
import AppStoreService from "./services/appStore.service";

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: "app.view.html",
    providers: [AlertService, HttpService, AppStoreService]
})
export class AppComponent implements OnInit {

    public alerts: Array<Alert>;

    constructor(
        private _alertService: AlertService,
        private _appStoreService : AppStoreService) {
    }

    ngOnInit() {
        this.alerts = new Array<Alert>();

        this._alertService.getAlert().subscribe(alert => {
            this.alerts.push(alert);
        });

    }
   
}