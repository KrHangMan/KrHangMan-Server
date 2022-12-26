const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');
//const { connectDB } = require("./middleware-db");

/** create a new user  */
router.post('/', async (req, res, next) => {            
    try {           
        var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
        connection.connect();
        const get_user = req.body.username;
        const new_user = `insert into USERS(username, correct_cnt) values ('${String(get_user)}', 0); `
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

/** update user "correct_cnt" */
router.patch('/:username', async (req, res, next) => {            
    try {           
        var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
        connection.connect();

        const username      = req.params.username;
        const correct_cnt   = req.body.correct_cnt;

        console.log("body :" , req.body, "username : ", username , " | correct_cnt : " , correct_cnt);
        
        var query =  `UPDATE USERS 
                            SET CORRECT_CNT = '${parseInt(correct_cnt)}' + 
                            (SELECT CORRECT_CNT 
                            FROM (
                                    SELECT CORRECT_CNT 
                                    FROM USERS 
                                    WHERE USERNAME = '${String(username)}'
                                ) TMP
                            ) 
                      WHERE USERNAME = '${String(username)}';`;
        
         console.log("query : ", query);

        connection.query(query, function (err,  fields) { 
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

/** update user "correct_cnt" */
router.get('/rank', async (req, res, next) => {            
    try {           
        var connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
        await connection.connect();   // DB 접속
        const rank_query = `select username, correct_cnt from USERS order by correct_cnt desc limit 10;   `
        const rank_data =   await connection.query(rank_query);
        if(rank_data == null || undefined){
            return res.status(404).json({
                rank_data,
                "code": 404,
                "message": "Not found Rank"
        });
        }
       for(var i =0; i<rank_data[0].length;i++){
         rank_data[0][i].Rank = i+1;
       }
       console.log(rank_data[0]);
       const add_rank = rank_data[0];
        return res.status(200).json({
            add_rank,
            "code": 200,
            "message": "ok"
        });  
    } catch (error) {
        console.error(error);  
        return res.status(500).json({
        "code":500,
        "message": "server error"
        });
    }
});





















module.exports = router;