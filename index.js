const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

io.on('connection', (client) => {
  console.log(`${client.id} is connected now`);

  client.on('JOIN_GROUP', (data) => {
    client.join(data.GroupName);
    console.log(data.GroupName, data.userName);
    io.to(data.GroupName).emit('JOIN_MESSAGE', `${data.userName} joined the Group`);

    client.on('SENDINGROUP', (messageData) => {
      console.log(messageData.Message, messageData.userName);
      if (messageData.userName !== '') {
        client.to(data.GroupName).emit('SENDINGROUP', messageData);
      }
    });
  });
});

