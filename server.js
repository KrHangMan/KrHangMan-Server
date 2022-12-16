const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
const request = require('request');
app.use(bodyParser.urlencoded({extended : true}));
const Hangul = require('hangul-js');    // 한글 자모자 분리 library

const mysql = require('mysql');
const conn = require('./config/db.js');

app.listen(process.env.PORT , () => {  
    console.log('listening on ', process.env.DEV_PORT);
    
    //연결 테스트 
    var connection = mysql.createConnection(conn.local); // DB 커넥션 생성
    connection.connect();   // DB 접속
    
    testQuery = "SELECT COUNT(*) AS CNT FROM WORDS";
    connection.query(testQuery, function (err, results, fields) { // testQuery 실행
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
    connection.end(); // DB 접속 종료
});





