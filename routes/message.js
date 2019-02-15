const express = require('express')
const router = express.Router()
var Message = require('../models/Message.js')
var uniqid = require('uniqid')
var _ = require('lodash')
var serverConfig = require('../config.js').serverConfig

/* GET one message */
router.get('/', (req, res, next) => {
  if (req.query.messageId) {
    Message.findOne({
      messageId: req.query.messageId
    }, (err, message) => {
      if (err) {
        console.log('find messages error ', err)
        res.status(500).send('unable to find message')
      } else {
        res.send({
          _id: message._id,
          postedAt: message.postedAt,
          messageBody: message.messageBody
        })
      }
    })
  } else {
    Message.find({}, (err, messages) => {
      if (err) {
        console.log('find messages error ', err)
        res.status(500).send('unable to find message')
      } else {
        var returnedMessages = []
        // console.log(messages)

        _.forEach(messages, function (message, key) {
          returnedMessages.push({
            _id: message._id,
            postedAt: message.postedAt,
            messageBody: message.messageBody
          })
        })
        res.send(returnedMessages)
      }
    })
  }
})


/* Create new message */
router.post('/', (req, res) => {
  
})

router.delete('/:id', (req, res) => {
  console.log(req.params)

})

module.exports = router