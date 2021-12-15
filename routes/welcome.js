const express = require( 'express' );
const router = express.Router();

router.get('/t_c_info',(req,res)=>{
  console.log('소개글 접속')
  res.render('t_c_info');
});

module.exports = router;