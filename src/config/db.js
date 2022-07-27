import './env'
const mysql = require('mysql2');  // mysql 모듈 로드
const connection = mysql.createConnection({  // mysql 접속 설정
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.NAME,
    password: 'awd15963',
    database: process.env.DATABASE
});
// console.log(pool)

function getConnection(callback) {
    pool.getConnection((err, conn) => {
        if (!err) {
            callback(conn);
        }
    })
}

connection.connect();

module.exports = connection;

