const express = require( 'express' );
const path = require( 'path' );
const mysql = require( 'mysql' );
const querystring = require('querystring');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

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
router.get('/board',(req,res)=>{
  if(req.session.uid){
    res.render('boardwrite');
  }else{
    res.redirect('../login');
  }
});

router.post('/board',upload.single('fileupload'),function(req,res){
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

module.exports = router;