const conn = require('../config/db.js');
const mysql = require('mysql2');

exports.connectDB = (req, res, next) => {
    try {
      var connection = mysql.createConnection(conn.real); // DB 커넥션 생성
      connection.connect(); 
      console.log(1);
      return next();
    } catch (error) {
      console.log(error);
    }
}
