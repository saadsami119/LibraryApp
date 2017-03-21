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
var login_service_1 = require("./login.service");
var alert_service_1 = require("../alert/alert.service");
var appStore_service_1 = require("../app/services/appStore.service");
var LoginComponent = (function () {
    function LoginComponent(_fb, _router, _loginService, _alertService, _appStoreService) {
        this._fb = _fb;
        this._router = _router;
        this._loginService = _loginService;
        this._alertService = _alertService;
        this._appStoreService = _appStoreService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginComponent.prototype.loginUser = function (user) {
        var _this = this;
        this._loginService.verifyUser(user.username, user.password)
            .subscribe(function (isValid) {
            if (isValid) {
                _this._appStoreService.setUsername(user.username);
                _this._router.navigate(["books"]);
            }
            else {
                _this._alertService.showError("Invalid login credentials! Please try again.");
            }
        }, function (error) { _this._alertService.showError(error); });
    };
    LoginComponent.prototype.buildForm = function () {
        this.loginForm = this._fb.group({
            username: ['saad@gmail.com', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")])],
            password: ['saad', forms_1.Validators.required]
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "books",
        moduleId: module.id,
        templateUrl: "login.view.html",
        providers: [login_service_1.default]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        login_service_1.default,
        alert_service_1.default,
        appStore_service_1.default])
], LoginComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginComponent;
//# sourceMappingURL=login.component.js.map