const mongoose = require('mongoose');

const connectDB = async (URI) => {
    await mongoose.connect(URI);
    console.log("Database connected!");
}

module.exports = connectDB;