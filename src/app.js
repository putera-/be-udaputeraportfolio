require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;


// syncronize database
app.listen(PORT, () => {
    console.log('Server Running at http://localhost:' + PORT);
});