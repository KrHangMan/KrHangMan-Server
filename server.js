const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');

const users = require('./routes/user');
const words = require('./routes/word');
app.set('port', process.env.DEV_PORT || 3000);
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('combined'));
app.use(helmet({ contentSecurityPolicy: false}));
app.use(hpp());
app.use('/api/users', users);
app.use('/api/words', words);
const logger = require('./config/logger.js');

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    logger.error(error);
    error.status = 404;
    next(error);
});

app.listen(process.env.DEV_PORT , () => {  
    logger.info('listening on ', process.env.DEV_PORT);
});








