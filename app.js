// app.js
const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );
const session = require('express-session');

// const userRoute = require('./routes/user')(app);
// app.use('/', userRoute);

var conn = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'cloud'
});

app.use(session({
  secret : 'customer',
  resave : false,
  saveUninitialized : true,
}));

// const port = 8000;
const body = require( 'body-parser' );

// view의 확장인 ejs 를 사용하도록 도와주는 장치
app.set( 'view engine', 'ejs');
app.set( 'views', __dirname + '/views');

app.use(body.urlencoded({extends:true}));
app.use(body.json());

const http = require('http').createServer(app);
http.listen(8000, function(){
  console.log('listening on 8000')
});
app.use( '/', express.static(path.join(__dirname, 'views') ) )
// app.use( express.static(path.join(__dirname, 'static') ) )
// ##################react 불러오는 곳#########################
app.use( '/react', express.static(path.join(__dirname, 'react_today/build') ) );

// ##################react 불러오는 곳#########################
// app.get( '/react', ( req, res ) => {
// res.sendFile( path.join(__dirname, 'views/main.html') )
// res.sendFile( path.join(__dirname, 'views/main.html') )
// });

// 회원가입 테스트 했습니다.-윤영우-
app.get( '/', ( req, res ) => {
  console.log(conn);
  //res.render('mainTest');
  // ##################react 불러오는 곳#########################
  res.sendFile( path.join(__dirname, 'react_today/build/index.html') )
});

app.post('/mainTest',(req,res)=>{
  res.send('일단 전송됨');
  console.log(req.body);
  var sql = "INSERT INTO T_User (user_Eid, user_Pw, user_Name) values('"+ req.body.eid +"','" +req.body.password +"','"+req.body.name+"');";
  // insert into T_User(user_Eid, user_Pw, user_Name) values('aaa@naver.com','1234','홍길동');
  conn.query(sql, function(err, result) {
    if( err ){
      console.log( 'failed!! : ' + err );
    }
    else {
      console.log( "data inserted!" );
    }
  });
});
app.use( express.static(path.join(__dirname, 'static') ) )

// 회원가입 테스트 했습니다.-윤영우-
app.get( '/', ( req, res ) => {
  console.log(conn);
  res.render('mainTest');
  // ##################react 불러오는 곳#########################
  // res.sendFile( path.join(__dirname, 'react_today/build/index.html') )
});

// ################################ 회원가입 #################################
app.get( '/signup', ( req, res ) => {
  console.log('signup 페이지 접속')
  res.render('signup');
});

app.post('/signup', (req, res) => {
  var sql = "INSERT INTO T_User (user_Eid, user_Pw, user_Name) values ('"+ req.body.user_Eid +"', '"+ req.body.user_Pw +"', '"+ req.body.user_Name +"')";
  // insert into T_User(user_Eid, user_Pw, user_Name) values('aaa@naver.com','1234','홍길동');
  conn.query(sql, function(err, result) {
    if( err ){
      console.log(req.body.user_Eid);
      console.log( 'failed!! : ' + err );
    }
    else {
      console.log(req.body.user_Eid);
      console.log( "data inserted!" );
      res.render('login');
    }
  });
});

// ################################ 로그인 #################################
app.get( '/login', ( req, res ) => {
  req.session.uid;
  res.render('login');
});
app.post( '/login', ( req, res ) => {
  const eid = req.body.user_Eid;
  const password = req.body.user_Pw;
  var sql = "select * from T_User where user_Eid = '" + eid +"' and user_Pw ='" +password+"';";
  var board_sql = "select * from T_Board order by board_Date desc;";
  var tag_sql = "select tag_Tagname,count(tag_Tagname)as coun from T_Tag group by tag_Tagname order by coun desc limit 5;";
  var board;
  var tag;
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
            conn.query(tag_sql,function(err, results){
              if(results.length == 0){
              } else{
                tag = results;
                res.render('main', {user:result[0], board_list:board, tag_list:tag});
              }
            });
          }
        });
      });
    }
  });
  // res.send(req.body.eid+""+req.body.password+"");
});

// ################################ 로그아웃 #################################
app.get('/logout', (req, res) => {
  console.log(req.session.uid);
  console.log('logout 페이지 접속');
  const sessionId = req.session.uid;
  if (!sessionId) {
    res.status(400).send('로그인이 필요한 서비스 입니다.')
  } else {
    req.session.destroy();
    res.redirect('login');
  }

})

// ################################ 회원 정보 수정 #################################
app.get( '/myinfo', ( req, res ) => {
  console.log(req.session.uid);
  console.log('myinfo 페이지 접속')
  const sessionId = req.session.uid;
  if (!sessionId) {
    res.status(401).send('로그인이 필요한 서비스 입니다.');
  } else {
    res.render('update');
  }
});

app.post('/myinfo', (req, res) => {
  res.render('update');
});

// ################################ 회원탈퇴 #################################
app.get( '/quit', ( req, res ) => {
  res.render("delete");
});

// ################################ index확인하는 곳 #################################
app.get( '/indexAll', ( req, res ) => {
  res.render('indexAll');
});

// ################################ gps확인하는 곳 #################################
app.get( '/gps', ( req, res ) => {
  res.render('gps');
});


// ##################react 불러오는 곳#########################
// app.use( '/react', express.static(path.join(__dirname, 'react_today/build') ) )

// ##################react 불러오는 곳#########################
// app.get( '/react', ( req, res ) => {
// res.sendFile( path.join(__dirname, 'views/main.html') )
// res.sendFile( path.join(__dirname, 'views/main.html') )
// });
