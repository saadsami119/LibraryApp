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
var alert_model_1 = require("./alert.model");
var AlertService = (function () {
    function AlertService() {
        this._subject = new Subject_1.Subject();
    }
    AlertService.prototype.ngOnInit = function () {
    };
    AlertService.prototype.showSuccess = function (msg) {
        var alert = new alert_model_1.default(msg, "alert-success");
        this._subject.next(alert);
    };
    AlertService.prototype.showError = function (msg) {
        var alert = new alert_model_1.default(msg, "alert-danger");
        this._subject.next(alert);
    };
    AlertService.prototype.getAlert = function () {
        return this._subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AlertService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertService;
//# sourceMappingURL=alert.service.js.map