var express = require('express');
var router = express.Router();
const userHandler = require('../handlers/users');

/* GET users listing. */
router.route('/register')
  .post(userHandler.registerUser);
module.exports = router;
