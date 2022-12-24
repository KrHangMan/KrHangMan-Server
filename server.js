const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Hangul = require('hangul-js');    // 한글 자모자 분리 library
const mysql = require('mysql2');
const conn = require('./config/db.js');
const users = require('./routes/user');
const words = require('./routes/word');
app.set('port', process.env.DEV_PORT || 3000);
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan('combined'));

app.use('/users',users);
app.use('/words',words);
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
app.listen(process.env.DEV_PORT , () => {  
    console.log('listening on ', process.env.DEV_PORT);
    
    //연결 테스트 
    var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
    connection.connect();   // DB 접속
    
    testQuery = "SELECT * FROM WORDS";
    connection.query(testQuery, function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
       
    });
    connection.end(); // DB 접속 종료
});








