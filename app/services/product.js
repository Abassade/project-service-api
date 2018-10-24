/**
 * Created by Jebutu Morifeoluwa on 19/04/2018.
 */

const requestPromise = require('request-promise');
const crypto = require('crypto');

const MongoDBHelper = require('../lib/MongoDBHelper');
const ProductModel = require('../model/product');


class ProductService {
  /**
     * The constructor
     *
     * @param logger
     * @param mongoDBClient
     */
  constructor(logger, mongoDBClient) {
    this.logger = logger;
    this.mongoDBClientHelper = new MongoDBHelper(mongoDBClient, ProductModel);
  }
  // returns all users in the database
  getAllProducts() {
    return this.mongoDBClientHelper.getBulk();
  }
  // returns a particular user with the given email address
  getOneProduct(parameter) {
    this.logger.info(`Fetching product by params: ${parameter}`);
    return this.mongoDBClientHelper.getOneProduct(parameter);
  }
  // adds a new user to the database
  createProduct(parameter) {
    this.logger.info('adding new user to the database');
    return new Promise((resolve, reject) => {
      const user = new ProductModel(parameter);
      user.save((error, savedData) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(savedData);
      });
    });
  }

  //updates a user in the DB
  updateProductDetails(parameter, id) {
    this.logger.info(`updating product with id ${id} to the database`);
    return this.mongoDBClientHelper.updateProductDetails(parameter, id);
  }

  //delete user from the DB
  deleteProduct(email) {
    this.logger.info('Deleting user with email ', email);
    return this.mongoDBClientHelper.delete(email);
  }

}
module.exports = ProductService;
