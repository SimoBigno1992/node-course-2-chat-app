var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from');
    expect(message).toHaveProperty('text');
  });
});

describe('generateLocationMessage', () => {
  it('should generate location object', () => {
    const from = 'Jen';
    const latitude = 15;
    const longitude = 16;
    const url = 'https://www.google.com/maps?q=15,16';
    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from');
    expect(message).toHaveProperty('url');
  });
});
