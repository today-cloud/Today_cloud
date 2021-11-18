// express
// node.js 를 위한 빠르고 개방적인 웹 프레임 워크

const express = require( 'express' );
const app = express();
const port = 8000;
const body = require( 'body-parser' );

app.set( 'view engine', 'ejs'); 
// view의 확장인 ejs 를 사용하도록 도와주는 장치
app.set( 'views', __dirname + '/views');


app.get( '/', ( req, res ) => {
    res.send("success");
});

app.listen( port, () => {
    console.log('서버 시작!');
});