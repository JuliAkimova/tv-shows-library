# HBO tv shows library

This is end-to-end solution which represents a TV-serials library for HBO broadcasting company.

### Usage

```sh
# Install dependencies for server side
$ npm install

# To run Express server
$ npm start

# To run Express server with Nodemon
$ npm run server

# To run React client only
$ npm run client

# To run client and server at the same time
$ npm run dev

# Also to install dependencies for client side
$ npm run client-install

# Server runs on http://127.0.0.1:3000
# Client runs on localhost:3001
```


### MongoDB

tv-shows folder contains database dump in BSON format.

#### Admin collection

email: "test@test.com" <br />
password: "test"

### API

Returns json data about all shows.

* **URL**

`http:127.0.0.1:3000/api/shows`

* **Method:**

`GET`
  
*  **URL Query Parameters**

By default API returns data in JSON format.
To get data in XML, add query parameter at the end of the URL string.

`http://127.0.0.1:3000/api/shows?format=xml`

* **Success Response:**

  * **Code:** 200 <br />
    **Shows:** `{ title: "WestWorld" , posterImage : {...} }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Route not found" }`