const Iron = require('@hapi/iron');
exports.getLoginData = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {
        _id:user._id,
        username: user.username,
        email: user.email
      }
      const seal = await Iron.seal(userData, process.env.sealPassword, Iron.defaults);
      return resolve(seal);
    } catch (error) {
      return reject(error);
    }
  });
};
