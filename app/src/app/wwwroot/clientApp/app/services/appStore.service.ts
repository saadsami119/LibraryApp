import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import Book from "../../books/book.model";

@Injectable()
export default class AppStoreService {
    private _username: string;
    private _cart: Array<Book>;
    private _usernameSubject: Subject<string>;
    private _cartSubject: Subject<Array<Book>>;

    constructor() {
        this._cart = new Array<Book>();
        this._usernameSubject = new Subject<string>();
        this._cartSubject = new Subject<Array<Book>>();
    }

    public subscribeUsernameChanges(): Observable<string> {
        return this._usernameSubject.asObservable();
    }

    public getUsername(): string {
        return this._username;
    }

    public setUsername(username: string): void {
        this._username = username;
        this._usernameSubject.next(this._username);
    }

    public addBookToCart(book: Book): void {       

        this._cart.push(book);
        this._cartSubject.next(this._cart);
    }

    public subscribeCartChanges(): Observable<Array<Book>> {
        return this._cartSubject.asObservable();
    }

    public getCart(): Array<Book> {
        return this._cart;
    }

    public clearCart() {
        this._cart = new Array<Book>();
    }   
   
}