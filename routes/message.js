const express = require('express')
const router = express.Router()
var Message = require('../models/Message.js')
var uniqid = require('uniqid')
var _ = require('lodash')
var serverConfig = require('../config.js').serverConfig

/* GET one message */
router.get('/', (req, res, next) => {
})


/* Create new message */
router.post('/:id', (req, res) => {
  
})

router.delete('/:id', (req, res) => {
  console.log(req.params)

})

module.exports = router