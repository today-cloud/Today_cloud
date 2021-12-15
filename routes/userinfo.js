const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});


router.get('/userinfo',(req,res)=>{
  console.log('userinfo in');
  res.render('userinfo');
});

module.exports = router;
