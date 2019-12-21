"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Developed by Nhan Cao on 11/22/19, 2:46 PM.
 * Last modified 11/22/19, 2:45 PM.
 * Copyright (c) 2019 Rilthot. All rights reserved.
 */
var moment_1 = __importDefault(require("moment"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var morgan_1 = __importDefault(require("morgan"));
var Controller = __importStar(require("./Controller"));
var RilModule_1 = __importDefault(require("../Base/RilModule"));
var Util_1 = __importDefault(require("../Base/Util"));
var Log_1 = __importDefault(require("../Base/Log"));
var Gateway = /** @class */ (function (_super) {
    __extends(Gateway, _super);
    function Gateway() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AUTH_TOKEN = process.env.AUTHENTICATION_TOKEN ? process.env.AUTHENTICATION_TOKEN : '';
        return _this;
    }
    Gateway.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var app, port, morganFormat, aboutController, hostname;
            var _this = this;
            return __generator(this, function (_a) {
                app = express_1.default();
                port = parseInt(process.env.PORT || '7777');
                //////////////////////////////////////////////////////////////////
                /**
                 * Config app
                 */
                // Body parser: https://github.com/expressjs/body-parser
                app.use(body_parser_1.default.urlencoded({ extended: false }));
                app.use(body_parser_1.default.json());
                // CORS on ExpressJS: https://github.com/expressjs/cors
                app.use(cors_1.default());
                // Cookie parser: https://github.com/expressjs/cookie-parser
                app.use(cookie_parser_1.default());
                // Use gzip compression
                app.use(compression_1.default());
                // Config http logging with morgan
                morgan_1.default.token('date', function (req, res, tz) { return moment_1.default().utc().utcOffset("+0700").format(); });
                morganFormat = '[:date] :method :url :status - :response-time ms :user-agent';
                app.use(morgan_1.default(morganFormat));
                aboutController = new Controller.About();
                /**
                 * API calls, use Postman for testing
                 * This block should declare before default route
                 */
                app.get('/api/about', aboutController.getAbout);
                //////////////////////////////////////////////////////////////////
                /**
                 * Default routing
                 */
                app.get('*', function (req, res) {
                    var token = req.header('token');
                    if (!Util_1.default.isEmpty(token) && _this.AUTH_TOKEN == token) {
                        var goodResponse = {
                            code: 200,
                            body: 'Good.'
                        };
                        return res.status(goodResponse.code).json(goodResponse);
                    }
                    var response = {
                        code: 500,
                        body: 'Fuck you.'
                    };
                    return res.status(response.code).json(response);
                });
                hostname = process.env.NODE_ENV == 'dev' ? 'localhost' : 'localhost';
                try {
                    app.listen(port, hostname, function () {
                        Log_1.default.info("Server " + process.env.NODE_ENV + " listening at port " + port);
                    });
                }
                catch (e) {
                    console.error(e);
                }
                return [2 /*return*/];
            });
        });
    };
    return Gateway;
}(RilModule_1.default));
exports.default = Gateway;
//# sourceMappingURL=index.js.map