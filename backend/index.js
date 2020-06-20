const express = require('express');
const router = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000

app.get('/manga', function (req, res) {
    res.send("Worked");
});

router.use()

app.listen(PORT, console.log(`Running on port ${PORT}`));
