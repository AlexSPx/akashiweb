const express = require('express')
var app = express()

app.get('/manga', (req: Express.Request, res: Express.Response) => {
    res.send("Worked")
})

app.listen(3000)