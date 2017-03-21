import { Component, OnInit } from "@angular/core";
import AppStoreService from "../app/services/appStore.service";
import CheckoutService from "./checkout.service";
import AlertService from "../alert/alert.service";
import Book from "../books/book.model";
import Checkout from "./checkout.model";

@Component({
    selector: "checkout",
    moduleId: module.id,
    templateUrl: "checkout.view.html",
    providers: [CheckoutService]
})

export default class CheckoutComponent implements OnInit {
    public checkoutBooks: Array<Book>;

    constructor(
        private _appStoreService: AppStoreService,
        private _checkoutService: CheckoutService,
        private _alertService: AlertService) {
        this.checkoutBooks = new Array<Book>();
    }

    ngOnInit() {
        this.checkoutBooks = this._appStoreService.getCart();
    }

    checkout() {
        let checkout: Checkout = new Checkout();
        checkout.books = this.checkoutBooks;
        checkout.userid = this._appStoreService.getUsername();

        this._checkoutService.checkout(checkout).subscribe((isCheckedOut) => {
            if (isCheckedOut) {
                this._alertService.showSuccess("Books have been checkedout successfully!");
                this._appStoreService.clearCart();
                this.checkoutBooks = new Array<Book>();
            }

        }, error => {
            this._alertService.showError(error);
        })

    }


}
