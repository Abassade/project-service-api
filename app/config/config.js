const appName = 'Product Service API';

const config = {
  app_name: appName,
  server: {
    url: process.env.APP_URL,
    port: process.env.PORT
  },
  mongo: {
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      db: process.env.MONGODB_DATABASE_NAME
    }
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE || true
  },
  service: {
    name: process.env.SERVICE_NAME,
  },
  corsSettings: {
    preflightMaxAge: process.env.PREFLIGHTMAXAGE,
    allowedOrigins: process.env.ALLOWEDORIGINS,
    allowedHeaders: process.env.ALLOWEDHEADERS,
    exposedHeaders: process.env.EXPOSEDHEADERS
  }

};

module.exports = config;
