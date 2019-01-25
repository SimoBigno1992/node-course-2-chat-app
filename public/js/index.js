var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});

socket.on('updateRoomsList', (rooms) => {
  const select = jQuery('<select></select>').attr('name', 'roomList');

  if(rooms.length > 0){
    select.append(jQuery('<option></option>').text('-- Choose a room --').attr('name', ''));
    rooms.forEach((room) => {
      select.append(jQuery('<option></option>').text(room).attr('name', 'room').attr('value', room));
    });
    jQuery('#rooms').attr('hidden', false);
    jQuery('#rooms').append(select);
  }
});
