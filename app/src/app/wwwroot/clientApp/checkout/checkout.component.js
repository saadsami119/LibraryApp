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
var appStore_service_1 = require("../app/services/appStore.service");
var checkout_service_1 = require("./checkout.service");
var alert_service_1 = require("../alert/alert.service");
var checkout_model_1 = require("./checkout.model");
var CheckoutComponent = (function () {
    function CheckoutComponent(_appStoreService, _checkoutService, _alertService) {
        this._appStoreService = _appStoreService;
        this._checkoutService = _checkoutService;
        this._alertService = _alertService;
        this.checkoutBooks = new Array();
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        this.checkoutBooks = this._appStoreService.getCart();
    };
    CheckoutComponent.prototype.checkout = function () {
        var _this = this;
        var checkout = new checkout_model_1.default();
        checkout.books = this.checkoutBooks;
        checkout.userid = this._appStoreService.getUsername();
        this._checkoutService.checkout(checkout).subscribe(function (isCheckedOut) {
            if (isCheckedOut) {
                _this._alertService.showSuccess("Books have been checkedout successfully!");
                _this._appStoreService.clearCart();
                _this.checkoutBooks = new Array();
            }
        }, function (error) {
            _this._alertService.showError(error);
        });
    };
    return CheckoutComponent;
}());
CheckoutComponent = __decorate([
    core_1.Component({
        selector: "checkout",
        moduleId: module.id,
        templateUrl: "checkout.view.html",
        providers: [checkout_service_1.default]
    }),
    __metadata("design:paramtypes", [appStore_service_1.default,
        checkout_service_1.default,
        alert_service_1.default])
], CheckoutComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CheckoutComponent;
//# sourceMappingURL=checkout.component.js.map