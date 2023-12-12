const mysql = require('mysql');
const connectDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'belajar_mysql'
});

module.exports = connectDB

