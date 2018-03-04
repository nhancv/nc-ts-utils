import { Socket } from 'net'
import { disconnect } from 'cluster'

const express = require('express')
const app = express()
const path = require('path')

const http = require('http').Server(app)
const io = require('socket.io')(http)
const uuidv4 = require('uuid/v4')

const log = console.log
var port = process.env.PORT || 4000

// Routing
var frontendDir = path.join(
  path.dirname(path.dirname(__dirname)),
  'frontend'
)

app.use(express.static(path.join(frontendDir, 'build')))
app.get('/', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'))
})

var devices = {
  // "uuid": {
  //   "socket"
  //   "phone"
  // }
}

const newDevice = socket => {
  socket['uuid'] = uuidv4()
  devices[socket['uuid']] = {}
  devices[socket['uuid']]['socket'] = socket
}

const removeDevice = socket => {
  delete devices[socket['uuid']]
  delete socket['uuid']
}

const deviceLogin = (socket, phone) => {
  devices[socket['uuid']]['phone'] = phone
}

const veriyLogin = socket => {
  if (
    socket.hasOwnProperty('uuid') &&
    devices[socket['uuid']].hasOwnProperty('phone') &&
    devices[socket['uuid']]['phone']
  ) {
    return devices[socket['uuid']]['phone']
  }
  return false
}

const getLastInfo = socket => {
  if (socket.hasOwnProperty('uuid')) {
    if (
      devices[socket['uuid']].hasOwnProperty('phone') &&
      devices[socket['uuid']]['phone']
    ) {
      return devices[socket['uuid']['phone']]
    } else {
      return socket['uuid']
    }
  }
}

var messages = {
  // "011": [
  //   {
  //     from: "011",
  //     to: "022",
  //     msg: "message",
  //     date: 20 / 2 / 2018
  //   }
  // ]
}

const addMessage = (phone, from, to, message, date) => {
  if (!messages[phone]) {
    messages[phone] = []
  }
  messages[phone].push({
    from: from,
    to: to,
    data: message,
    date: date
  })
}

const sendMessage = (socket, from, to, message, date) => {
  var phone = veriyLogin(socket)
  if (phone !== false) {
    let msg = {
      from: from,
      to: to,
      data: message,
      date: date
    }
    socket.emit('sendMsg', msg)
    addMessage(phone, msg.from, msg.to, msg.data, msg.date)
  }
}

io.on('connection', function(socket) {
  log('New socket connected.')
  newDevice(socket)
  socket.on('login', function(phone) {
    log(`Socket login with ${phone}.`)
    deviceLogin(socket, phone)
  })
  socket.on('recvMsg', function(msg) {
    log('recvMsg', msg)
    var phone = veriyLogin(socket)
    if (phone !== false) {
      addMessage(phone, msg.from, msg.to, msg.data, msg.date)
    }
  })
  socket.on('disconnect', function() {
    log(`Socket ${getLastInfo(socket)} disconnected.`)
    removeDevice(disconnect)
  })
  socket.on('frontend.actionSendMsg', function(msg) {
    log('frontend.actionSendMsg', msg)
    sendMessage(socket, msg.from, msg.to, msg.data, msg.date)
  })
})

http.listen(port, function() {
  log('Server listening at port %d', port)
})
