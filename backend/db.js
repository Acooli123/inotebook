const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/yourDatabaseName"; // Use 127.0.0.1 instead of localhost

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI); // Remove useNewUrlParser and useUnifiedTopology
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
