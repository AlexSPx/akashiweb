var express = require('express');
var app = express();
app.get('/manga', function (req, res) {
    res.send("Worked");
});
app.listen(3000);
