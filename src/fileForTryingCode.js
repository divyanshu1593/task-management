"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var obs = new rxjs_1.Observable(function (subscribe) {
    subscribe.next(5);
});
var x = obs.subscribe();
console.log(x);
