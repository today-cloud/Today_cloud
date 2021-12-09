// app.js
const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );
const session = require('express-session');
const body = require( 'body-parser' );
const multer = require('multer');
// const userRoute = require('./routes/user')(app);
// app.use('/', userRoute);
const port = 8000;
const fs = require('fs');
const http = require("http");
const https = require("https");
const querystring = require('querystring');

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

app.use(body.urlencoded({ extended: true }));
app.use(body.json());

app.use( '/', express.static(path.join(__dirname, 'views') ) )
app.use( express.static(path.join(__dirname, 'static') ) )

// view의 확장인 ejs 를 사용하도록 도와주는 장치
app.set( 'view engine', 'ejs');
app.set( 'views', __dirname + '/views');

function user_sql(req){
  const sql = "select * from T_User where user_Num = '" + req.session.uid +"';";
  conn.query(sql, function(err,result){
    if(result.length == 0) {
      res.render('login');
    }else{
      var user = result[0];
      return user;
    }
  });
}

// ############################################################################### SSL 수정 부분 ##############
// const options = { // letsencrypt로 받은 인증서 경로를 입력
//   ca: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/fullchain.pem'),
//   key: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/todaycloud.shop/cert.pem')
// };
http.createServer(app).listen(port);
//https.createServer(options, app).listen(443);
// https.createServer(options, (req, res) => {
//   console.log('필요한 코드 넣기');
// }).listen(8000, function() {
//   console.log('서버 포트: 80 ...');
// });

// ##################react 불러오는 곳#########################
// app.use( '/react', express.static(path.join(__dirname, 'react_today/build') ) );

// ##################react 불러오는 곳#########################
// app.get( '/react', ( req, res ) => {
// res.sendFile( path.join(__dirname, 'views/main.html') )
// res.sendFile( path.join(__dirname, 'views/main.html') )
// });

app.get('/indexAll',(req,res)=>{
  console.log('req 완료 확인페이지');
  res.render('indexAll');
});

// ######################################################
// ##############  회원가입  ##################
// ######################################################
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

// ######################################################
// ##############  로그인  ##################
// ######################################################
app.get('/login',(req,res)=>{
  console.log('login 들어왔다');
  res.render('login');
});
app.post('/login',(req,res)=>{
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
        res.render('main',{user:result[0]});
      });
    }
  });
});

// ######################################################
// ##############  로그아웃  ##################
// ######################################################
app.get('/logout',(req,res)=>{
  if(!req.session.uid){
    res.send('로그인이 필요한 서비스 입니다.');
  }else{
    req.session.destroy();
    res.redirect('login');
  }
});

// ######################################################
// ##############  회원정보 찾기  ##################
// ######################################################
app.get('/search',(req,res)=>{
  res.render('search');
});

// ######################################################
// ##############  회원정보 수정  ##################
// ######################################################
app.post('/update',(req,res)=>{
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


// ######################################################
// ##############  회원탈퇴  ##################
// ######################################################
app.get('/delete',(req,res)=>{
  var sql = "delete from T_User where user_Num = "+req.session.uid;
  conn.query(sql,function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('../login');
    }
  });
});

// ######################################################
// ##############  main  ##################
// ######################################################
app.get('/main',(req,res)=>{
  res.render('main');
});

// app.get('/main',(req,res)=>{
//   var sql = "select * from T_User where user_Num = '" + req.session.uid +"'";
//   conn.query(sql,function(err,result){
//     if(result.length == 0) {
//       res.render('login');
//     }else{
//       req.session.uid = result[0].user_Num;
//       req.session.save(function(err){
//         res.render('main',{user:result[0]});
//       });
//     }
//   });
// });

// ######################################################
// ##############  파일업로더  ##################
// ##############  게시판  ##################
// ######################################################
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
      cb(null, 'image/board');
    }
  },
  filename: function(req,file,cb){
    console.log(file);
    cb(null,Date.now()+"-"+file.originalname);
  }
});

var upload = multer({storage : storage});

app.get( '/', ( req, res ) => {
  res.render('userinfo');
});

// board write
app.get('/board',(req,res)=>{
  if(req.session.uid){
    res.render('boardwrite');
  }else{
    res.redirect('../login');
  }
});

app.post('/board',upload.single('fileupload'),function(req,res){
  var title = req.body.title;
  var content = req.body.content;
  var filepath = req.file.path;
  const sql = "insert into T_Board (board_Title,board_Content,user_Num,board_Image) values ('"+title+"','"+content+"','"+req.session.uid+"','"+filepath+"');";

  conn.query(sql,function(err,results) {
    if(err){
      console.log(err);
      res.redirect('../board');
    }else{
      var user = user_sql(req);
      const query = querystring.stringify({
        user:user
      });
      res.redirect('../main',query);
    }
  });
});
