import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AppStoreService from "../app/services/appStore.service";
import Book from "../books/book.model";

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: "navbar.view.html"
})

export default class NavBarComponent implements OnInit {
    public loginedInUserName: string;
    public isUserLoggedIn: boolean;
    public checkoutBooks: Array<Book>;

    constructor(
        private _router: Router,
        private appStoreService: AppStoreService) {
        this.checkoutBooks = new Array<Book>();
    }

    ngOnInit() {

        this.appStoreService.subscribeUsernameChanges().subscribe(username => {
            this.loginedInUserName = username;
            this.isUserLoggedIn = this.loginedInUserName !== null;
        });

        this.appStoreService.subscribeCartChanges().subscribe((books) => {
                this.checkoutBooks = books;
        });
    }

    onLogOut() {
        this.appStoreService.setUsername("");
        this._router.navigate(["login"]);
    }

}
