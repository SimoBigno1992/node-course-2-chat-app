class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(id, name) {
    const room = {id, name};
    this.rooms.push(name);
    return room;
  }

  removeRoom(name) {
    const room = this.getRoom(name);

    if (room) {
      const roomIndex = this.rooms.findIndex(r => r.name === room.name);
      this.rooms.splice(roomIndex, 1);
    }

    return room;
  }

  getRoom(name) {
    return this.rooms.find(room => room === name)
  }

  getRoomsList() {
    return this.rooms;

  }
}

module.exports = {Rooms};
