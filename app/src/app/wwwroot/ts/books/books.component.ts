import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import BookService from "./books.service"
import AppStoreService from "../app/services/appStore.service";
import AlertService from "../alert/alert.service";
import Book from "./book.model";

@Component({
    selector: "books",
    moduleId: module.id,
    templateUrl: "books.view.html",
    providers: [BookService]
})
export default class BooksComponent implements OnInit {
    public searchedBookName: string;
    public searchedAuthorName: string;
    public searcedBooks: Array<Book>;

    constructor(
        private _bookService: BookService,
        private _alertService: AlertService,
        private _appStoreService: AppStoreService,
        private _router: Router) {
        this.searcedBooks = new Array<Book>();
    }

    public ngOnInit() {
        if (this._appStoreService.getUsername() == undefined) {
            this._router.navigate(["login"]);
        }
    }

    public search(): void {
        this._bookService.getBooks(this.searchedBookName, this.searchedAuthorName)
            .subscribe((books) => {
                this.searcedBooks = books;
            }, error => { this._alertService.showError(error); });
    }

    public addToCart(book: Book): void {
        if (this.isBookAlreadyInCart(book.id)) {
            this._alertService.showInfo(book.name + " has been already added to the cart!");
            return;
        }
        this._appStoreService.addBookToCart(book);
    }

    private isBookAlreadyInCart(bookId: number): boolean {
        return this._appStoreService.getCart().find(x => x.id == bookId) !== undefined;
    }

}
