// user 관련 route module

module.exports = (app) => {
  const router = require('express',).Router();
  const application = app;

  router.get( '/signup', ( req, res ) => {
    res.render('signup');
  });

  // ################################ 회원가입 #################################
  router.post('/signup',(req,res)=>{
    var sql = "INSERT INTO T_User (user_Eid, user_Pw, user_Name) values('"+ req.body.user_Eid +"','" +req.body.user_Pw +"','"+req.body.user_Name+"');";
    // insert into T_User(user_Eid, user_Pw, user_Name) values('aaa@naver.com','1234','홍길동');
    conn.query(sql, function(err, result) {
      if( err ){
        console.log( 'failed!! : ' + err );
      }
      else {
        console.log( "data inserted!" );
        res.render('login');
      }
    });
  });

// ################################ 로그인 #################################
  router.get( '/login', ( req, res ) => {
    res.render('login');
  });
  router.post( '/login', ( req, res ) => {
    const eid = req.body.user_Eid;
    const password = req.body.user_Pw;
    var sql = "select * from T_User where user_Eid = '" + eid +"' and user_Pw ='" +password+"';";
    var board_sql = "select * from T_Board order by board_Date desc;";
    var board;
    conn.query(sql, function(err, result) {
      if (result.length == 0){
        res.render('login');
      }else{
        req.session.uid = result[0].user_Num;
        req.session.save(function(err){
          conn.query(board_sql,function(err, results){
            if(results.length == 0){
            } else{
              console.log(results);
              board = results;
              res.render('main',{user:result[0],board_list:board});
            }
          });
        });
      }
    });
  });

// ################################ 회원 정보 수정 #################################
  router.get( '/update', ( req, res ) => {
    res.render('update');
  });

// ################################ 회원탈퇴 #################################
  router.get( '/delete', ( req, res ) => {
    res.send("delete");
  });
  return router;
};