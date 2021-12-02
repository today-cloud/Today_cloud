// app.js
const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );
const session = require('express-session');
const user = require('./routes/user')(app);
app.use('/', user);


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

app.use(body.urlencoded({extends:false}));
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
