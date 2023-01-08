const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');

/** create a new user  */
router.post('/', async (req, res, next) => {    
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();         
    try {  
        const get_user = req.body.username;
        const user_sign = `select * from USERS where username = '${String(get_user)}'; `
        const result = await connection.query(user_sign);

        if(result[0][0] !== undefined || null){
            return res.status(203).json({
                code: 203,
                message: "username already exists"
            });
        }
        
        const new_user = `INSERT INTO USERS(username, correct_cnt) VALUES ('${String(get_user)}', 0); `
        await connection.query(new_user);
        return res.status(202).json({
            code: 202,
            message: "username enroll"
        });
        
        
    } catch (error) {
        console.error(error);  
        res.status(500).json({
        "code":500,
        "message": "server error"
        });
    }finally{
       connection.end();  
    }

});

/** update user "correct_cnt" */
router.patch('/:username', async (req, res, next) => {   
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();   // DB 접속         
    try {           
        const username    = req.params.username;
        const correct_cnt   = req.body.correct_cnt;
        const query =  `UPDATE USERS  SET CORRECT_CNT = '${parseInt(correct_cnt)}' 
                        WHERE USERNAME = '${String(username)}';`

        const res_data =  await connection.query(query);
        connection.commit();
        return res.status(200).json({
            "code": 200,
            "message": "update correct_cnt success"
        });  

    } catch (error) {
        console.error(error);  
        res.status(500).json({
            "code":500,
            "message": "server error"
        });
    }finally{
        connection.end();
     }
});

/** spread rank up to 10 in users */
router.get('/rank',  async (req, res, next) => {    
    const connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
    await connection.connect();   // DB 접속        
    try {           
        const rank_query = `SELECT 
                                username, 
                                correct_cnt, 
                                ROW_NUMBER() OVER (ORDER BY correct_cnt DESC, username ASC) AS 'rank'
                            FROM USERS 
                            LIMIT 10; `;

        const rank_data =   await connection.query(rank_query);
        if(rank_data == null || undefined){
            return res.status(404).json({
                "code": 404,
                "message": "Not found Rank"
            });
        }
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
    }finally{
        connection.end();
     }
});

/** response userrank */
router.get('/rank/:username', async (req, res, next) => {            
    try {           
        var connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
        await connection.connect();   // DB 접속

        const username   = req.params.username;
        const rank_query = `SELECT 
                                E.username,
                                E.ranking
                            FROM 
                                (SELECT 
                                    username, 
                                    ROW_NUMBER() OVER (ORDER BY correct_cnt DESC, username ASC) AS ranking
                                    FROM USERS 
                                ) E
                            WHERE 1=1
                                  AND USERNAME = '${String(username)}'; `;
        const rank_data  =   await connection.query(rank_query);
        if(rank_data[0] == null || undefined){
            return res.status(404).json({
                "code": 404,
                "message": "Not found user ranking"
            });
        }
        const res_username = rank_data[0][0].username;
        const res_ranking = rank_data[0][0].ranking;
        return res.status(200).json({
            "username" :res_username,
            "ranking": res_ranking,
            "code": 200,
            "message": "ok"
        });  
    } catch (error) {
        console.error(error);  
        return res.status(500).json({
        "code":500,
        "message": "server error"
        });
    } finally {
        connection.end();  
    }
});

module.exports = router;