// router module middleware
const express = require( 'express' );
const path = require( 'path' );
const router = express.Router();

// router
const main = require('./main');
const signup = require('./signup');
const login = require('./login');
const comment = require('./comment');
const logout = require('./logout');
const board = require('./board');
const welcome = require('./welcome');
const update = require('./update');
const search = require('./search');
const deleteId = require('./delete');
const userinfo = require('./userinfo');
const post = require('./post');

router.use('/', main)
router.use('/', signup)
router.use('/', login)
router.use('/', logout)
router.use('/', board)
router.use('/', comment)
router.use('/', welcome)
router.use('/', update)
router.use('/', search)
router.use('/', deleteId)
router.use('/', userinfo)
router.use('/', post)

module.exports = router;