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
const url = require('url');

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

app.set( 'view engine', 'ejs');
app.set( 'views', __dirname + '/views');

function user_sql(req,callback){
  const sql = "select * from T_User where user_Num = '" + req.session.uid +"';";
  conn.query(sql, function(err,result){
    if(result.length == 0) {
      res.redirect('../login');
    }else{
      var user = result[0];
      console.log("user 정보 ")
      console.log(user);
      callback(user);
    }
  });
}
function board_sql(callback){
  const sql = "select * from T_Board order by board_Date desc;";
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      console.log(results);
      callback(results);
    }
  });
}
function tag_sql(callback){
  const sql = "select tag_Tagname,count(tag_Tagname)as coun from T_Tag group by tag_Tagname order by coun desc limit 5;";
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      callback(results);
    }
  })
}
function main_like_sort(callback){
  const sql = `
		select u.user_Name, u.user_Profile, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag
		from T_Board as b 
		join T_User as u on b.user_Num = u.user_Num
		left join T_Good as g on b.board_Num = g.board_Num
		left join T_Tag as t on b.board_Num = t.board_Num
		group by b.board_Num order by count(distinct g.good_pk) desc;
	`;
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      callback(results);
    }
  });
}
function main_latest_sort(callback){
  const sql = `
		select u.user_Name, u.user_Profile, b.board_Content,count(distinct g.good_pk) as board_like, group_concat(distinct t.tag_Tagname) as tag
		from T_Board as b 
		join T_User as u on b.user_Num = u.user_Num
		left join T_Good as g on b.board_Num = g.board_Num
		left join T_Tag as t on b.board_Num = t.board_Num
		group by b.board_Num order by b.board_Date desc;
	`;
  conn.query(sql,function(err,results){
    if(err){
      console.log(err);
    }else{
      console.log('-----------------main------확인');
      console.log(results);
      callback(results);
    }
  });
}
http.createServer(app).listen(port);

app.get('/indexAll',(req,res)=>{
  console.log('req 완료 확인페이지');
  console.log('--------');
  if(req.session.uid){
    main_latest_sort(req,function(info){
      res.render('main',{info:info});
    });
  }else{
    res.redirect('../login');
  }
  // user_sql(req,function(user){
  //   board_sql(function(board){
  //     tag_sql(function(tag){
  //       res.render('main',{uesr:user,board:board,tag:tag});
  //     });
  //   });
  // });
});

app.get('/userinfo',(req,res)=>{
  console.log('userinfo in');
  res.render('userinfo');
});
app.get('/post',(req,res)=>{
  console.log('post페이지 연다.');
  res.render('post');
});

// ##############  회원가입  ##################
app.get('/signup',(req,res)=>{
  console.log('회원가입 요청');
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

// ##############  로그인  ##################
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
        res.redirect('../indexAll');
      });
    }
  });
});

// ##############  로그아웃  ##################
app.get('/logout',(req,res)=>{
  if(!req.session.uid){
    res.status(400).send('로그인이 필요한 서비스 입니다.');
  }else{
    req.session.destroy();
    res.redirect('login');
  }
});

// ##############  회원정보 찾기  ##################
app.get('/search',(req,res)=>{
  res.render('search');
});

// ##############  회원정보 수정  ##################
app.get('/update', (req, res) => {
  if (req.session.uid) {
    res.render('update');
  } else {
    res.status(400).send('로그인이 필요한 서비스 입니다.');
  }
})

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

// ##############  회원탈퇴  ##################
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

// ##############  main page  ##################
app.get('/',(req,res)=>{
  res.render('main');
});

// ##############  현재 위치 확인  #################
app.get('/gps', (req, res) => {
  console.log('gps 확인 중...')
  res.render('gps');
});

app.get('/t_c_info',(req,res)=>{
  res.render('t_c_info');
});

// ############## main page - session check ##############
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

// ##############  파일업로더  ##################
// ##############  게시판  ##################
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
      cb(null, 'public/board');
    }
  },
  filename: function(req,file,cb){
    console.log(file);
    cb(null,Date.now()+"-"+file.originalname);
  }
});

var upload = multer({storage : storage});

// ##############  board write  #################
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

  conn.query(sql,function(err,result) {
    if(err){
      console.log(err);
      res.redirect('../board');
    }else{
      res.redirect('../indexAll');
    }
  });
});
