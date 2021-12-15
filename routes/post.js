const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

router.get('/post',(req,res)=>{
  console.log('post페이지 연다.');
  res.render('post');
});

module.exports = router;