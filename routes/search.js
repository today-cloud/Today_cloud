const express = require( 'express' );
const router = express.Router();

// ##############  회원정보 찾기  ##################
router.get('/search',(req,res)=>{
  res.render('search');
});

module.exports = router;