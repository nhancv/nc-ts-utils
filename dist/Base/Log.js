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
// Init logger
var moment_1 = __importDefault(require("moment"));
var winston = __importStar(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var environment = process.env.NODE_ENV || 'dev';
// @nhancv 2019-09-10: Format log with specific timezone
var logFormat = winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf(function (info) { return moment_1.default(info.timestamp).utc().utcOffset("+0700").format() + '-' + environment + '-message:' + info.message; }));
// @nhancv 2019-09-10: MongoConnect for file transport
var fileTransport = new winston_daily_rotate_file_1.default({
    filename: './logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    handleExceptions: true,
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: '15d'
});
// @nhancv 2019-09-10: MongoConnect for console transport
var consoleTransport = new winston.transports.Console({
    handleExceptions: true,
});
// @nhancv 2019-09-10: Create new logger id
winston.loggers.add('Logger', {
    format: logFormat,
    transports: [
        fileTransport,
        consoleTransport,
    ]
});
exports.default = winston.loggers.get('Logger');
//# sourceMappingURL=Log.js.map