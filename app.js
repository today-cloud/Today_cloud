// package setting
const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );
const session = require('express-session');
const body = require( 'body-parser' );
const multer = require('multer');
const port = 8000;
const fs = require('fs');
const http = require("http");
const querystring = require('querystring');
const url = require('url');
const router = require('./routes/index');

// MYSQL DB
var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

// middleware
app.use(session({
  secret : 'customer',
  resave : false,
  saveUninitialized : true,
}));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(router);
app.use( '/', express.static(path.join(__dirname, 'views') ) )
app.use( express.static(path.join(__dirname, 'static') ) )

// ejs setting
app.set( 'view engine', 'ejs');
app.set( 'views', __dirname + '/views');

// listening server
http.createServer(app).listen(port, () => {
  console.log('### server open ###');
});