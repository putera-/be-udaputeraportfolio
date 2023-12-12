require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

// get sequelize models
const db = require('./models');

// syncronize database
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server Running at http://localhost:' + PORT);
    });
});