export default class Alert {
    //caption: string;
    message: string;
    type: string;
    id: number;

    constructor(msg: string, type: string) {
       this.id = Math.floor((Math.random() * 6) + 1);
       this.message = msg;
       this.type = type;
       // this.caption = cpt;
        
        //this.type = this.getAlertType(type);
        //console.log(this.type);
        //

    }

    private getAlertType(type: string): string {
        let cssClass: string;

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
    }
}