const express = require('express')
const app = express()
const config = require('./config')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const cv = require('opencv4nodejs')

const fps = 10
const videoStream = new cv.VideoCapture(0)
videoStream.set(cv.CAP_PROP_FRAME_HEIGHT, 600)
videoStream.set(cv.CAP_PROP_FRAME_WIDTH, 600)

setInterval(() => {
  const frame = videoStream.read()
  const image = cv.imencode('.jpg', frame).toString('base64')
  io.emit('stream', image)
}, 1000 / fps)

const start = async () => {
  try {
    app.get('/', function(req, res) {
      res.sendFile(__dirname + '/index.html')
    })
    http.listen(config.port, config.ip)
    console.log(`REST API on http://${config.ip}:${config.port}/`)
  } catch (error) {
    console.log(error)
  }
}

start()
