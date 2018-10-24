/**
 * Created by Jebutu Morifeoluwa on 19/04/2018.
 */

const Response = require('../lib/response_manager');

class Product {
  constructor(logger, productService) {
    this.logger = logger;
    this.service = productService;
  }
  /**
     *
     *
     * @param req
     * @param res
     * @param next
     */
  // returns all products in the database
  getAllProducts(req, res) {
    return this.service.getAllProducts()
      .then(data => Response.success(res, {
        error: false,
        message: 'Products successfully queried',
        response: data
      }, 200))
      .catch(error => Response.failure(res, {
        error: true,
        message: error.msg,
        response: {},
      }, 400));
  }
  // returns a particular product with the given product id
  getOneProduct(req, res) {
    const { id } = req.params;
    return this.service.getOneProduct(id)
      .then((data) => {
        if (data) {
          return Response.success(res, {
            error: false,
            message: 'Product successfully queried for this id',
            response: data
          }, 200);
        } return Response.success(res, {
          error: false,
          message: 'No product found for this id',
          response: data
        }, 404);
      })
      .catch(error => Response.failure(res, {
        error: true,
        message: error.msg,
        response: {},
      }, 400));
  }

  // adds a new user to the database
  createProduct(req, res) {
    const parameter = req.body;
    if (!parameter) {
      return Response.failure(res, {
        message: 'No data supplied',
        response: 'Please provide all the ncessary details for this product',
      }, 400);
    } return this.service.createProduct(parameter)
      .then(data => Response.success(res, {
        message: 'User successfully saved to the database',
        response: data
      }, 200))
      .catch(error => Response.failure(res, {
        message: 'An error occured while saving user to database',
        response: error,
      }, 400));
  }

  // updates product details in the database
  updateProductDetails(req, res) {
    const parameter = req.body;
    const { id } = req.params;
    if (!parameter || !id) {
      return Response.failure(res, {
        message: 'No data supplied',
        response: 'Please provide some details for this product',
      }, 400);
    } return this.service.updateProductDetails(parameter, id)
      .then(data => Response.success(res, {
        message: 'Product details successfully updated in the database',
        response: data
      }, 200))
      .catch(error => Response.failure(res, {
        message: `An error occured while updating product details in database ${error}`,
        response: error,
      }, 500));
  }

  deleteProduct(req, res) {
    const { id } = req.params;
    if (!id) {
      return Response.failure(res, {
        message: 'No id supplied',
        response: 'Please provide the id address for this product',
      }, 400);
    } return this.service.deleteProduct(id)
      .then(data => Response.success(res, {
        message: 'Product successfully removed from the database',
        response: data
      }, 200))
      .catch(error => Response.failure(res, {
        message: `An error occured while deleting product from the database ${error}`,
        response: error,
      }, 500));
  }
}

module.exports = Product;

