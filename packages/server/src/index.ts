import express from 'express';
import socket from 'socket.io';

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3002;
const io = socket(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

let numUsers = 0;

io.on('connection', (socket: any) => {
  console.log('===============================================>connection');
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data: any) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      id: numUsers,
      message: data,
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username: any) => {
    if (addedUser) return;
    console.log('===============================================>username', username);

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.broadcast.emit('login', {
      numUsers: numUsers,
    });

    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers,
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers,
      });
    }
  });
});
