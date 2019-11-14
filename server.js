const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('chat-message-send', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
})

