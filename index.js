var express = require('express')
var app = express()

// Load server config for future deployment
var serverConfig = require('./config.js').serverConfig
const PORT = serverConfig.port || 3000

var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send("Server initiated")
})

app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app
