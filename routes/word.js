const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');
const Hangul = require('hangul-js');    // 한글 자모자 분리 library
const logger = require('../config/logger.js');
/** spread 10 words : 10개 단어 보내줌  */
router.get('/', async (req, res, next) => {      
    try {  
        var connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
        await connection.connect();   // DB 접속
        const query         = `SELECT WORD, MEAN FROM WORDS ORDER BY RAND() LIMIT 10;`; 
        const res_data      = await connection.query(query);
        if(res_data == null || undefined){
            logger.error("spread 10 words : Not found words");
            return res.status(404).json({
                "code": 404,
                "message": "Not found words"
            });
        }
        let word_list = new Array() ;
        for(let i in res_data[0]){
            let data = new Object() ;
			data.word = res_data[0][i].WORD;
			data.mean = res_data[0][i].MEAN;
            data.spell = Hangul.disassemble(res_data[0][i].WORD); 
            word_list.push(data);
        }
        logger.info("spread 10 words words success");
        return res.status(200).json({
            word_list,
            "code": 200,
            "message": "spread 10 words success"
        });   
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            "code":500,
            "message": "server error"
        });
    } finally{
        connection.end();  
    }
});
module.exports = router;