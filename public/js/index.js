var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'pippo@example.com',
    text: 'Ciao sono pippo!',
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newEmail', (email) => {
  console.log('New Email', email);
});
