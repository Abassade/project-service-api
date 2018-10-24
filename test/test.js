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
describe('Products', () => {
  if (mongoose.connection.readyState === 2) {
    /*
  * Test the /GET route
  */
    describe('/GET product', () => {
      it('it should GET all the products', (done) => {
        chai.request(server)
          .get('/products')
          .end((err, res) => {
            chai.expect(res.body).have.property('code').eqls(200);
            done();
          });
      });
    });


    /*
  * Test the /GET/:email route
  */
    describe('/GET/:id product', () => {
      it('it should GET a product by the given id', (done) => {
        const id = 'ft-90';
        chai.request(server)
          .get(`/users/${id}`)
          .end((err, res) => {
            chai.expect(res.body).have.property('code', 200);
            chai.expect(res.body).have.property('data').have.property('id').eql('ft-90');
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).not.be.a('array');
            done();
          });
      });
    });

    /*
  * Test the /PATCH route
  */
    describe('/PATCH/:id product', () => {
      it('it should update a product details given the id', (done) => {
        const id = 'ft-90';
        chai.request(server)
          .patch(`/products/update/${id}`)
          .end((err, res) => {
            chai.expect(res.body).have.deep.property('code').eql(200);
            chai.expect(res.body).be.a('object');
            done();
          });
      });
    });
  }
});
