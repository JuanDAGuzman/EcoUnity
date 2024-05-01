const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(process.cwd() + '/src/views/index.ejs')
    res.render('<h1>Mapa</h1>')
})

module.exports = router;