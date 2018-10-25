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
  // returns all products in the database
  getAllProducts() {
    return this.mongoDBClientHelper.getBulk();
  }
  // returns a particular product with the given email address
  getOneProduct(parameter) {
    this.logger.info(`Fetching product by params: ${parameter}`);
    return this.mongoDBClientHelper.getOneProduct(parameter);
  }
  // adds a new products to the database
  createProduct(parameter) {
    this.logger.info('adding new product to the database');
    return new Promise((resolve, reject) => {
      const product = new ProductModel(parameter);
      product.save((error, savedData) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(savedData);
      });
    });
  }

  // updates a product in the DB
  updateProductDetails(parameter, id) {
    this.logger.info(`updating product with id ${id} to the database`);
    return this.mongoDBClientHelper.updateProductDetails(parameter, id);
  }

  // delete product from the DB
  deleteProduct(id) {
    this.logger.info('Deleting product with id ', id);
    return this.mongoDBClientHelper.delete(id);
  }
}
module.exports = ProductService;
