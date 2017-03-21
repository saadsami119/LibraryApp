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
var router_1 = require("@angular/router");
var appStore_service_1 = require("../app/services/appStore.service");
var NavBarComponent = (function () {
    function NavBarComponent(_router, appStoreService) {
        this._router = _router;
        this.appStoreService = appStoreService;
        this.checkoutBooks = new Array();
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appStoreService.subscribeUsernameChanges().subscribe(function (username) {
            _this.loginedInUserName = username;
            _this.isUserLoggedIn = _this.loginedInUserName !== null;
        });
        this.appStoreService.subscribeCartChanges().subscribe(function (books) {
            _this.checkoutBooks = books;
        });
    };
    NavBarComponent.prototype.onLogOut = function () {
        this.appStoreService.setUsername("");
        this._router.navigate(["login"]);
    };
    return NavBarComponent;
}());
NavBarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'nav-bar',
        templateUrl: "navbar.view.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        appStore_service_1.default])
], NavBarComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map