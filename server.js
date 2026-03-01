require("dotenv").config();
const app = require("./src/app");
const connMongoDB = require("./src/config/mongoDB");

connMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
