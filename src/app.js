const express = require("express");
const gridFSRoutes = require("./routes/gridFSRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/vg-hc-store/static-resources/gfs", gridFSRoutes);

module.exports = app;