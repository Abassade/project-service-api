/**
 * Created by Jebutu Morifeoluwa on 24/10/2018.
 */

// Load on dev environment
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config/config');
const routes = require('./routes/index');

const restify = require('restify');
const { plugins } = require('restify');
const corsMiddleware = require('restify-cors-middleware');

// service locator via dependency injection
const servicelocator = require('./config/di');

const log = servicelocator.get('logger');
const utility = require('./lib/logging');

const server = restify.createServer({
  name: config.app_name,
  versions: ['1.0.0']
});


// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

const cors = corsMiddleware({
  preflightMaxAge: parseInt(config.corsSettings.preflightMaxAge, 10),
  origins: utility.arrayGenerator(config.corsSettings.allowedOrigins),
  allowHeaders: utility.arrayGenerator(config.corsSettings.allowedHeaders),
  exposeHeaders: utility.arrayGenerator(config.corsSettings.exposedHeaders)
});

// enable CORS support on this service's endpoints
server.pre(cors.preflight);
server.use(cors.actual);


// setup Routing and Error Event Handling
routes.setup(server, servicelocator);

server.listen(config.server.port, () => log.info('%s listening at %s', server.name, server.url));
module.exports = server;
