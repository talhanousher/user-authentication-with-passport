const Iron = require('@hapi/iron');

const verify = require('../common/verify');

exports.getLoginData = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {
        _id: user._id,
        username: user.username,
        email: user.email
      }
      const seal = await Iron.seal(userData, process.env.sealPassword, Iron.defaults);
      const token = verify.getToken({ data: seal })
      return resolve({ token, user: userData });
    } catch (error) {
      return reject(error);
    }
  });
};
