const express = require('express');
const connectDB = require('./server/config/db');

connectDB.connect(function(err) {
    if (err) {
        console.log('Database connection error: ' + err.stack);
        return;
    }

    console.log('Database connected as id: ' + connectDB.threadId);
});

connectDB.query('select * from user;', function(err, result,  fields) {
    if (err) {
        console.log('Query error: ' + err);
        return
    }
    console.log(result[0]);
});