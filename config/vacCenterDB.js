const mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vacCenter'
});

module.exports = connection;