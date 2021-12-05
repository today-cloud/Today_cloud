// app.js
const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );
const session = require('express-session');
const body = require( 'body-parser' );

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
// const fs = require('fs');
const http = require("http");
// const https = require("https");

// view의 확장인 ejs 를 사용하도록 도와주는 장치
app.set( 'view engine', 'ejs');
app.set( 'views', __dirname + '/views');

app.use(body.urlencoded({extends:false}));
app.use(body.json());

// const options = { // letsencrypt로 받은 인증서 경로를 입력
//   ca: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/cert.pem')
// };
http.createServer(app).listen(8000);
// https.createServer(options, app).listen(443);
// https.createServer(options, (req, res) => {
//   console.log('필요한 코드 넣기');
// }).listen(8000, function() {
//   console.log('서버 포트: 80 ...');
// });

app.use( '/', express.static(path.join(__dirname, 'views') ) )
// app.use( express.static(path.join(__dirname, 'static') ) )
// ##################react 불러오는 곳#########################
// app.use( '/react', express.static(path.join(__dirname, 'react_today/build') ) );

// ##################react 불러오는 곳#########################
// app.get( '/react', ( req, res ) => {
// res.sendFile( path.join(__dirname, 'views/main.html') )
// res.sendFile( path.join(__dirname, 'views/main.html') )
// });

app.get( '/', ( req, res ) => {
  // console.log(conn);
  res.render('mainTest');
  // ##################react 불러오는 곳#########################
  // res.sendFile( path.join(__dirname, 'react_today/build/index.html') )
});

// 회원가입 테스트 했습니다.-윤영우 12/05-
app.get('/signup',(req,res)=>{
  console.log('회워가입 요청');
  res.render('signup');
});
app.post('/signup',(req,res)=>{
  var eid = req.body.user_Eid;
  var pw = req.body.user_Pw;
  var name = req.body.user_Name;
  console.log(eid);
  console.log(pw);
  console.log(name);
  const sql = "insert into T_User (user_Eid,user_Pw,user_Name) values ('"+req.body.user_Eid+"','"+req.body.user_Pw+"','"+req.body.user_Name+"');";
  conn.query(sql,function(err,result){
    if(err){
      console.log(err);
    }else{
      console.log('insert success');
      res.render('login');
    }
  });
});