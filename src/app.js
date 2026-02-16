const express = require("express");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/vg-hc-store/static-resources", resourceRoutes);

module.exports = app;