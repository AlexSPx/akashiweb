const router = require('express').Router();
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;

console.log(CLIENT_ID);


router.get('/login', (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20connections%20guilds`)
});

module.exports = router;