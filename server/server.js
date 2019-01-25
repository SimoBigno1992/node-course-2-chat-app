const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.emit('updateRoomsList', rooms.getRoomsList());

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || (!isRealString(params.room) && !params.roomList)){
      return callback('Name and room name are required!');
    }
    if (!params.room && params.roomList) {
      console.log('roomlist', params.roomList);
      params.room = params.roomList;
    }

    console.log('room', params.room);
    const userInRoom = users.getUserList(params.room);
    const isUserExist = userInRoom.find(user => user === params.name);

    if (isUserExist) {
      return callback('Username already used.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    if (!rooms.getRoom(params.room)){
     rooms.addRoom(socket.id, params.room);
     socket.emit('updateRoomsList', rooms.getRoomsList());
    }
    console.log(rooms.getRoomsList());
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text ));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail);
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
      if (users.getUserList(user.room).length === 0) {
        rooms.removeRoom(user.room);
        socket.emit('updateRoomsList', rooms.getRoomsList());
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
