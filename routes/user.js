const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2');
//const { connectDB } = require("./middleware-db");

router.post('/', async (req, res, next) => {            
    try {           
        var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
        connection.connect();
        const get_user = req.body.username;
        const new_user = `insert into USERS(username,correct_cnt) values ('${String(get_user)}', 0); `
        connection.query(new_user, function (err,  fields) { 
            if (err) {
                console.log(err);
            } 
        });
        return res.status(200).json({
            "code": 200,
            "message": "ok"
        });  
    } catch (error) {
        console.error(error);  
        res.status(500).json({
        "code":500,
        "message": "server error"
        });
    }
    });


router.get('/rank', async (req, res, next) => {            
    try {           
        var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
        connection.connect();   // DB 접속
        const rank_query = `select username from USERS;  `
        const rank_data =  connection.query(rank_query, function (err,  results,fields) { // testQuery 실행
            if (err) {
                console.log(err);
                res.status(404).json({
                    "code": 404,
                    "message": "Not found Rank"
                });  
           
            }
        
        });
        console.log(rank_data);
        return res.status(200).json({
            rank_data,
            "code": 200,
            "message": "ok"
        });  


    } catch (error) {
        console.error(error);  
        res.status(500).json({
        "code":500,
        "message": "server error"
        });
    }
    });





















module.exports = router;