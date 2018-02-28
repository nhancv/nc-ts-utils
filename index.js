#!/usr/bin/env node
var express = require('express')
var app = express()
var path = require('path')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = process.env.PORT || 3000

// Routing
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('a user connected')
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