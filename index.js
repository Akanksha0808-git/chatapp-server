const express = require('express');
// const http = require('http');
const socketIo = require('socket.io');
port = 5000
const app = express();
const server = app.listen(port, () => {
    console.log(`server running fine in port no.${port}`)
})
const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);


    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', message); // Broadcast the message to all connected clients
    });
});
app.get("/", (req, res) => {
    res.send("")
});

