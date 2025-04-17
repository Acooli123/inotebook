const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook"; // Use 127.0.0.1 instead of localhost

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
    console.log("MongoDB connected successfully");
}

module.exports = connectToMongo;