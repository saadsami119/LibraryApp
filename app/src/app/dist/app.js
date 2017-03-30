var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("alert/alert.model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Alert;
    return {
        setters: [],
        execute: function () {
            Alert = (function () {
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
            exports_1("default", Alert);
        }
    };
});
System.register("alert/alert.component", ["@angular/core"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, AlertComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AlertComponent = (function () {
                function AlertComponent() {
                    this.alerts = new Array();
                }
                Object.defineProperty(AlertComponent.prototype, "show", {
                    set: function (value) {
                        this.alerts = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                AlertComponent.prototype.onClose = function (alert) {
                    for (var i = this.alerts.length - 1; i >= 0; i--) {
                        if (this.alerts[i].id === alert.id) {
                            this.alerts.splice(i, 1);
                        }
                    }
                };
                return AlertComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Array),
                __metadata("design:paramtypes", [Array])
            ], AlertComponent.prototype, "show", null);
            AlertComponent = __decorate([
                core_1.Component({
                    moduleId: module.id,
                    selector: 'alert',
                    templateUrl: 'alert.view.html'
                }),
                __metadata("design:paramtypes", [])
            ], AlertComponent);
            exports_2("default", AlertComponent);
        }
    };
});
System.register("alert/alert.service", ["@angular/core", "rxjs/Subject", "alert/alert.model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, Subject_1, alert_model_1, AlertService;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (alert_model_1_1) {
                alert_model_1 = alert_model_1_1;
            }
        ],
        execute: function () {
            AlertService = (function () {
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
                core_2.Injectable(),
                __metadata("design:paramtypes", [])
            ], AlertService);
            exports_3("default", AlertService);
        }
    };
});
System.register("app/services/http.service", ["@angular/core", "@angular/http", "rxjs/Observable", "rxjs/add/operator/map", "rxjs/add/operator/catch", "rxjs/add/observable/throw"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, http_1, Observable_1, HttpService;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            }
        ],
        execute: function () {
            HttpService = (function () {
                function HttpService(http) {
                    this.http = http;
                }
                HttpService.prototype.get = function (url) {
                    var _this = this;
                    return this.http.get(url)
                        .map(function (res) { return _this.parseResponse(res); })
                        .catch(function (error) { return _this.parseErrorMsg(error); });
                };
                HttpService.prototype.post = function (url, data) {
                    var _this = this;
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(url, data, options)
                        .map(function (res) { return _this.parseResponse(res); })
                        .catch(function (error) { return _this.parseErrorMsg(error); });
                };
                HttpService.prototype.parseErrorMsg = function (error) {
                    var errMsg;
                    if (error instanceof http_1.Response) {
                        var body = error.json() || '';
                        var err = body.error || JSON.stringify(body);
                        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
                    }
                    else {
                        errMsg = error.message ? error.message : error.toString();
                    }
                    return Observable_1.Observable.throw(errMsg);
                };
                HttpService.prototype.parseResponse = function (res) {
                    var resJson = res.json();
                    if (resJson.successful === false) {
                        throw new Error(resJson.error);
                    }
                    return resJson.data;
                };
                return HttpService;
            }());
            HttpService = __decorate([
                core_3.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], HttpService);
            exports_4("default", HttpService);
        }
    };
});
System.register("books/book.model", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Book;
    return {
        setters: [],
        execute: function () {
            Book = (function () {
                function Book() {
                }
                return Book;
            }());
            exports_5("default", Book);
        }
    };
});
System.register("app/services/appStore.service", ["@angular/core", "rxjs/Subject"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, Subject_2, AppStoreService;
    return {
        setters: [
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (Subject_2_1) {
                Subject_2 = Subject_2_1;
            }
        ],
        execute: function () {
            AppStoreService = (function () {
                function AppStoreService() {
                    this._cart = new Array();
                    this._usernameSubject = new Subject_2.Subject();
                    this._cartSubject = new Subject_2.Subject();
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
                    this._cartSubject.next(this._cart);
                };
                return AppStoreService;
            }());
            AppStoreService = __decorate([
                core_4.Injectable(),
                __metadata("design:paramtypes", [])
            ], AppStoreService);
            exports_6("default", AppStoreService);
        }
    };
});
System.register("app/app.component", ["@angular/core", "alert/alert.service", "app/services/http.service", "app/services/appStore.service"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, alert_service_1, http_service_1, appStore_service_1, AppComponent;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (appStore_service_1_1) {
                appStore_service_1 = appStore_service_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent(_alertService, _appStoreService) {
                    this._alertService = _alertService;
                    this._appStoreService = _appStoreService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.alerts = new Array();
                    this._alertService.getAlert().subscribe(function (alert) {
                        _this.alerts = new Array();
                        _this.alerts.push(alert);
                    });
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_5.Component({
                    selector: 'my-app',
                    moduleId: module.id,
                    templateUrl: "app.view.html",
                    providers: [alert_service_1.default, http_service_1.default, appStore_service_1.default]
                }),
                __metadata("design:paramtypes", [alert_service_1.default,
                    appStore_service_1.default])
            ], AppComponent);
            exports_7("AppComponent", AppComponent);
        }
    };
});
System.register("books/books.service", ["@angular/core", "app/services/http.service"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, http_service_2, BookService;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (http_service_2_1) {
                http_service_2 = http_service_2_1;
            }
        ],
        execute: function () {
            BookService = (function () {
                function BookService(_httpService) {
                    this._httpService = _httpService;
                }
                BookService.prototype.getBooks = function (name, author) {
                    name = name === undefined ? "" : name;
                    author = author === undefined ? "" : author;
                    var url = "/api/book/name/" + name + "/author/" + author;
                    return this._httpService.get(url);
                };
                return BookService;
            }());
            BookService = __decorate([
                core_6.Injectable(),
                __metadata("design:paramtypes", [http_service_2.default])
            ], BookService);
            exports_8("default", BookService);
        }
    };
});
System.register("books/books.component", ["@angular/core", "books/books.service", "app/services/appStore.service", "alert/alert.service"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, books_service_1, appStore_service_2, alert_service_2, BooksComponent;
    return {
        setters: [
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (books_service_1_1) {
                books_service_1 = books_service_1_1;
            },
            function (appStore_service_2_1) {
                appStore_service_2 = appStore_service_2_1;
            },
            function (alert_service_2_1) {
                alert_service_2 = alert_service_2_1;
            }
        ],
        execute: function () {
            BooksComponent = (function () {
                function BooksComponent(_bookService, _alertService, _appStoreService) {
                    this._bookService = _bookService;
                    this._alertService = _alertService;
                    this._appStoreService = _appStoreService;
                    this.searcedBooks = new Array();
                }
                BooksComponent.prototype.search = function () {
                    var _this = this;
                    this._bookService.getBooks(this.searchedBookName, this.searchedAuthorName)
                        .subscribe(function (books) {
                        _this.searcedBooks = books;
                    }, function (error) { _this._alertService.showError(error); });
                };
                BooksComponent.prototype.addToCart = function (book) {
                    if (this.isBookInCart(book.id)) {
                        this._alertService.showError(book.name + " has been already added to cart!");
                        return;
                    }
                    this._appStoreService.addBookToCart(book);
                };
                BooksComponent.prototype.isBookInCart = function (bookId) {
                    return this._appStoreService.getCart().find(function (x) { return x.id == bookId; }) !== undefined;
                };
                return BooksComponent;
            }());
            BooksComponent = __decorate([
                core_7.Component({
                    selector: "books",
                    moduleId: module.id,
                    templateUrl: "books.view.html",
                    providers: [books_service_1.default]
                }),
                __metadata("design:paramtypes", [books_service_1.default,
                    alert_service_2.default,
                    appStore_service_2.default])
            ], BooksComponent);
            exports_9("default", BooksComponent);
        }
    };
});
System.register("login/login.model", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var User;
    return {
        setters: [],
        execute: function () {
            User = (function () {
                function User() {
                }
                return User;
            }());
            exports_10("default", User);
        }
    };
});
System.register("login/login.service", ["@angular/core", "app/services/http.service"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_8, http_service_3, LoginService;
    return {
        setters: [
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (http_service_3_1) {
                http_service_3 = http_service_3_1;
            }
        ],
        execute: function () {
            LoginService = (function () {
                function LoginService(_httpService) {
                    this._httpService = _httpService;
                }
                LoginService.prototype.verifyUser = function (username, password) {
                    var url = "/api/account/login/username/" + username + "/password/" + password;
                    return this._httpService.get(url);
                };
                return LoginService;
            }());
            LoginService = __decorate([
                core_8.Injectable(),
                __metadata("design:paramtypes", [http_service_3.default])
            ], LoginService);
            exports_11("default", LoginService);
        }
    };
});
System.register("login/login.component", ["@angular/core", "@angular/forms", "@angular/router", "login/login.service", "alert/alert.service", "app/services/appStore.service"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_9, forms_1, router_1, login_service_1, alert_service_3, appStore_service_3, LoginComponent;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (alert_service_3_1) {
                alert_service_3 = alert_service_3_1;
            },
            function (appStore_service_3_1) {
                appStore_service_3 = appStore_service_3_1;
            }
        ],
        execute: function () {
            LoginComponent = (function () {
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
                core_9.Component({
                    selector: "books",
                    moduleId: module.id,
                    templateUrl: "login.view.html",
                    providers: [login_service_1.default]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    router_1.Router,
                    login_service_1.default,
                    alert_service_3.default,
                    appStore_service_3.default])
            ], LoginComponent);
            exports_12("default", LoginComponent);
        }
    };
});
System.register("navbar/navbar.component", ["@angular/core", "@angular/router", "app/services/appStore.service"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_10, router_2, appStore_service_4, NavBarComponent;
    return {
        setters: [
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (appStore_service_4_1) {
                appStore_service_4 = appStore_service_4_1;
            }
        ],
        execute: function () {
            NavBarComponent = (function () {
                function NavBarComponent(_router, appStoreService) {
                    this._router = _router;
                    this.appStoreService = appStoreService;
                    this.checkoutBooks = new Array();
                }
                NavBarComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.appStoreService.subscribeUsernameChanges().subscribe(function (username) {
                        _this.loginedInUserName = username;
                        _this.isUserLoggedIn = _this.loginedInUserName !== undefined;
                    });
                    this.appStoreService.subscribeCartChanges().subscribe(function (books) {
                        _this.checkoutBooks = books;
                    });
                };
                NavBarComponent.prototype.onLogOut = function () {
                    this.appStoreService.setUsername(undefined);
                    this.appStoreService.clearCart();
                    this._router.navigate(["login"]);
                    this.isUserLoggedIn = false;
                };
                return NavBarComponent;
            }());
            NavBarComponent = __decorate([
                core_10.Component({
                    moduleId: module.id,
                    selector: 'nav-bar',
                    templateUrl: "navbar.view.html"
                }),
                __metadata("design:paramtypes", [router_2.Router,
                    appStore_service_4.default])
            ], NavBarComponent);
            exports_13("default", NavBarComponent);
        }
    };
});
System.register("checkout/checkout.model", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Checkout;
    return {
        setters: [],
        execute: function () {
            Checkout = (function () {
                function Checkout() {
                }
                return Checkout;
            }());
            exports_14("default", Checkout);
        }
    };
});
System.register("checkout/checkout.service", ["@angular/core", "app/services/http.service"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_11, http_service_4, CheckoutService;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (http_service_4_1) {
                http_service_4 = http_service_4_1;
            }
        ],
        execute: function () {
            CheckoutService = (function () {
                function CheckoutService(_httpService) {
                    this._httpService = _httpService;
                }
                CheckoutService.prototype.checkout = function (checkout) {
                    var url = "/api/checkout/";
                    return this._httpService.post(url, checkout);
                };
                return CheckoutService;
            }());
            CheckoutService = __decorate([
                core_11.Injectable(),
                __metadata("design:paramtypes", [http_service_4.default])
            ], CheckoutService);
            exports_15("default", CheckoutService);
        }
    };
});
System.register("checkout/checkout.component", ["@angular/core", "app/services/appStore.service", "checkout/checkout.service", "alert/alert.service", "checkout/checkout.model"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_12, appStore_service_5, checkout_service_1, alert_service_4, checkout_model_1, CheckoutComponent;
    return {
        setters: [
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (appStore_service_5_1) {
                appStore_service_5 = appStore_service_5_1;
            },
            function (checkout_service_1_1) {
                checkout_service_1 = checkout_service_1_1;
            },
            function (alert_service_4_1) {
                alert_service_4 = alert_service_4_1;
            },
            function (checkout_model_1_1) {
                checkout_model_1 = checkout_model_1_1;
            }
        ],
        execute: function () {
            CheckoutComponent = (function () {
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
                core_12.Component({
                    selector: "checkout",
                    moduleId: module.id,
                    templateUrl: "checkout.view.html",
                    providers: [checkout_service_1.default]
                }),
                __metadata("design:paramtypes", [appStore_service_5.default,
                    checkout_service_1.default,
                    alert_service_4.default])
            ], CheckoutComponent);
            exports_16("default", CheckoutComponent);
        }
    };
});
System.register("home/model/checkoutHistorie.model", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var CheckoutHistory;
    return {
        setters: [],
        execute: function () {
            CheckoutHistory = (function () {
                function CheckoutHistory() {
                }
                return CheckoutHistory;
            }());
            exports_17("default", CheckoutHistory);
        }
    };
});
System.register("home/home.service", ["@angular/core", "app/services/http.service"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_13, http_service_5, HomeService;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (http_service_5_1) {
                http_service_5 = http_service_5_1;
            }
        ],
        execute: function () {
            HomeService = (function () {
                function HomeService(_httpService) {
                    this._httpService = _httpService;
                }
                HomeService.prototype.getAllCheckedoutBooks = function (username) {
                    var url = "/api/checkout/user/" + username;
                    return this._httpService.get(url);
                };
                return HomeService;
            }());
            HomeService = __decorate([
                core_13.Injectable(),
                __metadata("design:paramtypes", [http_service_5.default])
            ], HomeService);
            exports_18("default", HomeService);
        }
    };
});
System.register("home/home.component", ["@angular/core", "@angular/forms", "@angular/router", "alert/alert.service", "home/home.service", "app/services/appStore.service"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_14, forms_2, router_3, alert_service_5, home_service_1, appStore_service_6, HomeComponent;
    return {
        setters: [
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (forms_2_1) {
                forms_2 = forms_2_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (alert_service_5_1) {
                alert_service_5 = alert_service_5_1;
            },
            function (home_service_1_1) {
                home_service_1 = home_service_1_1;
            },
            function (appStore_service_6_1) {
                appStore_service_6 = appStore_service_6_1;
            }
        ],
        execute: function () {
            HomeComponent = (function () {
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
                core_14.Component({
                    selector: "home",
                    moduleId: module.id,
                    templateUrl: "home.view.html",
                    providers: [home_service_1.default]
                }),
                __metadata("design:paramtypes", [forms_2.FormBuilder,
                    router_3.Router,
                    alert_service_5.default,
                    home_service_1.default,
                    appStore_service_6.default])
            ], HomeComponent);
            exports_19("default", HomeComponent);
        }
    };
});
System.register("app/app.module", ["@angular/core", "@angular/forms", "@angular/platform-browser", "app/app.component", "@angular/http", "@angular/router", "@angular/common", "books/books.component", "login/login.component", "alert/alert.component", "navbar/navbar.component", "checkout/checkout.component", "home/home.component"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_15, forms_3, platform_browser_1, app_component_1, http_2, router_4, common_1, books_component_1, login_component_1, alert_component_1, navbar_component_1, checkout_component_1, home_component_1, appRoutes, AppModule;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (forms_3_1) {
                forms_3 = forms_3_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (books_component_1_1) {
                books_component_1 = books_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (checkout_component_1_1) {
                checkout_component_1 = checkout_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'books', component: books_component_1.default },
                { path: 'login', component: login_component_1.default },
                { path: 'checkout', component: checkout_component_1.default },
                { path: 'home', component: home_component_1.default }
            ];
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_15.NgModule({
                    imports: [platform_browser_1.BrowserModule, forms_3.FormsModule, forms_3.ReactiveFormsModule, http_2.HttpModule, router_4.RouterModule.forRoot(appRoutes, { useHash: true })],
                    declarations: [app_component_1.AppComponent, home_component_1.default, navbar_component_1.default, books_component_1.default, login_component_1.default, checkout_component_1.default, alert_component_1.default],
                    providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_20("AppModule", AppModule);
        }
    };
});
System.register("books/books.model", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var Book;
    return {
        setters: [],
        execute: function () {
            Book = (function () {
                function Book() {
                }
                return Book;
            }());
            exports_21("default", Book);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app/app.module"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var platform_browser_dynamic_1, app_module_1, platform;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }
        ],
        execute: function () {
            platform = platform_browser_dynamic_1.platformBrowserDynamic();
            platform.bootstrapModule(app_module_1.AppModule);
        }
    };
});
//# sourceMappingURL=app.js.map