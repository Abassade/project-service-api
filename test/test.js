// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const server = require('../app/index');
const { describe, it } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

const mongoose = require('mongoose');


// Our parent block
describe('Users', () => {
  if (mongoose.connection.readyState === 2) {
    /*
  * Test the /GET route
  */
    describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
          .get('/users')
          .end((err, res) => {
            chai.expect(res.body).have.property('code').eqls(200);
            done();
          });
      });
    });


    /*
  * Test the /GET/:email route
  */
    describe('/GET/:email user', () => {
      it('it should GET a user by the given email', (done) => {
        const email = 'mjebutu@terragonltd.com';
        chai.request(server)
          .get(`/users/${email}`)
          .end((err, res) => {
            chai.expect(res.body).have.property('code', 200);
            chai.expect(res.body).have.property('data').have.property('email').eql('mjebutu@terragonltd.com');
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).not.be.a('array');
            done();
          });
      });
    });

    /*
  * Test the /PATCH route
  */
    describe('/PATCH/:email user', () => {
      it('it should DEACTIVATE a user given the email', (done) => {
        const email = 'mjebutu@terragonltd.com';
        chai.request(server)
          .patch(`/users/status/${email}?status=inactive`)
          .end((err, res) => {
            chai.expect(res.body).have.deep.property('code').eql(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).have.property('data').have.property('active').equals(false);
            done();
          });
      });
    });

    describe('/PATCH/:email user', () => {
      it('it should not DEACTIVATE a user when no parameter is passed', (done) => {
        const email = 'mjebutu@terragonltd.com';
        chai.request(server)
          .patch(`/users/status/${email}?status=`)
          .end((err, res) => {
            chai.expect(res.body).have.property('code').eql(400);
            chai.expect(res.body).be.a('object');
            done();
          });
      });
    });
    /*
* Test the /users/:email route for activating a user
*/
    describe('/users/:email user', () => {
      it('it should ACTIVATE a user given the email', (done) => {
        const email = 'mjebutu@terragonltd.com';
        chai.request(server)
          .patch(`/users/status/${email}?status=active`)
          .end((err, res) => {
            chai.expect(res.body).have.property('code').eql(200);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).have.property('data').have.property('active').equals(true);
            done();
          });
      });
    });

    describe('/users/authenticate/:app', () => {
      it('it should AUTHENTICATE the tokens sent by google', (done) => {
        const token = process.env.TOKEN;
        chai.request(server)
          .get(`/users/authenticate/mobilezone?token=${token}`)
          .end((err, res) => {
            chai.expect(res.body).have.property('code').eql(200);
            chai.expect(res.body).have.property('message').eql('User authenticated successfully');
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).have.property('data').have.property('email').eql('mjebutu@terragonltd.com');
            done();
          });
      }).timeout(10000);
    });
  }
});
