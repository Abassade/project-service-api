module.exports.setup = function setup(server, servicelocator) {
  const productController = servicelocator.get('productController');

  server.get({
    path: '/',
    name: 'base',
    version: '1.0.0'
  }, (req, res) => res.send('Welcome to the Product Service API'));

  server.get({
    path: '/products',
    name: 'Gets all Products',
    version: '1.0.0'
  }, (req, res, next) => productController.getAllProducts(req, res, next));

  server.get({
    path: '/products/:id',
    name: 'Gets a particular Product',
    version: '1.0.0'
  }, (req, res, next) => productController.getOneProduct(req, res, next));

  server.post({
    path: '/products/add',
    name: 'Add a product to the database',
    version: '1.0.0'
  }, (req, res, next) => productController.createProduct(req, res, next));

  server.patch({
    path: '/products/update/:id',
    name: 'Update a products details',
    version: '1.0.0'
  }, (req, res, next) => productController.updateProductDetails(req, res, next));

  server.del({
    path: '/products/delete/:id',
    name: 'Deletes a products',
    version: '1.0.0'
  }, (req, res, next) => productController.deleteProduct(req, res, next));
};
