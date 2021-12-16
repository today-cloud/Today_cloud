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

// ##############  로그인  ##################
router.get('/login',(req,res)=>{
  console.log('login 들어왔다');
  res.render('login');
});
router.post('/login',(req,res)=>{
  const eid = req.body.user_Eid;
  const password = req.body.user_Pw;

  const sql = "select * from T_User where user_Eid = '" + eid +"' and user_Pw ='" +password+"';";
  conn.query(sql, function(err,result){
    if(result.length == 0) {
      res.render('login');
    }else{
      req.session.uid = result[0].user_Num;
      req.session.save(function(err){
        console.log('login success');
        res.redirect('/');
      });
    }
  });
});

module.exports = router;