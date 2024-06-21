// I added a empty class to fix an error with this import statement
import { Storage } from './storage';

describe('Storage', () => {
  it('should create an instance', () => {
    expect(new Storage()).toBeTruthy();
  });
});
