const express = require( 'express' );
const mysql = require( 'mysql' );
const router = express.Router();

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

// ##############  회원탈퇴  ##################
router.get('/delete',(req,res)=>{
  var sql = "delete from T_User where user_Num = "+req.session.uid;
  conn.query(sql,function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('../login');
    }
  });
});

module.exports = router;