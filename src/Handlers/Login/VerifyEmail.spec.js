import { expect } from 'chai';
import VerifyEmail from './VerifyEmail';

describe('VerifyEmail', () => {
  it('should return a string that says "Verify Email route hit"', () => {
    const string = VerifyEmail({});
    expect(string).to.be.a('string');
    expect(string).to.equal('Verify Email route hit');
  });
});
