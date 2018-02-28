#!/usr/bin/env node
const express = require('express')
const app = express()
const path = require('path')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const uuidv4 = require('uuid/v4')
var port = process.env.PORT || 3000

// Routing
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

var devices = []

io.on('connection', function (socket) {
  console.log('a user connected')

  var id = uuidv4()




  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
  socket.on('foo', function(msg){
    console.log('Foo: ', msg)
    socket.emit('event', msg)
  })
})

http.listen(port, function () {
  console.log('Server listening at port %d', port)
})