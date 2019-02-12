// var serverConfig = require('../config.js').serverConfig
var Message = require('../models/Message.js')
var uniqid = require('uniqid')

class MessageService {
  addNewMessage (messageBody) {
    var Message = {
        messageId: uniqid(),
        messageBody: messageBody
    }
    Message.create(newMessage, function (err, video) {
      if (err) {
        console.log(err)
      }
    })
  }
}
module.exports = MessageService
