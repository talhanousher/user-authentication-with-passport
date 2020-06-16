const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/users');

router.route('/register')
  .post(userHandler.register);
router.route('/login')
  .post(userHandler.login)
module.exports = router;
