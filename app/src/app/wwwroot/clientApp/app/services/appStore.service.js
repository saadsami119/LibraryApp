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
var Subject_1 = require("rxjs/Subject");
var AppStoreService = (function () {
    function AppStoreService() {
        this._cart = new Array();
        this._usernameSubject = new Subject_1.Subject();
        this._cartSubject = new Subject_1.Subject();
    }
    AppStoreService.prototype.subscribeUsernameChanges = function () {
        return this._usernameSubject.asObservable();
    };
    AppStoreService.prototype.getUsername = function () {
        return this._username;
    };
    AppStoreService.prototype.setUsername = function (username) {
        this._username = username;
        this._usernameSubject.next(this._username);
    };
    AppStoreService.prototype.addBookToCart = function (book) {
        this._cart.push(book);
        this._cartSubject.next(this._cart);
    };
    AppStoreService.prototype.subscribeCartChanges = function () {
        return this._cartSubject.asObservable();
    };
    AppStoreService.prototype.getCart = function () {
        return this._cart;
    };
    AppStoreService.prototype.clearCart = function () {
        this._cart = new Array();
    };
    return AppStoreService;
}());
AppStoreService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppStoreService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppStoreService;
//# sourceMappingURL=appStore.service.js.map