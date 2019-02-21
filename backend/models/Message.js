var mongoose = require('mongoose')

var MessageSchema = new mongoose.Schema({
  messageBody: {
    type: String,
    required: true
  },
  postedAt: Number
})

MessageSchema.pre('save', function (next) {
  var Message = this
  var id = new mongoose.mongo.ObjectId()
  Message._id = id
  Message.postedAt = (new Date()).getTime()
  next()
})

var Message = mongoose.model('Message', MessageSchema)
module.exports = Message
