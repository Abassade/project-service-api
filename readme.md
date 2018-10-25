Product Service API
==============================================

Heroku URL: https://stormy-castle-99898.herokuapp.com/

The product Service API has Endpoints that can perform basic CRUD actions

Clone repository and run npm install to setup dependencies

Create a `.env` file
----------------------------
Add the parameters below (`add your own values`)

**Environment Variables:**
```
check `sample.env` file
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