require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

const db = require('./models');

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server Running at http://localhost:' + PORT);
    });
});