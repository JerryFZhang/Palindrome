var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 4000
var messages = require('./routes/message')
var path = require('path')

// use it before all route definitions
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

// DB connection
mongoose.connect(serverConfig.dbAddress)
var db = mongoose.connection
// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // Connected
})

app.use(express.static(path.join(__dirname, 'public')))

// Router
app.use('/message', messages)


app.get('/', (req, res) => {
  res.send('Server is up')
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app
