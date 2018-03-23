const express = require('express')
const path = require('path')
const app = express()
const log = console.log
var port = process.env.PORT || 4000

// For fontend route
var frontendDir = path.join(path.dirname(path.dirname(__dirname)), 'frontend')
app.use('/home', express.static(path.join(frontendDir, 'build')))
app.get('/home', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'))
})
app.get('/', function(req, res) {
  res.redirect('/home');
})

app.listen(port, function() {
  log('Server listening at port %d', port)
})
