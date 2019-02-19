var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// Load server config for future deployment
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 4000
var messages = require('./routes/message')

var path = require('path')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

mongoose.connect(serverConfig.dbAddress)
var db = mongoose.connection

// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
})


app.use(express.static(path.join(__dirname, 'public')))
app.use('/message', messages)

app.get('/', (req, res) => {
  res.send("Server initiated")
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app