const express = require( 'express' );
const mysql = require( 'mysql' );
const router = express.Router();

// ##############  로그아웃  ##################
router.get('/logout',(req,res)=>{
  if(!req.session.uid){
    res.status(400).send('로그인이 필요한 서비스 입니다.');
  }else{
    req.session.destroy();
    res.redirect('login');
  }
});

module.exports = router;