import { expect } from 'chai';
import CheckUserNameAvailability from './CheckUserNameAvailability';

describe('CheckUserNameAvailability', () => {
  it('should return a string that says "Check username availability route hit"', () => {
    const string = CheckUserNameAvailability({});
    expect(string).to.be.a('string');
    expect(string).to.equal('Check username availability route hit');
  });
});
