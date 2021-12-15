const express = require( 'express' );
const router = express.Router();

// ##############  현재 위치 확인  #################
router.get('/gps', (req, res) => {
  console.log('gps 확인 중...')
  res.render('gps');
});

module.exports = router;