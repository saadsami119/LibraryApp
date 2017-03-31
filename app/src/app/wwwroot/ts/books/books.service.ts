import { Injectable } from '@angular/core';
import HttpService from "../app/services/http.service";
import { Observable } from "rxjs/Observable";
import Book from "./book.model";

@Injectable()
export default class BookService {

    constructor(private _httpService: HttpService) {
    }

    getBooks(name: string, author: string): Observable<Book[]> {
        name = name === undefined ? "":name;
        author = author === undefined ? "" : author;
        var url = "/api/book/name/" + name + "/author/" + author;
        return this._httpService.get(url);
    }
}