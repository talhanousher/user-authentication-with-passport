const mongoose = require('mongoose')
exports.connect = function () {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on(`error`, function () { console.log("Connection Error") });
    db.once(`open`, function () {
        console.log(`MongoDB connected on "  ${process.env.MONGO_URL}`);
    });
};

