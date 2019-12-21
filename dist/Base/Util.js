"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * Get current time
     */
    Util.currentTime = function () {
        return moment_1.default.utc().utcOffset(Util.TIME_ZONE);
    };
    /**
     * Generate code
     */
    Util.genId = function () {
        var generate = require('nanoid/generate');
        return generate('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 9).toUpperCase();
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
    // @nhancv 10/13/19: Check boolean type
    Util.isBoolean = function (input) {
        return input === false || input === true;
    };
    Util.isString = function (input) {
        return Object.prototype.toString.call(input) === "[object String]";
    };
    return Util;
}());
exports.default = Util;
//# sourceMappingURL=Util.js.map