// express
// node.js 를 위한 빠르고 개방적인 웹 프레임 워크

const express = require( 'express' );
const path = require( 'path' );
const app = express();
const mysql = require( 'mysql' );

var conn = mysql.createConnection({
	user: 'root',
	password: '1234',
	database: 'cloud'
});

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
app.use( express.static(path.join(__dirname, 'static') ) )
// ##################react 불러오는 곳#########################
// app.use( '/react', express.static(path.join(__dirname, 'react_today/build') ) )

// ##################react 불러오는 곳#########################
// app.get( '/react', ( req, res ) => {
    // res.sendFile( path.join(__dirname, 'views/main.html') )
    // res.sendFile( path.join(__dirname, 'views/main.html') )
// });

// 회원가입 테스트 했습니다.-윤영우-
app.get( '/', ( req, res ) => {
    console.log(conn);
    res.render('mainTest');
    // ##################react 불러오는 곳#########################
    // res.sendFile( path.join(__dirname, 'react_today/build/index.html') )
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

// ################################ index확인하는 곳 #################################
app.get( '/indexAll', ( req, res ) => {
    res.render('indexAll');
});
// ################################ 회원가입 #################################
app.get( '/signup', ( req, res ) => {
    res.render('signup');
});
// ################################ 로그인 #################################
app.get( '/login', ( req, res ) => {
    res.render('login');
});
// ################################ 회원 정보 수정 #################################
app.get( '/update', ( req, res ) => {
    res.render('update');
});
// ################################ 회원탈퇴 #################################
app.get( '/delete', ( req, res ) => {
    res.send("delete");
});
// ################################ gps확인하는 곳 #################################
app.get( '/gps', ( req, res ) => {
    res.render('gps');
});

// app.get( '/', ( req, res ) => {
//     res.send("success");
// });

// app.listen( port, () => {
//     console.log('수정 완료');
// });

// ########################################
// 아래 방식을 이용해서 파일을 불러오는 방식으로 운영됨.
// ########################################
// app.use는 미들웨어 (요청과 응답 사이에 존재하고 실행함.)

// app.use( express.static(path.join(__dirname, 'views') ) )

// const http = require('http').createServer(app);
// http.listen(8000, function(){
//     console.log('listening on 8000')
// });

// app.get( '/', ( req, res ) => {
//     res.sendFile( path.join(__dirname, 'views/main.html') )
// });

// * == 사용자가 아무 주소나 입력했을 때 해당 연결된 곳으로 자동연결되게 만듬. ==> 이것이 리액트 라우터
// app.get( '*', ( req, res ) => {
//     res.sendFile( path.join(__dirname, 'views/main.html') )
// });
