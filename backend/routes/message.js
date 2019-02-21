const express = require('express')
const router = express.Router()
var Message = require('../models/Message.js')
var _ = require('lodash')

// GET a list of messages 
router.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log('Find messages error ', err)
      res.status(500).send('Unable to find a list of messages')
    } else {
      var returnedMessages = []
      _.forEach(messages, function (message, key) {
        returnedMessages.push({
          _id: message._id,
          postedAt: message.postedAt,
          messageBody: message.messageBody
        })
      })
      res.send({
        'messages': returnedMessages
      })
    }
  })
})

// GET one message 
router.get('/:id', (req, res, next) => {
  Message.findOne({
    messageId: req.query.messageId
  }, (err, message) => {
    if (err) {
      console.log('Find messages error ', err)
      res.status(500).send('Unable to find a specific message')
    } else {
      res.send({
        _id: message._id,
        postedAt: message.postedAt,
        messageBody: message.messageBody
      })
    }
  })
})

// Create a new message 
router.post('/', (req, res) => {
  if (req.body.messageBody) {
    var newMessage = {
      messageBody: req.body.messageBody
    }
    Message.create(newMessage, function (err, message) {
      if (err) {
        console.log(err)
        res.send('Post message failed').status(401)
      } else {
        res.send({
          messageId: message._id,
          messageBody: message.messageBody
        })
      }
    })
  } else {
    res.send('Does not contain message body').status(401)
  }
})

// DELETE a specific message
router.delete('/:id', (req, res) => {
  console.log(req.params)
  Message.findOneAndRemove({
    _id: req.params.id
  }, (err, message) => {
    if (err) {
      console.log('Delete messages error ', err)
      res.status(500).send('Unable to delete a message')
    } else {
          res.send('success')
    }
  })
})

module.exports = router
