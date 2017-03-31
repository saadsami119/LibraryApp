import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AlertService from "../alert/alert.service";
import HomeService from "./home.service";
import AppStoreService from "../app/services/appStore.service";
import CheckoutHistory from "./model/checkoutHistorie.model";



@Component({
    selector: "home",
    moduleId: module.id,
    templateUrl: "home.view.html",
    providers: [HomeService]

})

export default class HomeComponent implements OnInit {
    public checkoutHistorie: Array<CheckoutHistory>;

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _alertService: AlertService,
        private _homeService: HomeService,        
        private _appStoreService: AppStoreService) {
    }

    public ngOnInit() {
       if(this._appStoreService.getUsername() === undefined){
            this._router.navigate(["login"]);
       }
       
        this.getCheckedoutBooks();
    }

    private getCheckedoutBooks(): void {
        this._homeService.getAllCheckedoutBooks(this._appStoreService.getUsername())
            .subscribe((historie) => {
                console.log(historie);
                this.checkoutHistorie = historie;
            }, error => {
                this._alertService.showError(error);
            });
    }

}
