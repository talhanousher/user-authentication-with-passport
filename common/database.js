const mongoose = require('mongoose');

exports.connect = function () {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.on(`error`, function () { console.log('Connection Error'); });
  db.once(`open`, function () {
    // eslint-disable-next-line no-console
    console.log(`MongoDB connected on "  ${process.env.MONGO_URL}`);
  });
};

