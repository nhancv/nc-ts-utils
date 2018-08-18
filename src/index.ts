import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

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

app.get('/', function(req, res) {
  res.send('<center><h1>Hello cu</h1></center>');
});

app.listen(port, function() {
  log('Server listening at port %d', port);
});

log(config);
