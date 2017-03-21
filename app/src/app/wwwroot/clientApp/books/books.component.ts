import { Component } from "@angular/core";
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
export default class BooksComponent {
    public searchedBookName: string;
    public searchedAuthorName: string;
    public searcedBooks: Array<Book>;

    constructor(
        private _bookService: BookService,
        private _alertService: AlertService,
        private _appStoreService: AppStoreService) {
        this.searcedBooks = new Array<Book>();
    }

    public search(): void {
        this._bookService.getBooks(this.searchedBookName, this.searchedAuthorName)
            .subscribe((books) => {
                this.searcedBooks = books;
            }, error => { this._alertService.showError(error); });
    }

    public addToCart(book: Book): void {
        if (this.isBookInCart(book.id)) {
            this._alertService.showError(book.name + " has been already added to cart!");
            return;
        }
        this._appStoreService.addBookToCart(book);
    }

    private isBookInCart(bookId: number): boolean {
        return this._appStoreService.getCart().find(x => x.id == bookId) !== undefined;
    }

}
