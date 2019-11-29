"use strict";
/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Octopus_1 = require("./InitData/Octopus");
var SystemRepo_1 = require("./Orm/SystemRepo");
var InitSystem_1 = require("./InitData/InitSystem");
var logger = console;
// Run on main index.ts
var MongoMigrate = /** @class */ (function () {
    function MongoMigrate() {
    }
    MongoMigrate.prototype.migrate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var octopus, systemConfigs, config, dbVersion, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        octopus = new Octopus_1.Octopus();
                        return [4 /*yield*/, new SystemRepo_1.SystemRepo().getAll()];
                    case 1:
                        systemConfigs = _a.sent();
                        config = systemConfigs[0];
                        if (!(config == undefined)) return [3 /*break*/, 4];
                        // @nhancv 9/22/19: Re-init system config
                        return [4 /*yield*/, octopus.initData(new InitSystem_1.InitSystem())];
                    case 2:
                        // @nhancv 9/22/19: Re-init system config
                        _a.sent();
                        return [4 /*yield*/, new SystemRepo_1.SystemRepo().getAll()];
                    case 3:
                        systemConfigs = _a.sent();
                        config = systemConfigs[0];
                        _a.label = 4;
                    case 4:
                        dbVersion = config ? config.hasOwnProperty("dbVersion") ? config.dbVersion : 0 : 0;
                        logger.info("Current database version: " + dbVersion);
                        if (!(dbVersion == 0)) return [3 /*break*/, 6];
                        logger.info("Migrating from version " + dbVersion);
                        //@nhancv 11/29/19
                        //TODO: Do something here for first version like initial tables
                        //...
                        // Increase dbVersion to 1
                        config.dbVersion = 1;
                        dbVersion = config.dbVersion;
                        // Update new config object
                        return [4 /*yield*/, new SystemRepo_1.SystemRepo().update({ _id: config._id }, config)];
                    case 5:
                        // Update new config object
                        _a.sent();
                        logger.info("Migrate to version " + dbVersion + " completely");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        logger.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return MongoMigrate;
}());
exports.MongoMigrate = MongoMigrate;
//# sourceMappingURL=MongoMigrate.js.map