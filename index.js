const express = require('express');
// const http = require('http');
const socketIo = require('socket.io');

const app = express();
// const server = http.createServer(app);

const PORT = 5000;

const server=app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const io = socketIo(server,{
  cors:{
    origin:"*",
  }
});


io.on('connection', (client) => {
  console.log(`${client.id} is connected now`);

 
    client.on('GROUP', (messageData) => {
      console.log(messageData.Message, messageData.userName);
      if (messageData.userName !== '') {
        client.to(data.GroupName).emit('SENDINGROUP', messageData);
      }
    });
    

});

