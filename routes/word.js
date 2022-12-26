const express = require('express');
const router = express.Router();
module.exports = router;

/** spread 10 words (자모자 형식으로) */
router.get('/', async (req, res, next) => {      
    console.log("spread 10 words (자모자 형식으로)");

    /*
        ## Request
        
        ## request 데이터
        

        ### 단어 10개 주는 방식 
        1. users 마다의 sequence를 구해서 10개씩 보낸다.
        2. 랜덤하게  10개를 보낸다 -> 중복 데이터 무시 
        3. client 에서 paging 처리하듯이 10개씩 보낸다. 
    

        ## Response
        {
             "total" : "2432",
             "start" : "1",
             "num"   : "10",
             "items" : {
                {
                    "id"    : "1",
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
                {
                    "id"    : "2",
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
                ...
                {
                    "id"    : "10",
                    "spell" : [ㄱ,ㅏ,ㄴ,ㄷ,ㅏ],
                    "word"  : "간다",
                    "mean"  : "간다는뜻"
                },
             }
                
        }

    */
});