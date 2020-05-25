const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { err, user } = addUser({ id: socket.id, name, room })

    if (err) { return callback(err) }

    socket.emit('message', { user: 'Сервер 🛠️', text: `${user.name} добро пожаловать в комнату ${user.room}` })
    socket.broadcast.to(user.room).emit('message', { user: 'Сервер 🛠️', text: `${user.name} подключился.` })

    socket.join(user.room)

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', { user: `Сервер 🛠️`, text: `Пользователь ${user.name} ушёл.` })
    }
  })
})

if (process.NODE_ENV === 'prodaction') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

app.use(router)

server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

