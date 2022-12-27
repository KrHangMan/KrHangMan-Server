const express = require('express');
const router = express.Router();
const conn = require('../config/db.js');
const mysql = require('mysql2/promise');
const Hangul = require('hangul-js');    // 한글 자모자 분리 library

/** spread 10 words : 10개 단어 보내줌  */
router.get('/', async (req, res, next) => {      
    try {  
        var connection = await mysql.createConnection(conn.real); // DB 커넥션 생성
        await connection.connect();   // DB 접속

        const username      = req.params.username;
        const correct_cnt   = req.body.correct_cnt;
        const query         = `SELECT WORD, MEAN FROM WORDS ORDER BY RAND() LIMIT 3;`; //갯수 임의로 지정 할 수 있도록? 
        const res_data      = await connection.query(query);

        if(res_data == null || undefined){
            return res.status(404).json({
                "code": 404,
                "message": "Not found words"
            });
        }

        let arr = new Array() ;
        for(let i in res_data[0]){
            let data = new Object() ;
			
			data.WORD = res_data[0][i].WORD;
			data.MEAN = res_data[0][i].MEAN;
            data.SPELL = Hangul.disassemble(res_data[0][i].WORD); 

            arr.push(data);
        }
        let items = JSON.stringify(arr) ;
        console.log(items);

        // res_data 
        return res.status(200).json({
            items,
            "code": 200,
            "message": "spread 10 words success"
        });   
    } catch (error) {
        console.error(error);  
        res.status(500).json({
            "code":500,
            "message": "server error"
        });
    }

    /*
        ## request X
        ### 단어 10개 주는 방식 
        랜덤하게  10개를 보낸다 -> 중복 데이터 무시 
        ## Response
        {
             "items" : {
                {
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
                {
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
                ...
                {
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
             }
                
        }

    */
});


module.exports = router;