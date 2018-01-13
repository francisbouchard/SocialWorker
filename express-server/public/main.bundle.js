webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a.nav-link {\n    color: white;\n}\n.example-fill-remaining-space {\n    /* This fills the remaining space, by using flexbox. \n       Every toolbar row uses a flexbox row layout. */\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <span>\n    SocialWorker\n    <a class=\"nav-link\" routerLink=\"new-participant\">\n      <button mat-button>New Participant</button>\n    </a>\n    <a class=\"nav-link\" routerLink=\"profiles\">\n      <button mat-button>Profiles</button>\n    </a>\n  </span>\n  <span class=\"example-fill-remaining-space\"></span>\n  <span>\n    <button mat-raised-button color=\"warn\" (click)=\"logout()\">Logout</button>\n  </span>\n</mat-toolbar>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.title = 'app';
    }
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.authenticationService.logout().subscribe(function (data) {
            _this.router.navigateByUrl('/login');
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_materials_module__ = __webpack_require__("../../../../../src/app/modules/materials.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_messages_messages_component__ = __webpack_require__("../../../../../src/app/components/messages/messages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_new_participant_new_participant_component__ = __webpack_require__("../../../../../src/app/components/new-participant/new-participant.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_profiles_profiles_component__ = __webpack_require__("../../../../../src/app/components/profiles/profiles.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_participant_service__ = __webpack_require__("../../../../../src/app/services/participant.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_alert_modal_alert_modal_component__ = __webpack_require__("../../../../../src/app/components/alert-modal/alert-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_participant_profile_participant_profile_component__ = __webpack_require__("../../../../../src/app/components/participant-profile/participant-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_login_login_component__ = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */]
    },
    {
        path: 'profiles',
        component: __WEBPACK_IMPORTED_MODULE_11__components_profiles_profiles_component__["a" /* ProfilesComponent */]
    },
    {
        path: 'new-participant',
        component: __WEBPACK_IMPORTED_MODULE_10__components_new_participant_new_participant_component__["a" /* NewParticipantComponent */]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_16__components_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'participant-profile/:_id',
        component: __WEBPACK_IMPORTED_MODULE_15__components_participant_profile_participant_profile_component__["a" /* ParticipantProfileComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_messages_messages_component__["a" /* MessagesComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_new_participant_new_participant_component__["a" /* NewParticipantComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_profiles_profiles_component__["a" /* ProfilesComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_alert_modal_alert_modal_component__["a" /* AlertModalComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_participant_profile_participant_profile_component__["a" /* ParticipantProfileComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__modules_materials_module__["a" /* MaterialsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forRoot(routes)
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_14__components_alert_modal_alert_modal_component__["a" /* AlertModalComponent */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__services_participant_service__["a" /* ParticipantService */],
                __WEBPACK_IMPORTED_MODULE_12__services_message_service__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_17__services_authentication_service__["a" /* AuthenticationService */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/alert-modal/alert-modal.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/alert-modal/alert-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.message}}</h1>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"ok()\">Ok</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/alert-modal/alert-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var AlertModalComponent = (function () {
    function AlertModalComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    AlertModalComponent.prototype.ngOnInit = function () {
    };
    AlertModalComponent.prototype.ok = function () {
        this.dialogRef.close();
    };
    AlertModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-alert-modal',
            template: __webpack_require__("../../../../../src/app/components/alert-modal/alert-modal.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/alert-modal/alert-modal.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialogRef */], Object])
    ], AlertModalComponent);
    return AlertModalComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  Dashboard Page\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
        console.log("constructor of dash");
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log("dash");
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\">\n  <div fxLayout=\"row wrap\" fxLayoutAlign=\"space-around center\" fxFlex=\"100\">\n    <mat-card style=\"width:50%\">\n      <mat-card-title>\n        Login\n      </mat-card-title>\n      <form name=\"form\" (ngSubmit)=\"login()\" *ngIf=\"!loading\">\n        <mat-card-content>\n\n          <div class=\"form-group\">\n            <mat-form-field>\n              <label for=\"email\">Email</label>\n              <input name=\"email\" matInput type=\"email\" class=\"form-control\" id=\"email\" [(ngModel)]=\"user.email\" #email=\"ngModel\" required>\n            </mat-form-field>\n          </div>\n\n          <div class=\"form-group\">\n            <mat-form-field>\n              <label for=\"password\">Password</label>\n              <input matInput name=\"password\" type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\"\n                required>\n            </mat-form-field>\n\n          </div>\n\n\n\n\n        </mat-card-content>\n        <mat-card-actions>\n          <button mat-raised-button color=\"primary\" type=\"submit\">Submit</button>\n        </mat-card-actions>\n      </form>\n      <mat-spinner *ngIf=\"loading\"></mat-spinner>\n      <div *ngIf=\"error\">\n          <i class=\"fa fa-exclamation\" aria-hidden=\"true\"></i>\n          <mat-icon>error</mat-icon>\n          <h4>{{msg}}</h4>\n      </div>\n      \n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("../../../../../src/app/services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.user = {};
        this.loading = false;
        this.error = false;
        this.msg = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.user.email, this.user.password).subscribe(function (data) {
            _this.loading = false;
            _this.router.navigateByUrl('/dashboard');
        }, function (err) {
            console.log(err);
            _this.loading = false;
            _this.error = true;
            _this.msg = err.message;
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/components/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/messages/messages.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/messages/messages.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"messageService.messages.length\">\n  <h5>Messages:</h5>\n  <p *ngFor=\"let message of messageService.messages\">{{message}}</p>\n  <button mat-button (click)=\"messageService.clear()\">Clear</button>\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/components/messages/messages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesComponent = (function () {
    function MessagesComponent(messageService) {
        this.messageService = messageService;
    }
    MessagesComponent.prototype.ngOnInit = function () {
    };
    MessagesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-messages',
            template: __webpack_require__("../../../../../src/app/components/messages/messages.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_message_service__["a" /* MessageService */]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/new-participant/new-participant.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-form-field {\n    max-width: 240px;\n    display: block;\n}\n\nbutton{\n    margin-top: 18px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/new-participant/new-participant.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <form class=\"form\">\n    <mat-form-field>\n      <input matInput required (keyup.enter)=\"onKey('_id', id.value)\" (blur)=\"onKey('_id', id.value)\" #id placeholder=\"Id\" name=\"_id\" [(ngModel)]=\"participantData._id\">\n    </mat-form-field>\n    <!-- TODO: use mat-error -->\n    <div *ngIf=\"isAlreadyAParticipantID\" style=\"color:red\">This is already associated to a participant!</div>\n\n    <mat-form-field>\n      <input matInput required placeholder=\"Name\" name=\"name\" [(ngModel)]=\"participantData.name\">\n      <mat-hint align=\"start\">\n        <strong>Do not use participant's legal name</strong>\n      </mat-hint>\n    </mat-form-field>\n\n    <mat-form-field>\n      <span matPrefix>+1 &nbsp;</span>\n      <input type=\"tel\" matInput placeholder=\"Telephone\" name=\"telephone\" [(ngModel)]=\"participantData.telephone\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput placeholder=\"Social media handle\" name=\"socialmedia\" [(ngModel)]=\"participantData.socialmedia\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput (keyup.enter)=\"onKey('email', email.value)\" (blur)=\"onKey('email', email.value)\" #email placeholder=\"Email address\" name=\"email\" [(ngModel)]=\"participantData.email\">\n    </mat-form-field>\n    <!-- TODO: use mat-error -->\n    <div *ngIf=\"isAlreadyAParticipantEmail\" style=\"color:red\">This is already associated to a participant!</div>\n\n\n    <mat-form-field>\n      <input matInput placeholder=\"Physical Address\" name=\"address\" [(ngModel)]=\"participantData.address\">\n      <mat-hint align=\"start\">\n        <strong>Optional</strong>\n      </mat-hint>\n    </mat-form-field>\n\n  </form>\n  <button mat-raised-button (click)=\"submit()\">Submit</button>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/components/new-participant/new-participant.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewParticipantComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_participant_service__ = __webpack_require__("../../../../../src/app/services/participant.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alert_modal_alert_modal_component__ = __webpack_require__("../../../../../src/app/components/alert-modal/alert-modal.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewParticipantComponent = (function () {
    function NewParticipantComponent(participantService, dialog) {
        this.participantService = participantService;
        this.dialog = dialog;
        this.participantData = {
            _id: "",
            name: "",
            address: "",
            telephone: "",
            email: "",
            socialmedia: ""
        };
        this.isAlreadyAParticipantID = false;
        this.isAlreadyAParticipantEmail = false;
    }
    NewParticipantComponent.prototype.ngOnInit = function () {
    };
    /**
     * Verify if attribute and value of the given input has
     * already been associated to a participant.
     *
     * @param {*} event
     * @memberof NewParticipantComponent
     */
    NewParticipantComponent.prototype.onKey = function (attribute, value) {
        var query = attribute + '=' + value;
        var that = this;
        this.participantService.search(query)
            .subscribe(function (data) {
            if (attribute == "_id") {
                that.isAlreadyAParticipantID = (data == true) ? true : false;
            }
            else {
                that.isAlreadyAParticipantEmail = (data == true) ? true : false;
            }
        });
    };
    /**
     * Alert user of response success or fail.
     *
     * @param {any} message
     * @memberof NewParticipantComponent
     */
    NewParticipantComponent.prototype.alertModal = function (message) {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__alert_modal_alert_modal_component__["a" /* AlertModalComponent */], {
            width: '250px',
            data: { message: message }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    /**
     * Submit new participant profile information.
     *
     * @memberof NewParticipantComponent
     */
    NewParticipantComponent.prototype.submit = function () {
        var _this = this;
        this.participantService.save(this.participantData)
            .subscribe(function (data) {
            if (data.hasOwnProperty("errmsg")) {
                _this.alertModal("Could not add new participant.");
            }
            else {
                _this.alertModal("New participant successfully added.");
            }
        });
    };
    NewParticipantComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-new-participant',
            template: __webpack_require__("../../../../../src/app/components/new-participant/new-participant.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/new-participant/new-participant.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_participant_service__["a" /* ParticipantService */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["d" /* MatDialog */]])
    ], NewParticipantComponent);
    return NewParticipantComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/participant-profile/participant-profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/participant-profile/participant-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"participantSelected\">\n  <h2>{{participantSelected.name}}</h2>\n  <p>Email: {{participantSelected.email}}</p>\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/components/participant-profile/participant-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParticipantProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_participant_service__ = __webpack_require__("../../../../../src/app/services/participant.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__participant_participant__ = __webpack_require__("../../../../../src/app/components/participant/participant.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ParticipantProfileComponent = (function () {
    function ParticipantProfileComponent(route, participantService, location) {
        this.route = route;
        this.participantService = participantService;
        this.location = location;
    }
    ParticipantProfileComponent.prototype.ngOnInit = function () {
        this.getParticipant();
    };
    /**
     *
     * Updates the participant based on the _id
     *
     */
    ParticipantProfileComponent.prototype.getParticipant = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('_id');
        this.participantService.get(id).subscribe(function (participantSelected) {
            if (participantSelected != null) {
                _this.participantSelected = participantSelected;
            }
            else {
                console.log('Participant does not exist anymore.');
                _this.location.back();
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__participant_participant__["a" /* Participant */])
    ], ParticipantProfileComponent.prototype, "participantSelected", void 0);
    ParticipantProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-participant-profile',
            template: __webpack_require__("../../../../../src/app/components/participant-profile/participant-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/participant-profile/participant-profile.component.css")]
        })
        /**
         *  This mini-component takes care of a single selected profile of a participant
         */
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3__services_participant_service__["a" /* ParticipantService */], __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], ParticipantProfileComponent);
    return ParticipantProfileComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/participant/participant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Participant; });
var Participant = (function () {
    function Participant() {
    }
    return Participant;
}());



/***/ }),

/***/ "../../../../../src/app/components/profiles/profiles.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-card {\n  width: 400px;\n}\n\n.example-header-image {\n  background-image: url('http://profile.actionsprout.com/default.jpeg');\n  background-size: cover;\n}\n\na{\n  text-decoration: none;\n  color: black;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/profiles/profiles.component.html":
/***/ (function(module, exports) {

module.exports = "<br>\n<div *ngFor=\"let profile of profiles\">\n<mat-card class=\"example-card\">\n  <mat-card-header>\n    <div mat-card-avatar class=\"example-header-image\"></div>\n    <mat-card-title><b>Name: {{profile.name}}</b></mat-card-title>\n    <mat-card-subtitle>ID: {{profile._id}}</mat-card-subtitle>\n    <mat-card-subtitle>{{profile.email}}</mat-card-subtitle>\n  </mat-card-header>\n  <mat-card-content>\n   <b> Address: {{profile.address}}</b><br>\n   <b> Phone number: {{profile.phone}}</b>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-raised-button><a routerLink=\"/participant-profile/{{profile._id}}\">View Profile</a></button>\n    <button mat-raised-button (click)=\"delete(profile._id)\">Delete Profile</button>\n  </mat-card-actions>\n</mat-card><br>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/profiles/profiles.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_participant_service__ = __webpack_require__("../../../../../src/app/services/participant.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilesComponent = (function () {
    function ProfilesComponent(participantService) {
        this.participantService = participantService;
    }
    ProfilesComponent.prototype.loadProfiles = function () {
        var _this = this;
        this.participantService.getAll()
            .subscribe(function (data) {
            _this.profiles = data;
        });
    };
    ProfilesComponent.prototype.getProfile = function (pid) {
        var _this = this;
        this.participantService.get(pid)
            .subscribe(function (data) {
            _this.profiles = [data];
        });
    };
    ProfilesComponent.prototype.delete = function (pid) {
        var _this = this;
        this.participantService.delete(pid)
            .subscribe(function (data) {
            console.log('Deleted: ' + data);
            _this.loadProfiles();
        });
    };
    ProfilesComponent.prototype.ngOnInit = function () {
        this.loadProfiles();
    };
    ProfilesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-profiles',
            template: __webpack_require__("../../../../../src/app/components/profiles/profiles.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/profiles/profiles.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_participant_service__["a" /* ParticipantService */]])
    ], ProfilesComponent);
    return ProfilesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/modules/materials.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__ = __webpack_require__("../../../material/esm5/expansion.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_cdk_table__ = __webpack_require__("../../../cdk/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_progress_spinner__ = __webpack_require__("../../../material/esm5/progress-spinner.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var MaterialsModule = (function () {
    function MaterialsModule() {
    }
    MaterialsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["h" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["k" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_material_expansion__["a" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["j" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["i" /* MatOptionModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material_progress_spinner__["a" /* MatProgressSpinnerModule */]
            ]
        })
    ], MaterialsModule);
    return MaterialsModule;
}());



/***/ }),

/***/ "../../../../../src/app/services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email, password) {
        return this.http.post('/user/login', { email: email, password: password });
    };
    AuthenticationService.prototype.logout = function () {
        return this.http.post('/user/logout', {});
    };
    AuthenticationService.prototype.signup = function (email, password, confirmPassword) {
        return this.http.post('/user/signup', {});
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "../../../../../src/app/services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MessageService = (function () {
    function MessageService() {
        this.messages = [];
    }
    /**
   * Add message to the cache
   * @param {string} message
   * @memberof MessageService
   */
    MessageService.prototype.add = function (message) {
        this.messages.push(message);
    };
    /**
     * Clear messages from the cache
     * @memberof MessageService
     */
    MessageService.prototype.clear = function () {
        this.messages = [];
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "../../../../../src/app/services/participant.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParticipantService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ParticipantService = (function () {
    function ParticipantService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.url = 'http://localhost:3000/participant/';
    }
    /**
     * Get participant by ID
     *
     * @param {any} participantID
     * @returns {Observable<Object>}
     * @memberof ParticipantService
     */
    ParticipantService.prototype.get = function (participantID) {
        var _this = this;
        return this.http.get(this.url + "/" + participantID)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* tap */])(function (participant) { return _this.log('fetched a participant'); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('get(participantID)')));
    };
    /**
     * Get all participants
     *
     * @returns {Observable<Object>}
     * @memberof ParticipantService
     */
    ParticipantService.prototype.getAll = function () {
        var _this = this;
        return this.http.get(this.url)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* tap */])(function (participants) { return _this.log('fecthed all participants'); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('getAll()')));
    };
    /**
     * Save a new participant profile
     *
     * @param {any} participantData
     * @returns {Observable<Object>}
     * @memberof ParticipantService
     */
    ParticipantService.prototype.save = function (participantData) {
        var _this = this;
        return this.http.post(this.url, participantData)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* tap */])(function (p) {
            if (p.hasOwnProperty("errmsg")) {
                console.log("has err msg");
                _this.log('did not save new participant');
            }
            else {
                _this.log('saved new participant');
            }
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('save(participantData)')));
    };
    /**
     * Delete a participant by ID
     *
     * @param {any} participantID
     * @returns {Observable<Object>}
     * @memberof ParticipantService
     */
    ParticipantService.prototype.delete = function (participantID) {
        var _this = this;
        return this.http.delete(this.url + "/" + participantID)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* tap */])(function (_) { return _this.log('deleted participant'); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('delete(participantID)')));
    };
    /**
     * Search participants to see if account email already exists,
     * or it participant ID has already been taken.
     *
     * @param {any} participantAttributeValuePair
     * @returns {Observable<Object>}
     * @memberof ParticipantService
     */
    ParticipantService.prototype.search = function (participantAttributeValuePair) {
        var _this = this;
        return this.http.get(this.url + "/search/" + participantAttributeValuePair)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["b" /* map */])(function (participants) { return participants[0] ? true : false; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* tap */])(function (_) { return _this.log('searched participant'); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["a" /* catchError */])(this.handleError('search participant information')));
    };
    /**
     * Log messages by sending them to message service
     *
     * @private
     * @param {String} message
     * @memberof ParticipantService
     */
    ParticipantService.prototype.log = function (message) {
        this.messageService.add('Participant Service: ' + message);
    };
    /**
     * Capture errors from the service, then log them,
     * and let the app keep running with a returned Observable
     *
     * @private
     * @template T
     * @param {string} [operation='operation']
     * @param {T} [result]
     * @returns
     * @memberof ParticipantService
     */
    ParticipantService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            _this.log(operation + " failed - " + error.message);
            return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["a" /* of */])(result);
        };
    };
    ParticipantService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__message_service__["a" /* MessageService */]])
    ], ParticipantService);
    return ParticipantService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map