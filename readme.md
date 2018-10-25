Product Service API
==============================================

The product Service API has Endpoints that can perform basic CRUD actions

Clone repository and run npm install to setup dependencies

Create a `.env` file
----------------------------
Add the parameters below (`add your own values`)

**Environment Variables:**
```
appName='User Authentication Service'
NODE_ENV=testing
NODE_PATH=./app
APP_URL=''
APP_PORT=4040

# MongoDB Credentials
MONGODB_HOST='localhost'
MONGODB_PORT='27017'
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_DATABASE_NAME='ProductDB'
MONGODB_LOG_LEVEL='trace'


LOG_LEVEL=silly
LOG_ENABLE_CONSOLE=true

ALLOWEDORIGINS='http://api.myapp.com, http://web.myapp.com'
PREFLIGHTMAXAGE= 600
EXPOSEDHEADERS='Cache-Control', 'Content-Language', 'Content-Type', 'Expires', 'Last-Modified', 'Pragma'
ALLOWEDHEADERS='origin', 'accept', 'Accept-Language', 'Content-Language', 'Content-Type'
```

Get API running
----------------------------
```
npm run start
```
Check For Linting
-------------
```
npm run lint
```
Run Test
-------------
```
npm run test
```

## Routes

NAME     			     | END POINT            |  PARAMS / BODY DATA
-------------------------| -------------        | ---------------
Base     				 | /                    |
Get all products   	     | /products            |
Get a single product     | /products/:id        |`id` e.g `ft-90`
Add a product [POST]  	 | /products/add        | {`id`,`name`,`description`,`image`,`category`,`color`,`price` }
Update a product [PATCH] | /products/update/:id | same as post body
Delete a product [DELETE]| /products/delete/:id |