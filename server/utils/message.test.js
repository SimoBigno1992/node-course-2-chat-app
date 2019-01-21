var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should genereate the correct message object', () => {
    var from = 'Jen';
    var text = 'Some text';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from');
    expect(message).toHaveProperty('text');
  });
});
