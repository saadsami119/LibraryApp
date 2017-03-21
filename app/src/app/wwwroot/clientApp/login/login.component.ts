import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from "./login.model";
import LoginService from "./login.service";
import AlertService from "../alert/alert.service";
import AppStoreService from "../app/services/appStore.service";


@Component({
    selector: "books",
    moduleId: module.id,
    templateUrl: "login.view.html",
    providers: [LoginService]
})

export default class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public message: string;

    constructor(
        private _fb: FormBuilder,
        private _router: Router,
        private _loginService: LoginService,
        private _alertService: AlertService,
        private _appStoreService: AppStoreService) {
    }

    public ngOnInit() {        
        this.buildForm();
    }

    public loginUser(user: User): void {
        this._loginService.verifyUser(user.username, user.password)
            .subscribe((isValid) => {
                if (isValid) {
                    this._appStoreService.setUsername(user.username);
                    this._router.navigate(["books"]);
                }
                else { this._alertService.showError("Invalid login credentials! Please try again."); }
            }, error => { this._alertService.showError(error) });
    }

    private buildForm(): void {
        this.loginForm = this._fb.group({
            username: ['saad@gmail.com', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")])],
            password: ['saad', Validators.required]
        });
    }
}
