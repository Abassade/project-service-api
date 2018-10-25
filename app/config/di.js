const bluebird = require('bluebird');
const config = require('../config/config');
const serviceLocator = require('../lib/service_locator');
const logging = require('../lib/logging');
const ProductController = require('../controllers/product');
const ProductService = require('../services/product');
const mongo = require('mongoose');


/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => logging.create(config.logging));


/**
 * Returns a mongo connection instance.
 */

serviceLocator.register('mongo', (servicelocator) => {
  mongo.Promise = bluebird;
  const logger = servicelocator.get('logger');
  const connectionString = (!config.mongo.connection.username || !config.mongo.connection.password) ? `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}` : `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}`;
  return mongo.connect(connectionString)
    .then(() => {
      logger.info('Connected to mongodb successfully on uri: ', connectionString);
    }).catch((err) => {
      logger.info('Unable to connect to db', err);
      process.exit();
    });
});


// SERVICE INSTANCES

/**
 * Creates an instance of the Auth service
 */
serviceLocator.register('productService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const mongoClient = servicelocator.get('mongo');
  return new ProductService(logger, mongoClient);
});

// CONTROLLER INSTANCES

/**
 * Creates an instance of the Auth controller
 */
serviceLocator.register('productController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const productService = servicelocator.get('productService');
  return new ProductController(logger, productService);
});


module.exports = serviceLocator;
