import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import Alert from "./alert.model"

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.view.html'
})

export default class AlertComponent {
    alerts: Array<Alert>;

    constructor() {
        this.alerts = new Array<Alert>();
    }

    @Input() set show(value: Array<Alert>) {
        this.alerts = value;
    }

    onClose(alert: Alert) {

        for (var i = this.alerts.length - 1; i >= 0; i--) {
            if (this.alerts[i].id === alert.id) {
                this.alerts.splice(i, 1);
            }
        }
    }

}