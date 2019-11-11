import getCanvas from '../index';

const assert = require('assert');

describe('getCanvas', () => {
  it ('should be able to return width and height', () => {
    const canvas = getCanvas(512, 512);
    assert.equal(canvas.width, 512);
    assert.equal(canvas.height, 512);
  });
});
