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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var alert_service_1 = require("../alert/alert.service");
var home_service_1 = require("./home.service");
var appStore_service_1 = require("../app/services/appStore.service");
var HomeComponent = (function () {
    function HomeComponent(_fb, _router, _alertService, _homeService, _appStoreService) {
        this._fb = _fb;
        this._router = _router;
        this._alertService = _alertService;
        this._homeService = _homeService;
        this._appStoreService = _appStoreService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        if (this._appStoreService.getUsername() === undefined) {
            this._router.navigate(["login"]);
        }
        this.getCheckedoutBooks();
    };
    HomeComponent.prototype.getCheckedoutBooks = function () {
        var _this = this;
        this._homeService.getAllCheckedoutBooks(this._appStoreService.getUsername())
            .subscribe(function (historie) {
            console.log(historie);
            _this.checkoutHistorie = historie;
        }, function (error) {
            _this._alertService.showError(error);
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: "home",
        moduleId: module.id,
        templateUrl: "home.view.html",
        providers: [home_service_1.default]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        alert_service_1.default,
        home_service_1.default,
        appStore_service_1.default])
], HomeComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeComponent;
//# sourceMappingURL=home.component.js.map