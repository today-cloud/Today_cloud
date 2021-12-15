const express = require( 'express' );
const path = require( 'path' );
const mysql = require( 'mysql' );
const querystring = require('querystring');
const router = express.Router();

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

// ##############  회원가입  ##################
router.get('/signup',(req,res)=>{
  console.log('회원가입 요청');
  res.render('signup');
});
router.post('/signup',(req,res)=>{
  var eid = req.body.user_Eid;
  var pw = req.body.user_Pw;
  var name = req.body.user_Name;
  var nick = Math.random().toString(36).substr(2,11);
  const sql = "insert into T_User (user_Eid,user_Pw,user_Name,user_Nick) values ('"+eid+"','"+pw+"','"+name+"','"+nick+"');";
  conn.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log('insert success');
      res.render('login');
    }
  });
});

module.exports = router;