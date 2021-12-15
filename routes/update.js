const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});


// ##############  회원정보 수정  ##################
router.get('/update', (req, res) => {
  if (req.session.uid) {
    res.render('update');
  } else {
    res.status(400).send('로그인이 필요한 서비스 입니다.');
  }
})

router.post('/update',(req,res)=>{
  var eid = req.body.user_Eid;
  var pw = req.body.user_Pw;

  var sql = "update T_User set user_Eid = '"+eid+"', user_Pw = '"+pw+"' where user_Num = "+req.session.uid+"";
  const user_sql = "select * from T_User where user_Eid = '" + eid +"'";
  const sql2 = "select * from T_User where user_Num = '" + req.session.uid +"'";
  conn.query(user_sql,function(err,results){
    if(results[0]){
      res.send(
        `<script>
            alert('id 중복!');
            location.href='${'../main'}';
          </script>`
      );
    }else{
      conn.query(sql,function(err,result){
        console.log(result.affectedRows);
        if(result.affectedRows != 1){
          res.render('main');
        }else{
          conn.query(sql2,function(err,result){
            console.log('update success');
            res.render('main',{user:result[0]});
          });
        }
      });
    }
  });
});

module.exports = router;