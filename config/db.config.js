
const mongoose = require("mongoose");
;
//mongoose.Promise = global.Promise;

// Connecting to the database
console.log("Running to DB Config");
exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database...");
    }).catch(err => {
        console.log('Could not connect to the database...', err);
        process.exit();
    });
}