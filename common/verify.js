const jwt = require('jsonwebtoken');
const Iron = require('@hapi/iron');

const serverMessages = require('../common/messages');

exports.getToken = function (user, expiresIn) {
  return jwt.sign(user, process.env.secretKey, {
    expiresIn: expiresIn || 3600
  });
};
exports.user = function (req, res, next) {
  const token = req.headers[`x-access-token`];
  if (token) {
    jwt.verify(token, process.env.secretKey, async function (err, decoded) {
      // eslint-disable-next-line no-console
      console.log(err);
      if (err) {
        return next(serverMessages.server.NOT_AUTHENTICATED);
      } else {
        const unsealed = await Iron.unseal(decoded.data, process.env.sealPassword, Iron.defaults);
        req._user = unsealed;
        return res.json({
          sucess: true,
          user: unsealed
        });
      }
    });
  } else {
    let err = new Error(`No token provided!`);
    err.status = 403;
    return next(err);
  }
};
