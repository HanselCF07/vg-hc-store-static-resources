const mongoose = require("mongoose");

async function connectDB() {
  let mongoUri;

  switch (process.env.NODE_ENV) {
    case "production":
      mongoUri = process.env.MONGO_URI_PRD;
      break;
    case "qas":
      mongoUri = process.env.MONGO_URI_QAS;
      break;
    default:
      mongoUri = process.env.MONGO_URI_DEV;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected to ${mongoUri} in ${process.env.NODE_ENV} mode`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;