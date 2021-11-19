// express
// node.js 를 위한 빠르고 개방적인 웹 프레임 워크

const express = require( 'express' );
const app = express();
const port = 8000;
const body = require( 'body-parser' );


app.set( 'view engine', 'ejs'); 
// view의 확장인 ejs 를 사용하도록 도와주는 장치
app.set( 'views', __dirname + '/views');

// ################################ 회원가입 #################################
app.get( '/signup', ( req, res ) => {
    res.render('signup');
});
// ################################ 로그인 #################################
app.get( '/login', ( req, res ) => {
    res.render('login');
});
// ################################ 회원 정보 수정 #################################
app.get( '/delete', ( req, res ) => {
    res.render('delete');
});
// ################################ 회원탈퇴 #################################
app.get( '/', ( req, res ) => {
    res.send("success");
});


app.get( '/', ( req, res ) => {
    res.send("success");
});

app.listen( port, () => {
    console.log('수정 완료');
});

// 여기는 app.js입니다.