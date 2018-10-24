/* eslint-disable no-unused-vars */
/* eslint radix: ["error", "as-needed"] */
/**
 * Created by Jebutu Morifeoluwa on 20/10/2018.
 */

const config = require('../config/config');

// let pageParam;
class MongoDBHelper {
  /**
     * The constructor
     *
     * @param mongoDBClient - MongoDB client
     * @param mongoDBModel - the model you wish to operate on
     */
  constructor(mongoDBClient, mongoDBModel) {
    this.mongoDBClient = mongoDBClient;
    this.mongoDBModel = mongoDBModel;
  }

  /**
     * Fetches a single record from the connected MongoDB instance.
     *
     * @param params
     */

  getOneProduct(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.findOne({ id: params });

      if (params.fields) { query.select(params.fields); }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(this.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Fetches bulk records from the connected MongoDB instance.
     *
     * @param params
     * @returns {Promise}
     */
  getBulk() {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.find();

      return query.exec((error, modelData) => {
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Aggregates data within MongoDB by certain conditional criteria and returns same.
     * Typically used in report generation or logs...
     * But advisable to do logging/report aggregation on a stacked DB that is highly
     * optimised for search,.. E.g Elastic Search or GraphDB
     *
     * @param params
     * @returns {Promise}
     */
  aggregate(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.aggregate(params.conditions);

      return query.exec((err, modelData) => {
        if (err) {
          return reject(this.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Saves data into the MongoDB instance
     *
     * @param data
     * @returns {Promise}
     */
  save(data) {
    return new Promise((resolve, reject) => {
      const mongodbSaveSchema = this.mongodbModel(data);
      return mongodbSaveSchema.save((error, response) => {
        if (error != null) {
          return reject(MongoDBHelper.handleError(error));
        }
        return resolve(response);
      });
    });
  }

  /**
     * Updates a SINGLE RECORD in the MongoDB instance's DB based on some conditional criteria
     *
     * @param params - the conditional parameters
     * @param data - the data to update
     * @returns {Promise}
     */

  updateProduct(data) {
    return new Promise((resolve, reject) => this.mongoDBModel.findOneAndUpdate(
      data.email, { $set: { firstname: data.given_name, lastname: data.family_name } }, { new: true },
      (error, response) => {
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(response);
      }
    ));
  }

  /**
  * Updates a SINGLE RECORD in the MongoDB instance's DB based on some conditional criteria
  *
  * @param data - the data to update
  * @returns {Promise}
  */
 updateProductDetails(data, params) {
 return new Promise((resolve, reject) => this.mongoDBModel.findOneAndUpdate(
   { id: params },
   { $set: data },
   { new: true },
   (error, response) => {
     if (error) {
       return reject(this.handleError(error));
     }
     if (error == null && response == null) {
       return reject(new Error({ error: true, msg: 'Record Not Found In DB' }));
     }
     return resolve(response);
   }
 ));
}

  delete(email) {
    return new Promise((resolve, reject) => this.mongoDBModel.deleteOne(
      { email: email }, (error, response) => {
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(response);
      }
    ));
  }


  /**
     * This closes the connection from this client to the running MongoDB database
     *
     * @returns {Promise}
     */
  close() {
    return new Promise((resolve, reject) => {
      this.mongoDBClient.close();

      return resolve({
        error: false,
        msg: 'connection was successfully closed. Why So Serious, I am gone for a vacation!',
      });
    });
  }


  /**
     * Used to format the error messages returned from the MongoDB server during CRUD operations
     *
     * @param report
     * @returns {{error: boolean, message: *}}
     */
  static handleError(report) {
    return { error: true, msg: report };
  }
}

module.exports = MongoDBHelper;
