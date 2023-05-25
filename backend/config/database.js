const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected");
        });
}
module.exports = connectDatabase;
// const mongoose = require("mongoose");

// // Set up default mongoose connection
// const connectDatabase=()=>{
// const mongoDB = "mongodb://localhost:27017/medmart";
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// // Get the default connection
// const db = mongoose.connection;
// mongoose.connection.on('connected', () => {
//     console.log('Database connected');
// //onsole.log(mongoose.connection.readyState); //logs 1
//   });

// // Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// }
// module.exports = connectDatabase;