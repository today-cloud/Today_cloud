const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

function user_sql(req,callback){
  const sql = "select * from T_User where user_Num = '" + req.session.uid +"';";
  conn.query(sql, function(err,result){
    if(result.length == 0) {
      res.redirect('/login');
    }else{
      var user = result[0];
      console.log("user 정보 ")
      console.log(user);
      callback(user);
    }
  });
}

router.get('/userinfo',(req,res)=>{
  console.log('userinfo in');
  if (req.session.uid) {
   user_sql((ck) => {
     res.redirect('/userinfo', {ck:ck})
   })
  }
});

module.exports = router;
