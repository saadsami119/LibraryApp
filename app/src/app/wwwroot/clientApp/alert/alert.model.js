"use strict";
var Alert = (function () {
    function Alert(msg, type) {
        this.id = Math.floor((Math.random() * 6) + 1);
        this.message = msg;
        this.type = type;
        // this.caption = cpt;
        //this.type = this.getAlertType(type);
        //console.log(this.type);
        //
    }
    Alert.prototype.getAlertType = function (type) {
        var cssClass;
        switch (type) {
            case "error":
                {
                    cssClass = "alert alert-danger";
                    break;
                }
            case "info":
                {
                    cssClass = "alert alert-info";
                    break;
                }
            case "success":
                {
                    cssClass = "alert alert-success";
                    break;
                }
            default:
                cssClass = "";
        }
        return cssClass;
    };
    return Alert;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Alert;
//# sourceMappingURL=alert.model.js.map