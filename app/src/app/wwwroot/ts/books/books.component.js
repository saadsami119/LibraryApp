"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var books_service_1 = require("./books.service");
var appStore_service_1 = require("../app/services/appStore.service");
var alert_service_1 = require("../alert/alert.service");
var BooksComponent = (function () {
    function BooksComponent(_bookService, _alertService, _appStoreService, _router) {
        this._bookService = _bookService;
        this._alertService = _alertService;
        this._appStoreService = _appStoreService;
        this._router = _router;
        this.searcedBooks = new Array();
    }
    BooksComponent.prototype.ngOnInit = function () {
        if (this._appStoreService.getUsername() == undefined) {
            this._router.navigate(["login"]);
        }
    };
    BooksComponent.prototype.search = function () {
        var _this = this;
        this._bookService.getBooks(this.searchedBookName, this.searchedAuthorName)
            .subscribe(function (books) {
            _this.searcedBooks = books;
        }, function (error) { _this._alertService.showError(error); });
    };
    BooksComponent.prototype.addToCart = function (book) {
        if (this.isBookAlreadyInCart(book.id)) {
            this._alertService.showInfo(book.name + " has been already added to the cart!");
            return;
        }
        this._appStoreService.addBookToCart(book);
    };
    BooksComponent.prototype.isBookAlreadyInCart = function (bookId) {
        return this._appStoreService.getCart().find(function (x) { return x.id == bookId; }) !== undefined;
    };
    BooksComponent = __decorate([
        core_1.Component({
            selector: "books",
            moduleId: module.id,
            templateUrl: "books.view.html",
            providers: [books_service_1.default]
        }), 
        __metadata('design:paramtypes', [books_service_1.default, alert_service_1.default, appStore_service_1.default, router_1.Router])
    ], BooksComponent);
    return BooksComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BooksComponent;
