import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

const config = require('./env.js').get(process.env.NODE_ENV);
const app = express();
const log = console.log;
const port = process.env.PORT || 7090;

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors());
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// Use gzip compression
app.use(compression());

/**
 * API calls, use Postman for testing
 * This block should declare before default route
 */
app.get('/api/about', function (req, res) {
  res.json({'about': 'https://nhancv.github.io'});
});

/**
 * Default routing
 */
app.get('*', function (req, res) {
  res.redirect('/api/about')
});

/**
 * Start listen
 */
app.listen(port, function() {
  log('Server listening at port %d', port);
});

log(config);
