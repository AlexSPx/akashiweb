const express = require('express');
const router = require('./routes/auth');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config();

app.get('/manga', function (req, res) {
    res.send("Worked");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

//Routes
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`Running on port ${PORT}`));
