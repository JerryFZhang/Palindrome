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

// Get a specific message with the message id
app.get('/message/:id', (req, res) => {
    const id = req.params.id
    res.send("Here's the message with id: " + id)
})

// Get a list of messages
app.get('/messages', (req, res) => {
    res.send("Here are all the messages.")
})

// Post a message
app.post('/message', (req, res) => {
    const message = req.body
    res.send(message)
})

// Delete a specific message
app.delete('/message/:id', (req, res) => {
     const id = req.params.id
    res.send("Deleted the message with id: " + id)
})


app.listen(PORT, () => console.log(`App Started on Port ${PORT}`))
module.exports = app
