/**
 * @ Author: Lee
 * @ Description: 聊天室简易服务端代码
 */

import express from 'express';
import socket from 'socket.io';
import { v4 } from 'uuid';

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3002;
const io = socket(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// 聊天室用户数量
let numUsers = 0;

// 监听连接
io.on('connection', (socket: any) => {
  let addedUser = false;

  // 处理接收的新消息
  socket.on('new message', (data: any) => {
    // 通知其他客户端
    socket.broadcast.emit('new message', {
      id: v4(),
      username: socket.username,
      userId: socket.userId,
      message: data.message,
      type: data.type,
    });
  });

  // 处理新加入聊天室的用户
  socket.on('add user', (username: any) => {
    if (addedUser) return;

    // 在 socket 回话中保存用户名称、Id 等
    socket.username = username;
    socket.userId = v4();

    ++numUsers;
    addedUser = true;

    // 通知当前客户端登录信息
    socket.emit('login', {
      username: socket.username,
      userId: socket.userId,
      numUsers: numUsers,
    });

    // 通知所有客户端，新用户加入聊天室
    socket.broadcast.emit('user joined', {
      id: v4(),
      username: socket.username,
      userId: socket.userId,
      numUsers: numUsers,
    });
  });

  // 处理断开链接
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // 告知其他客户端某个用户已离开
      socket.broadcast.emit('user left', {
        id: v4(),
        username: socket.username,
        userId: socket.userId,
        numUsers: numUsers,
      });
    }
  });
});
