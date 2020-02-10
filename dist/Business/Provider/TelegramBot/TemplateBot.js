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
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = __importDefault(require("telegraf"));
var RilModule_1 = __importDefault(require("../../../Base/RilModule"));
var ChatIdCommand_1 = __importDefault(require("./Command/ChatIdCommand"));
var TemplateBot = /** @class */ (function (_super) {
    __extends(TemplateBot, _super);
    function TemplateBot() {
        var _this = _super.call(this) || this;
        _this.command = {};
        _this.commandData = {};
        _this.sendMessageToAdmin = function (message) {
            _this.bot.telegram.sendMessage(_this.botAdminChannelId, message).catch(function (error) {
                console.error(error);
            });
        };
        _this.sendMessage = function (message, botChannelId) {
            _this.bot.telegram.sendMessage(botChannelId, message).catch(function (error) {
                console.error(error);
            });
        };
        _this.sendDocument = function (document, botChannelId) {
            _this.bot.telegram.sendDocument(botChannelId, document).catch(function (error) {
                console.error(error);
            });
        };
        _this.isAdmin = function (id) {
            // @nhancv 9/14/19: Need to parse fromId to String in indexOf case
            return id == _this.botAdminId;
        };
        _this.botToken = process.env.BOT_TOKEN;
        _this.botAdminId = process.env.BOT_ADMIN_ID;
        _this.botAdminChannelId = process.env.BOT_ADMIN_CHANNEL_ID;
        _this.chatIdCommand = new ChatIdCommand_1.default('chat_id', 'Get chatId', _this);
        return _this;
    }
    TemplateBot.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.bot = new telegraf_1.default(this.botToken);
                this.bot.telegram.getMe().then(function (botInfo) {
                    _this.bot.options.username = botInfo.username;
                });
                //middleware
                this.bot.use(function (ctx, next) {
                    if (ctx.updateType == 'callback_query' || ctx.updateType == 'message') {
                        return next(ctx);
                    }
                });
                this.bot.start(function (ctx) { return ctx.reply("Xin ch\u00E0o " + ctx.message.from.first_name + " " + ctx.message.from.last_name + "\n G\u00F5 /help \u0111\u1EC3 \u0111\u01B0\u1EE3c h\u01B0\u1EDBng d\u1EABn chi ti\u1EBFt nh\u00E9."); });
                this.bot.help(function (ctx) {
                    ctx.reply(_this.getCommandHelp(_this.chatIdCommand) /* TODO: Add command help here */, { reply_markup: { remove_keyboard: true } });
                    _this.resetCommand(String(ctx.message.from.id));
                });
                this.bot.command(this.chatIdCommand.id, this.chatIdCommand.commandCallback);
                /* TODO: Declare command callback */
                // @nhancv 2019-08-31: reset command
                this.bot.on('text', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var fromId;
                    return __generator(this, function (_a) {
                        try {
                            fromId = String(ctx.message.from.id);
                            switch (this.command[fromId]) {
                                /* TODO: Add command on text */
                                default:
                                    this.resetCommand(fromId);
                                    break;
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    TemplateBot.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.bot) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bot.launch()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    TemplateBot.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.bot) {
                    this.bot.stop();
                }
                return [2 /*return*/];
            });
        });
    };
    TemplateBot.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.bot = null;
                return [2 /*return*/];
            });
        });
    };
    TemplateBot.prototype.resetCommand = function (fromId) {
        this.command[fromId] = null;
        this.commandData[fromId] = null;
    };
    TemplateBot.prototype.getCommandHelp = function (command) {
        return "/" + command.id + " - " + command.text;
    };
    return TemplateBot;
}(RilModule_1.default));
exports.default = TemplateBot;
//# sourceMappingURL=TemplateBot.js.map