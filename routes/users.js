const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/users');

const verify = require('../common/verify');

router.route('/register')
  .post(userHandler.register);
router.route('/login')
  .post(userHandler.login)
router.route('/verify')
  .get(verify.user)
module.exports = router;
