"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.currentTime = function () {
        return moment_1.default.utc().utcOffset(Util.TIME_ZONE);
    };
    Util.currentTimeStr = function () {
        return moment_1.default.utc().utcOffset(Util.TIME_ZONE).format("YYYY-MM-DD HH:mm");
    };
    Util.currentUTC = function () {
        return moment_1.default.utc();
    };
    Util.currentUTCUnix = function () {
        return this.currentUTC().unix();
    };
    Util.currentUTCTimestamp = function () {
        return this.currentUTC().toDate().getTime();
    };
    /**
     * Generate code
     */
    Util.genId = function () {
        var generate = require('nanoid/generate');
        return generate('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 9).toUpperCase();
    };
    Util.isTrue = function (value) {
        if (typeof (value) === 'string') {
            value = value.trim().toLowerCase();
        }
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    };
    Util.TIME_ZONE = "+0700";
    // @nhancv 10/13/19: Check null and undefined
    Util.isNull = function (input) {
        return input === null || input === undefined;
    };
    // @nhancv 10/13/19: Check string empty
    Util.isEmpty = function (input) {
        return Util.isNull(input) || input.length === 0;
    };
    Util.isString = function (input) {
        return Object.prototype.toString.call(input) === "[object String]";
    };
    Util.replaceAll = function (input, search, replaceValue) {
        if (search === void 0) { search = / /gm; }
        if (replaceValue === void 0) { replaceValue = ''; }
        return input.replace(search, replaceValue);
    };
    return Util;
}());
exports.default = Util;
//# sourceMappingURL=Util.js.map