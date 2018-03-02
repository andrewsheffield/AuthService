import { expect } from 'chai';
import sinon, { stub, spy } from 'sinon';
import ManualSignup from './ManualSignup';

// To Stub
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
//import { User, Auth } from '../../Models';
import * as Models from '../../Models';
import * as services from '../../Services';

describe('ManualSignup', () => {
  let sandbox, hashStub, userSaveStub, userStub;

  before(() => {
    sandbox = sinon.sandbox.create();

    userStub = sandbox.stub(Models, 'User');
    hashStub = sandbox.stub(bcrypt, 'hash').resolves('1234');
    //userSaveStub = sandbox.stub(models.User.prototype, 'save').resolves('123');

    // const AuthStub = sinon.stub(models, "Auth").resolves("1234");
    // const VerifyEmailStub = sinon.stub(services, "VerifyEmail").resolves("1234");
  });

  afterEach(function() {
    sandbox.reset();
  });

  after(function() {
    sandbox.restore();
  });

  it('Do A thing', async () => {
    await ManualSignup(
      {
        payload: {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@user.com',
          password: 'password1'
        }
      },
      {}
    );

    await expect(userStub.called).to.be.true;

    return;
  });
});

// a^2 + b^2 = c^2
// function Pythag(a, b) {
//   if (a <= 0 || b <= 0) {
//     return null;
//   }
//   if (isNaN(a) || isNaN(b)) {
//     return null;
//   }
//   const a2 = Math.pow(a, 2);
//   const b2 = Math.pow(b, 2);
//   const c = Math.sqrt(a2 + b2);
//   return c;
// }

// describe('Pythag', () => {

//   it('Do A thing', () => {
//     expect(Pythag(4,3)).to.be.equal(5);
//     expect(Pythag(24,7)).to.be.equal(25);
//     expect(Pythag(5,12)).to.be.equal(13);
//   });

//   it('Neg values', () => {
//     expect(Pythag(-4,3)).to.be.null;
//     expect(Pythag(24,-7)).to.be.null;
//   });

//   it('Null values', () => {
//     expect(Pythag(4,null)).to.be.null;
//     expect(Pythag(null,7)).to.be.null;
//   });

//   it('string values', () => {
//     expect(Pythag(4,"3")).to.be.equal(5);
//     expect(Pythag("24",7)).to.be.equal(25);
//   });

//   it('string values', () => {
//     expect(Pythag(4,"v")).to.be.null;
//     expect(Pythag("a",7)).to.be.null;
//   });

// });
