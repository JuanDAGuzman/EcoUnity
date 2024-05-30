const express = require('express')
const router = express.Router()
const createSession = require('./../controllers/payment.controller')

router.post('/create-checkout-session', createSession);

router.get('/success', (req, res) => res.send('Success'))
router.get('/cancel', (req, res) => res.send('Cancel'))

module.exports = router
