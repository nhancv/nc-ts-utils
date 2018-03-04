const express = require('express')
const app = express()
const path = require('path')

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
app.listen(port, function() {
  log('Server listening at port %d', port)
})
