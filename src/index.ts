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

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import * as ENV from "./env";
import * as Controller from "./controller";

const config = ENV.get();
const app = express();
const log = console.log;
const port = parseInt(process.env.PORT || '7090');

//////////////////////////////////////////////////////////////////
/**
 * Config app
 */
// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors());
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// Use gzip compression
app.use(compression());
// Config http logging with morgan
const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';
app.use(morgan(morganFormat));
//////////////////////////////////////////////////////////////////
/**
 * Declare controller
 */
const aboutController: Controller.IAbout = new Controller.About();

/**
 * API calls, use Postman for testing
 * This block should declare before default route
 */
//About module
app.get('/api/about', aboutController.getAbout);


//////////////////////////////////////////////////////////////////
/**
 * Default routing
 */
app.get('*', (req, res) => {
  res.redirect('/api/about')
});

/**
 * Start listen only on localhost domain
 */
app.listen(port, 'localhost', () => {
  log('Server %s listening at port %d', config.env, port);
});

