# Node.js + Express Products & Orders REST API 

## Instructions
In order to use the project:
- Clone the repository
````
git clone https://github.com/deltorosalazar/node-rest-shop.git
````
- Install the dependencies
````
npm install
````
- Run the project
````
npm run start
````
- Fix the code using StandardJS rules
````
npm run start
````

## To take into accuont
- The server will be running in the port 3002
- To test the API, use [Postman](https://www.getpostman.com/apps)
- Some routes are protected, so you have to register and log in first:

| Endpoint                                  | Method    | Body                                                     |
| :---------------------------------------: | :-------: | :------------------------------------------------------: |
| `http://localhost:3002/users/signup`      | POST      | { "email": "test@gmail.com", "password": "password" }    |
| `http://localhost:3002/users/login`       | POST      | { "email": "test@gmail.com", "password": "password" }    |
| __`http://localhost:3002/users/`__        | GET       |                                                          |
| __`http://localhost:3002/users/id`__      | DELETE    |                                                          |
| `http://localhost:3002/products`          | GET       |                                                          |
| __`http://localhost:3002/products/`__     | POST      | { "name": "Product", "price": "2000", "token": "XXXX" }  |
| __`http://localhost:3002/products/id`__   | DELETE    | { "token": "XXXX" }                                      |
| __`http://localhost:3002/products`__      | PUT       | { "email": "test@gmail.com", "password": "password" }    |

The __bold endpoints__ need a token that is generated when the user logs in.

